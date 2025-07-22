// composables/useAuth.ts - VERSÃO FINAL DEFINITIVA - CORRIGIDA PGRST116
import type { Session, User } from "@supabase/supabase-js";

// ✅ SINGLETON - Estados globais compartilhados
const globalUser = ref<User | null>(null);
const globalSession = ref<Session | null>(null);
const globalLoading = ref(true);
const globalProfile = ref<any>(null);

export const useAuth = () => {
  const supabase = useSupabase();

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

  // ✅ COMPUTED para admin
  const isAdmin = computed(() => {
    const adminEmails = [
      "admin@atapera.shop",
      "contato@atapera.shop",
      "garbsonsouza2602@gmail.com",
    ];
    return (
      adminEmails.includes(user.value?.email || "") ||
      user.value?.user_metadata?.role === "admin"
    );
  });

  // ✅ Inicialização
  const initAuth = async () => {
    loading.value = true;

    try {
      // Buscar sessão atual
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ Erro ao buscar sessão:", error);
        throw error;
      }


      // ✅ Atualizar estados
      session.value = currentSession;
      user.value = currentSession?.user || null;
      



      // 🚧 TEMPORARIAMENTE DESABILITADO para debug
      // if (user.value) {
      //   await getUserProfile();
      // }

      // ✅ Listener para mudanças
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        session.value = newSession;
        user.value = newSession?.user || null;
        

        if (event === "SIGNED_IN" && newSession?.user) {
          // 🚧 TEMPORARIAMENTE DESABILITADO para debug
          // await createOrUpdateProfile(newSession.user);
        }

        if (event === "SIGNED_OUT") {
          profile.value = null;
        }
      });
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
      const { data, error } = await supabase
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

  // ✅ CORRIGIDO - Usar UPSERT para evitar duplicatas
  const createOrUpdateProfile = async (authUser: User) => {
    try {
      // ✅ USAR UPSERT - Insert ou Update se já existir
      const { data: profileData, error: upsertError } = await supabase
        .from("user_profiles")
        .upsert(
          {
            id: authUser.id,
            email: authUser.email!,
            name: authUser.user_metadata?.name || null,
            cpf: authUser.user_metadata?.cpf || null,
            phone: authUser.user_metadata?.phone || null,
            updated_at: new Date().toISOString(),
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
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      notify(
        'Login realizado!',
        `Bem-vindo de volta, ${user.value?.email}!`
      );

      return { success: true, data };
    } catch (signInError: any) {
      console.error("❌ Erro signIn:", signInError);
      error(
        'Erro no login',
        signInError.message === 'Invalid login credentials' ? 
          'Email ou senha incorretos' : signInError.message
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
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData || {},
        },
      });

      if (signUpError) throw signUpError;

      notify(
        'Conta criada!',
        'Verifique seu email para ativar sua conta'
      );

      return { success: true, data };
    } catch (signUpError: any) {
      console.error("❌ Erro signUp:", signUpError);
      error(
        'Erro no cadastro',
        signUpError.message
      );
      return { success: false, error: signUpError.message };
    } finally {
      loading.value = false;
    }
  };

  // ✅ Login com Google
  const signInWithGoogle = async () => {
    try {

      const { data, error } = await supabase.auth.signInWithOAuth({
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
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // ✅ Limpar estados imediatamente
      user.value = null;
      session.value = null;
      profile.value = null;

      notify(
        'Logout realizado!',
        'Você foi desconectado com sucesso'
      );

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

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error("❌ Erro resetPassword:", error);
      return { success: false, error: error.message };
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

      const { error } = await supabase
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
  };
};
