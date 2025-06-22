// composables/useAuth.ts - VERSÃO CORRIGIDA
import type { User } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase";

export const useAuth = () => {
  // ✅ CORRETO: Usar composable dentro de função
  const supabase = useSupabase();
  const router = useRouter();

  // Estados reativos
  const user = ref<User | null>(null);
  const loading = ref(true);
  const profile = ref<
    Database["public"]["Tables"]["user_profiles"]["Row"] | null
  >(null);

  // Verificar sessão atual
  const getCurrentUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      user.value = session?.user ?? null;

      if (user.value) {
        await getUserProfile();
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
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

  // Login com email e senha
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      user.value = data.user;
      await getUserProfile();

      return { data, error: null };
    } catch (error) {
      console.error("Erro no login:", error);
      return { data: null, error };
    }
  };

  // Registro
  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Erro no registro:", error);
      return { data: null, error };
    }
  };

  // Logout
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      user.value = null;
      profile.value = null;

      await router.push("/");
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  // Atualizar perfil
  const updateProfile = async (
    updates: Database["public"]["Tables"]["user_profiles"]["Update"]
  ) => {
    if (!user.value) throw new Error("Usuário não autenticado");

    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update(updates)
        .eq("id", user.value.id)
        .select()
        .single();

      if (error) throw error;

      profile.value = data;
      return { data, error: null };
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return { data: null, error };
    }
  };

  // Resetar senha
  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Erro ao resetar senha:", error);
      return { data: null, error };
    }
  };

  // Verificar se usuário é admin
  const isAdmin = computed(() => {
    return profile.value?.email?.includes("@atapera.shop") || false;
  });

  // Verificar se está autenticado
  const isAuthenticated = computed(() => !!user.value);

  // Inicializar auth listener
  const initAuthListener = () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      user.value = session?.user ?? null;

      if (event === "SIGNED_IN") {
        await getUserProfile();
      }

      if (event === "SIGNED_OUT") {
        profile.value = null;
      }
    });
  };

  // Auto-inicializar quando composable é usado
  if (process.client) {
    getCurrentUser();
    initAuthListener();
  }

  return {
    // Estados
    user: readonly(user),
    profile: readonly(profile),
    loading: readonly(loading),

    // Computed
    isAuthenticated,
    isAdmin,

    // Métodos
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
    getCurrentUser,
    getUserProfile,
  };
};
