// composables/useAuth.ts - VERSÃO FINAL DEFINITIVA - CORRIGIDA PGRST116
import type { Session, User } from "@supabase/supabase-js";

export const useAuth = () => {
  const supabase = useSupabase();

  // Estados reativos
  const user = ref<User | null>(null);
  const session = ref<Session | null>(null);
  const loading = ref(true);
  const profile = ref<any>(null);

  // ✅ COMPUTED CORRETO - retorna booleano diretamente
  const isLoggedIn = computed(() => {
    const result = !!user.value;
    console.log("🔍 isLoggedIn computed:", {
      user_exists: !!user.value,
      user_id: user.value?.id || null,
      result,
    });
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
    console.log("🔄 initAuth: começando...");
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

      console.log("📊 Sessão do Supabase:", {
        has_session: !!currentSession,
        has_user: !!currentSession?.user,
        user_email: currentSession?.user?.email || null,
      });

      // ✅ Atualizar estados
      session.value = currentSession;
      user.value = currentSession?.user || null;

      console.log("✅ Estados atualizados:", {
        user_set: !!user.value,
        session_set: !!session.value,
        isLoggedIn_value: isLoggedIn.value,
      });

      // ✅ Buscar perfil se logado
      if (user.value) {
        await getUserProfile();
      }

      // ✅ Listener para mudanças
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        console.log("🔄 Auth mudou:", event, !!newSession);

        session.value = newSession;
        user.value = newSession?.user || null;

        if (event === "SIGNED_IN" && newSession?.user) {
          // ✅ Apenas criar/carregar perfil uma vez
          await createOrUpdateProfile(newSession.user);
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
      console.log("🏁 initAuth: finalizado, isLoggedIn =", isLoggedIn.value);
    }
  };

  // ✅ CORRIGIDO - Buscar perfil SEM LOOP
  const getUserProfile = async () => {
    if (!user.value) return;

    try {
      console.log("👤 Buscando perfil para:", user.value.email);

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

      profile.value = data; // data será null se não encontrar
      console.log("✅ Perfil carregado:", !!data);
    } catch (error) {
      console.error("❌ Erro ao buscar perfil:", error);
      profile.value = null;
    }
  };

  // ✅ CORRIGIDO - Usar UPSERT para evitar duplicatas
  const createOrUpdateProfile = async (authUser: User) => {
    try {
      console.log("👤 Criando/atualizando perfil para:", authUser.email);

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
      console.log("✅ Perfil criado/atualizado:", !!profileData);
    } catch (error) {
      console.error("❌ Erro ao criar/atualizar perfil:", error);
    }
  };

  // ✅ Login
  const signIn = async (email: string, password: string) => {
    console.log("🔑 signIn: tentando login...");
    loading.value = true;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("✅ signIn: sucesso");
      return { success: true, data };
    } catch (error: any) {
      console.error("❌ Erro signIn:", error);
      return { success: false, error: error.message };
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
    console.log("📝 signUp: tentando cadastro...");
    loading.value = true;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData || {},
        },
      });

      if (error) throw error;

      console.log("✅ signUp: sucesso");
      return { success: true, data };
    } catch (error: any) {
      console.error("❌ Erro signUp:", error);
      return { success: false, error: error.message };
    } finally {
      loading.value = false;
    }
  };

  // ✅ Login com Google
  const signInWithGoogle = async () => {
    try {
      console.log("🔑 signInWithGoogle: iniciando...");

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      console.log("✅ signInWithGoogle: redirecionando");
      return { success: true };
    } catch (error: any) {
      console.error("❌ Erro signInWithGoogle:", error);
      return { success: false, error: error.message };
    }
  };

  // ✅ Logout
  const signOut = async () => {
    console.log("🚪 signOut: começando...");

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // ✅ Limpar estados imediatamente
      user.value = null;
      session.value = null;
      profile.value = null;

      console.log("✅ signOut: concluído, isLoggedIn =", isLoggedIn.value);

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
      console.log("📧 resetPassword: enviando email...");

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      console.log("✅ resetPassword: email enviado");
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
      console.log("📝 updateProfile: atualizando...");

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

      console.log("✅ updateProfile: concluído");
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
