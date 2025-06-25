// composables/useAuth.ts - VERSÃO FINAL CORRIGIDA
import type { Session, User } from "@supabase/supabase-js";

export const useAuth = () => {
  const supabase = useSupabase();
  const router = useRouter();

  // Estados reativos
  const user = ref<User | null>(null);
  const session = ref<Session | null>(null);
  const loading = ref(true);
  const profile = ref<any>(null);

  // Computed
  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => {
    return (
      profile.value?.email?.includes("@atapera.shop") ||
      user.value?.user_metadata?.role === "admin" ||
      false
    );
  });

  // Inicializar sessão
  const initAuth = async () => {
    loading.value = true;

    try {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      session.value = currentSession;
      user.value = currentSession?.user ?? null;

      if (user.value) {
        await getUserProfile();
      }

      // Listener para mudanças de autenticação
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        session.value = newSession;
        user.value = newSession?.user ?? null;

        if (event === "SIGNED_IN" && newSession?.user) {
          await createOrUpdateProfile(newSession.user);
          await getUserProfile();
        }

        if (event === "SIGNED_OUT") {
          profile.value = null;
        }
      });
    } catch (error) {
      console.error("Erro ao inicializar auth:", error);
    } finally {
      loading.value = false;
    }
  };

  // Buscar perfil do usuário
  const getUserProfile = async () => {
    if (!user.value) return;

    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.value.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      profile.value = data;
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  // Criar ou atualizar perfil do usuário
  const createOrUpdateProfile = async (authUser: User) => {
    try {
      const { data: existingProfile } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (!existingProfile) {
        const { error } = await supabase.from("user_profiles").insert({
          id: authUser.id,
          email: authUser.email!,
          name: authUser.user_metadata?.name || null,
          cpf: authUser.user_metadata?.cpf || null,
          phone: authUser.user_metadata?.phone || null,
        });

        if (error) throw error;
      }
    } catch (error) {
      console.error("Erro ao criar/atualizar perfil:", error);
    }
  };

  // Login com email/senha
  const signIn = async (email: string, password: string) => {
    loading.value = true;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Erro no login",
      };
    } finally {
      loading.value = false;
    }
  };

  // Cadastro
  const signUp = async (
    email: string,
    password: string,
    userData?: {
      name?: string;
      cpf?: string;
      phone?: string;
    }
  ) => {
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

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Erro no cadastro",
      };
    } finally {
      loading.value = false;
    }
  };

  // Login com Google
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
      return {
        success: false,
        error: error.message || "Erro no login com Google",
      };
    }
  };

  // Logout
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      user.value = null;
      session.value = null;
      profile.value = null;

      await router.push("/");
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Erro no logout",
      };
    }
  };

  // Reset senha
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Erro ao enviar email de reset",
      };
    }
  };

  // Atualizar perfil
  const updateProfile = async (updates: {
    name?: string;
    cpf?: string;
    phone?: string;
  }) => {
    if (!user.value) return { success: false, error: "Usuário não logado" };

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update(updates)
        .eq("id", user.value.id);

      if (error) throw error;

      // Atualizar profile local
      if (profile.value) {
        profile.value = { ...profile.value, ...updates };
      }

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Erro ao atualizar perfil",
      };
    }
  };

  return {
    // Estados
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
