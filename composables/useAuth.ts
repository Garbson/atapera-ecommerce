import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "~/lib/supabase";

export const useAuth = () => {
  const user = ref<User | null>(null);
  const session = ref<Session | null>(null);
  const loading = ref(true);
  const userProfile = ref(null);

  // Obter cliente Supabase
  const supabase = getSupabaseClient();

  // Inicializar sessão
  const initAuth = async () => {
    loading.value = true;

    try {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      session.value = currentSession;
      user.value = currentSession?.user ?? null;

      // Listener para mudanças de autenticação
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        session.value = newSession;
        user.value = newSession?.user ?? null;

        if (event === "SIGNED_IN" && newSession?.user) {
          await createOrUpdateProfile(newSession.user);
        }
      });
    } catch (error) {
      console.error("Erro ao inicializar auth:", error);
    } finally {
      loading.value = false;
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
        });

        if (error) throw error;
      }
    } catch (error) {
      console.error("Erro ao criar/atualizar perfil:", error);
    }
  };

  // Resto dos métodos...
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
      return { success: false, error: error.message || "Erro no login" };
    } finally {
      loading.value = false;
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    loading.value = true;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: userData || {} },
      });
      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message || "Erro no cadastro" };
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await navigateTo("/");
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Erro no logout" };
    }
  };

  // Computed
  const isLoggedIn = computed(() => !!user.value);

  return {
    user: readonly(user),
    session: readonly(session),
    loading: readonly(loading),
    isLoggedIn,
    userProfile: readonly(userProfile),
    initAuth,
    signIn,
    signUp,
    signOut,
  };
};
