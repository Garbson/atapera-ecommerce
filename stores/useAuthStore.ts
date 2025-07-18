// stores/useAuthStore.ts
export const useAuthStore = defineStore("auth", () => {
  const user = useSupabase();
  const supabase = useSupabase();

  // Estado
  const loading = ref(false);
  const error = ref(null);
  const profile = ref(null);
  const isAdmin = ref(false);

  // Types
  interface LoginCredentials {
    email: string;
    password: string;
  }

  interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    fullName?: string;
  }

  interface ProfileData {
    id?: string;
    email?: string;
    full_name?: string;
    avatar_url?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
    role?: string;
  }

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const userEmail = computed(() => user.value?.email);
  const userName = computed(
    () => profile.value?.full_name || user.value?.email
  );

  // Actions
  const signIn = async (credentials: LoginCredentials) => {
    try {
      loading.value = true;
      error.value = null;

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

      if (signInError) throw signInError;

      // Carregar perfil após login
      if (data.user) {
        await loadProfile();
        await checkAdminRole();
      }

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro no login:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const signUp = async (userData: RegisterData) => {
    try {
      loading.value = true;
      error.value = null;

      if (userData.password !== userData.confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro no registro:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    try {
      loading.value = true;
      error.value = null;

      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;

      // Limpar estado
      profile.value = null;
      isAdmin.value = false;

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro no logout:", err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      loading.value = true;
      error.value = null;

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (resetError) throw resetError;

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao redefinir senha:", err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      loading.value = true;
      error.value = null;

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao atualizar senha:", err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const loadProfile = async () => {
    try {
      if (!user.value) return;

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.value.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      profile.value = data || {
        id: user.value.id,
        email: user.value.email,
        full_name: user.value.user_metadata?.full_name,
      };

      return { data, error: null };
    } catch (err: any) {
      console.error("Erro ao carregar perfil:", err);
      return { data: null, error: err.message };
    }
  };

  const updateProfile = async (profileData: Partial<ProfileData>) => {
    try {
      loading.value = true;
      error.value = null;

      if (!user.value) throw new Error("Usuário não autenticado");

      const updateData = {
        ...profileData,
        id: user.value.id,
        updated_at: new Date().toISOString(),
      };

      const { data, error: updateError } = await supabase
        .from("profiles")
        .upsert(updateData)
        .select()
        .single();

      if (updateError) throw updateError;

      profile.value = data;

      // Atualizar metadados do usuário se necessário
      if (profileData.full_name) {
        await supabase.auth.updateUser({
          data: { full_name: profileData.full_name },
        });
      }

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao atualizar perfil:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const checkAdminRole = async () => {
    try {
      if (!user.value) {
        isAdmin.value = false;
        return false;
      }

      // Verificar se o usuário tem role de admin
      const { data, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.value.id)
        .eq("role", "admin")
        .single();

      isAdmin.value = !!data && !roleError;

      return isAdmin.value;
    } catch (err: any) {
      console.error("Erro ao verificar role de admin:", err);
      isAdmin.value = false;
      return false;
    }
  };

  const signInWithProvider = async (
    provider: "google" | "github" | "discord"
  ) => {
    try {
      loading.value = true;
      error.value = null;

      const { data, error: providerError } =
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });

      if (providerError) throw providerError;

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro no login com provedor:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      loading.value = true;
      error.value = null;

      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (magicLinkError) throw magicLinkError;

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro no magic link:", err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const refreshSession = async () => {
    try {
      const { data, error: refreshError } =
        await supabase.auth.refreshSession();

      if (refreshError) throw refreshError;

      return { data, error: null };
    } catch (err: any) {
      console.error("Erro ao renovar sessão:", err);
      return { data: null, error: err.message };
    }
  };

  const getCurrentSession = async () => {
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      return { data, error: null };
    } catch (err: any) {
      console.error("Erro ao obter sessão:", err);
      return { data: null, error: err.message };
    }
  };

  // Verificar se o usuário pode acessar área administrativa
  const canAccessAdmin = computed(() => {
    return isAuthenticated.value && isAdmin.value;
  });

  // Limpar erros
  const clearError = () => {
    error.value = null;
  };

  // Inicializar store
  const initialize = async () => {
    if (user.value) {
      await loadProfile();
      await checkAdminRole();
    }
  };

  // Watch para mudanças no usuário
  watch(
    user,
    async (newUser) => {
      if (newUser) {
        await loadProfile();
        await checkAdminRole();
      } else {
        profile.value = null;
        isAdmin.value = false;
      }
    },
    { immediate: true }
  );

  return {
    // Estado
    loading: readonly(loading),
    error: readonly(error),
    profile: readonly(profile),
    isAdmin: readonly(isAdmin),

    // Getters
    isAuthenticated,
    userEmail,
    userName,
    canAccessAdmin,

    // Actions
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    loadProfile,
    updateProfile,
    checkAdminRole,
    signInWithProvider,
    signInWithMagicLink,
    refreshSession,
    getCurrentSession,
    clearError,
    initialize,
  };
});
