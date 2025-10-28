// composables/useAuth.ts - VERSÃO FINAL DEFINITIVA - CORRIGIDA PGRST116
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

// ✅ SINGLETON - Estados globais compartilhados
const globalUser = ref<User | null>(null);
const globalSession = ref<Session | null>(null);
const globalLoading = ref(true);
const globalProfile = ref<any>(null);

// Flag para evitar múltiplas inicializações
let isInitialized = false;
let authUnsubscribe: (() => void) | null = null;

// Queue para operações que precisam ser executadas fora do callback
const deferredOperations = ref<Array<() => Promise<void>>>([]);

// Processador de operações defer
const processDeferredOperations = async () => {
  while (deferredOperations.value.length > 0) {
    const operation = deferredOperations.value.shift();
    if (operation) {
      try {
        await operation();
      } catch (error) {
        console.error("❌ Erro em operação diferida:", error);
      }
    }
  }
};

export const useAuth = () => {
  // Sempre obtenha a instância atual do cliente (respeita "Lembrar-me")
  const getSupabase = () => useSupabase();

  // Estados reativos (usando refs globais)
  const user = globalUser;
  const session = globalSession;
  const loading = globalLoading;
  const profile = globalProfile;

  // ✅ COMPUTED CORRETO - retorna booleano diretamente
  const isLoggedIn = computed(() => {
    const result = !!user.value;
    return result;
  });

  // ✅ COMPUTED para admin - usa a coluna role da tabela user_profiles
  const isAdmin = computed(() => {
    return profile.value?.role === true;
  });

  // ✅ Inicialização (singleton com proteção contra múltiplas execuções)
  const initAuth = async () => {
    // Evitar múltiplas inicializações
    if (isInitialized) {
      console.log("🔄 Auth já inicializado, retornando...");
      return;
    }

    loading.value = true;
    console.log("🔧 Inicializando sistema de autenticação...");

    try {
      // Remover listener anterior se existir
      if (authUnsubscribe) {
        authUnsubscribe();
        authUnsubscribe = null;
      }

      // Buscar sessão atual
      const {
        data: { session: currentSession },
        error,
      } = await getSupabase().auth.getSession();

      if (error) {
        console.error("❌ Erro ao buscar sessão:", error);
        throw error;
      }

      // ✅ Atualizar estados
      session.value = currentSession;
      user.value = currentSession?.user || null;

      console.log("📝 Sessão atual:", currentSession ? "Usuário logado" : "Sem sessão");

      // Buscar perfil se usuário logado
      if (user.value) {
        await getUserProfile();
      }

      // ✅ Configurar listener seguindo práticas oficiais do Supabase
      const { data: { subscription } } = getSupabase().auth.onAuthStateChange(
        (event: AuthChangeEvent, newSession: Session | null) => {
          console.log(`🔐 Auth state changed: ${event}`, newSession ? "Sessão ativa" : "Sem sessão");

          // Atualização síncrona de estado (recomendação oficial)
          session.value = newSession;
          user.value = newSession?.user || null;

          // Operações específicas por evento
          switch (event) {
            case 'INITIAL_SESSION':
              if (newSession?.user) {
                // Diferir operações pesadas para fora do callback
                deferredOperations.value.push(async () => {
                  await createOrUpdateProfile(newSession.user);
                  await getUserProfile();
                });
                setTimeout(processDeferredOperations, 0);
              }
              break;

            case 'SIGNED_IN':
              if (newSession?.user) {
                // Diferir operações pesadas
                deferredOperations.value.push(async () => {
                  await createOrUpdateProfile(newSession.user);
                  await getUserProfile();
                });
                setTimeout(processDeferredOperations, 0);
              }
              break;

            case 'SIGNED_OUT':
              // Limpeza síncrona
              profile.value = null;
              break;

            case 'TOKEN_REFRESHED':
              console.log("✅ Token renovado automaticamente pelo Supabase");
              // Não precisa fazer nada - o Supabase já atualizou a sessão
              break;

            case 'USER_UPDATED':
              // Atualizar perfil se necessário
              if (newSession?.user) {
                deferredOperations.value.push(() => getUserProfile());
                setTimeout(processDeferredOperations, 0);
              }
              break;
          }
        }
      );

      // Guardar função para cancelar subscription
      authUnsubscribe = () => subscription.unsubscribe();

      // Se já há um usuário logado, iniciar verificação periódica
      if (currentSession?.user && process.client) {
        const { startPeriodicCheck } = useTokenRefresh();
        startPeriodicCheck();
      }

      isInitialized = true;
      console.log("✅ Sistema de autenticação inicializado com sucesso");

    } catch (error) {
      console.error("❌ Erro initAuth:", error);
      user.value = null;
      session.value = null;
      profile.value = null;
    } finally {
      loading.value = false;
    }
  };

  // ✅ CORRIGIDO - Buscar perfil SEM LOOP
  const getUserProfile = async () => {
    if (!user.value) return;

    try {
      // ✅ USAR .maybeSingle() em vez de .single()
      const { data, error } = await getSupabase()
        .from("user_profiles")
        .select("*")
        .eq("id", user.value.id)
        .maybeSingle(); // ← Mudança aqui!

      if (error) {
        console.error("❌ Erro ao buscar perfil:", error);
        throw error;
      }

      profile.value = data;
    } catch (error) {
      console.error("❌ Erro ao buscar perfil:", error);
      profile.value = null;
    }
  };

  // ✅ CORRIGIDO - Usar UPSERT para evitar duplicatas, preservando role
  const createOrUpdateProfile = async (authUser: User) => {
    try {
      // Primeiro, tentar buscar o perfil existente para preservar o role
      const { data: existingProfile } = await getSupabase()
        .from("user_profiles")
        .select("role")
        .eq("id", authUser.id)
        .maybeSingle();

      // ✅ USAR UPSERT - Insert ou Update se já existir
      const { data: profileData, error: upsertError } = await getSupabase()
        .from("user_profiles")
        .upsert(
          {
            id: authUser.id,
            email: authUser.email!,
            name: authUser.user_metadata?.name || null,
            cpf: authUser.user_metadata?.cpf || null,
            phone: authUser.user_metadata?.phone || null,
            updated_at: new Date().toISOString(),
            // Preservar o role existente ou usar false como padrão
            role: existingProfile?.role ?? false,
          },
          {
            onConflict: "id", // Se conflitar no ID, fazer UPDATE
            ignoreDuplicates: false, // Não ignorar, fazer UPDATE
          }
        )
        .select()
        .maybeSingle();

      if (upsertError) {
        console.error("❌ Erro no upsert do perfil:", upsertError);
        return;
      }

      // ✅ Atualizar o profile local
      profile.value = profileData;
    } catch (error) {
      console.error("❌ Erro ao criar/atualizar perfil:", error);
    }
  };

  // ✅ Login
  const signIn = async (email: string, password: string) => {
    const { success: notify, error } = useNotifications();
    loading.value = true;

    try {
      const { data, error: signInError } =
        await getSupabase().auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      notify("Login realizado!", `Bem-vindo de volta, ${user.value?.email}!`);

      // Re-inicializa para garantir listeners e estados com o cliente atual
      await initAuth();
      return { success: true, data };
    } catch (signInError: any) {
      console.error("❌ Erro signIn:", signInError);
      error(
        "Erro no login",
        signInError.message === "Invalid login credentials"
          ? "Email ou senha incorretos"
          : signInError.message
      );
      return { success: false, error: signInError.message };
    } finally {
      loading.value = false;
    }
  };

  // ✅ Cadastro
  const signUp = async (
    email: string,
    password: string,
    userData?: {
      name?: string;
      cpf?: string;
      phone?: string;
    }
  ) => {
    const { success: notify, error } = useNotifications();
    loading.value = true;

    try {
      const { data, error: signUpError } = await getSupabase().auth.signUp({
        email,
        password,
        options: {
          data: userData || {},
        },
      });

      if (signUpError) throw signUpError;

      notify("Conta criada!", "Verifique seu email para ativar sua conta");

      return { success: true, data };
    } catch (signUpError: any) {
      console.error("❌ Erro signUp:", signUpError);
      error("Erro no cadastro", signUpError.message);
      return { success: false, error: signUpError.message };
    } finally {
      loading.value = false;
    }
  };

  // ✅ Login com Google
  const signInWithGoogle = async () => {
    try {
      const { error } = await getSupabase().auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error("❌ Erro signInWithGoogle:", error);
      return { success: false, error: error.message };
    }
  };

  // ✅ Logout
  const signOut = async () => {
    const { success: notify } = useNotifications();

    try {
      const { error } = await getSupabase().auth.signOut();
      if (error) throw error;

      // ✅ Limpar estados imediatamente
      user.value = null;
      session.value = null;
      profile.value = null;

      notify("Logout realizado!", "Você foi desconectado com sucesso");

      await navigateTo("/");
      return { success: true };
    } catch (error: any) {
      console.error("❌ Erro signOut:", error);
      // Em caso de erro, forçar limpeza
      user.value = null;
      session.value = null;
      profile.value = null;
      return { success: false, error: error.message };
    }
  };

  // ✅ Reset senha
  const resetPassword = async (email: string) => {
    try {
      const { error } = await getSupabase().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error("❌ Erro resetPassword:", error);
      return { success: false, error: error.message };
    }
  };

  // ✅ Função para forçar reinicialização (útil para debug ou problemas de sessão)
  const reinitAuth = async () => {
    console.log("🔄 Forçando reinicialização do sistema de auth...");

    // Limpar estado atual
    if (authUnsubscribe) {
      authUnsubscribe();
      authUnsubscribe = null;
    }

    isInitialized = false;
    loading.value = true;

    // Reinicializar
    await initAuth();
  };

  // ✅ Verificação simples de sessão seguindo práticas Supabase
  const checkAndRestoreSession = async () => {
    if (!isInitialized) {
      console.log("🔧 Sistema não inicializado, inicializando...");
      await initAuth();
      return;
    }

    try {
      console.log("🔍 Verificando sessão no Supabase...");

      // getSession() é confiável e tem auto-refresh automático (doc oficial)
      const { data: { session: currentSession }, error } = await getSupabase().auth.getSession();

      if (error) {
        console.error("❌ Erro ao buscar sessão:", error);

        // Se erro de rede, tentar uma vez com nova instância
        if (error.message.includes('network') || error.message.includes('fetch')) {
          console.log("🔄 Tentando com nova instância...");
          const { refreshSupabaseInstance } = await import('./useSupabase');
          refreshSupabaseInstance();

          // Uma tentativa adicional
          const { data: { session: retrySession }, error: retryError } = await getSupabase().auth.getSession();
          if (!retryError && retrySession) {
            session.value = retrySession;
            user.value = retrySession.user;
            return;
          }
        }

        // Limpar estado em caso de erro persistente
        session.value = null;
        user.value = null;
        profile.value = null;
        return;
      }

      // Atualizar estado com sessão atual (Supabase é a fonte da verdade)
      session.value = currentSession;
      user.value = currentSession?.user || null;

      console.log("✅ Sessão verificada:", currentSession ? "Ativa" : "Inativa");

    } catch (error) {
      console.error("❌ Erro na verificação de sessão:", error);
      // Em caso de erro, limpar estado local
      session.value = null;
      user.value = null;
      profile.value = null;
    }
  };

  // ✅ CORRIGIDO - Atualizar perfil
  const updateProfile = async (updates: {
    name?: string;
    cpf?: string;
    phone?: string;
  }) => {
    if (!user.value) {
      return { success: false, error: "Usuário não logado" };
    }

    try {
      const { error } = await getSupabase()
        .from("user_profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.value.id);

      if (error) throw error;

      // Atualizar profile local
      if (profile.value) {
        profile.value = { ...profile.value, ...updates };
      }

      return { success: true };
    } catch (error: any) {
      console.error("❌ Erro updateProfile:", error);
      return { success: false, error: error.message };
    }
  };

  return {
    // Estados (readonly para proteger)
    user: readonly(user),
    session: readonly(session),
    profile: readonly(profile),
    loading: readonly(loading),

    // Computed
    isLoggedIn,
    isAdmin,

    // Métodos
    initAuth,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    getUserProfile,
    reinitAuth,
    checkAndRestoreSession,
  };
};
