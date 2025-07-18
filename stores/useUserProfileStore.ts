// stores/useUserProfileStore.ts
export const useUserProfileStore = defineStore('userProfile', () => {
  // Obter cliente Supabase diretamente na store
  const getSupabaseClient = () => { return useSupabase(); };

  // Estado
  const profile = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const dashboardStats = ref({
    totalOrders: 0,
    totalSpent: 0,
    activeAddresses: 0,
    wishlistItems: 0,
  });

  // Types
  interface UserProfile {
    id?: string;
    user_id: string;
    first_name: string;
    last_name: string;
    phone?: string;
    birth_date?: string;
    cpf?: string;
    gender?: 'male' | 'female' | 'other';
    newsletter_subscribed: boolean;
    created_at?: string;
    updated_at?: string;
  }

  interface DashboardData {
    stats: {
      totalOrders: number;
      totalSpent: number;
      activeAddresses: number;
      wishlistItems: number;
    };
    recentOrders: any[];
    favoriteCategories: any[];
  }

  // Getters
  const fullName = computed(() => {
    if (!profile.value) return '';
    return `${profile.value.first_name} ${profile.value.last_name}`.trim();
  });

  const isProfileComplete = computed(() => {
    if (!profile.value) return false;
    return !!(
      profile.value.first_name &&
      profile.value.last_name &&
      profile.value.phone
    );
  });

  // Actions
  const fetchProfile = async () => {
    try {
      loading.value = true;
      error.value = null;

      const { data: userState } = useAuth();
      if (!userState.value?.id) {
        return { data: null, error: 'Usuário não autenticado' };
      }

      const supabase = getSupabaseClient();
      const { data, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userState.value.id)
        .single();

      if (fetchError) throw fetchError;

      profile.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error('Erro ao buscar perfil:', err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const createProfile = async (profileData: Omit<UserProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      loading.value = true;
      error.value = null;

      const { data: userState } = useAuth();
      if (!userState.value?.id) {
        return { data: null, error: 'Usuário não autenticado' };
      }

      const newProfile = {
        ...profileData,
        user_id: userState.value.id,
        cpf: profileData.cpf?.replace(/\D/g, ''), // Remove formatação
        phone: profileData.phone?.replace(/\D/g, ''), // Remove formatação
      };

      const supabase = getSupabaseClient();
      const { data, error: createError } = await supabase
        .from('user_profiles')
        .insert([newProfile])
        .select()
        .single();

      if (createError) throw createError;

      profile.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error('Erro ao criar perfil:', err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    try {
      loading.value = true;
      error.value = null;

      const { data: userState } = useAuth();
      if (!userState.value?.id || !profile.value?.id) {
        return { data: null, error: 'Perfil não encontrado' };
      }

      const cleanData = {
        ...profileData,
        cpf: profileData.cpf?.replace(/\D/g, ''), // Remove formatação
        phone: profileData.phone?.replace(/\D/g, ''), // Remove formatação
        updated_at: new Date().toISOString(),
      };

      const supabase = getSupabaseClient();
      const { data, error: updateError } = await supabase
        .from('user_profiles')
        .update(cleanData)
        .eq('id', profile.value.id)
        .select()
        .single();

      if (updateError) throw updateError;

      profile.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error('Erro ao atualizar perfil:', err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const fetchDashboardData = async (): Promise<DashboardData | null> => {
    const { data: userState } = useAuth();
    if (!userState.value?.id) {
      return null;
    }

    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();
      // Buscar estatísticas em paralelo
      const [ordersResult, addressesResult] = await Promise.all([
        supabase
          .from('orders')
          .select('total_amount, status, created_at')
          .eq('customer_id', userState.value.id),
        
        supabase
          .from('addresses')
          .select('id')
          .eq('user_id', userState.value.id)
      ]);

      const orders = ordersResult.data || [];
      const addresses = addressesResult.data || [];

      // Calcular estatísticas
      const totalOrders = orders.length;
      const totalSpent = orders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + order.total_amount, 0);

      const activeAddresses = addresses.length;

      // Pedidos recentes (últimos 5)
      const recentOrders = orders
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

      // Atualizar estado
      dashboardStats.value = {
        totalOrders,
        totalSpent,
        activeAddresses,
        wishlistItems: 0, // TODO: implementar wishlist
      };

      return {
        stats: dashboardStats.value,
        recentOrders,
        favoriteCategories: [], // TODO: implementar categorias favoritas
      };

    } catch (err: any) {
      error.value = err.message;
      console.error('Erro ao buscar dados do dashboard:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Validações
  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validar dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) digit1 = 0;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) digit2 = 0;
    
    return cleanCPF.charAt(9) == digit1 && cleanCPF.charAt(10) == digit2;
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 10 || cleanPhone.length === 11;
  };

  // Formatadores
  const formatCPF = (cpf: string): string => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 11) {
      return cleanPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (cleanPhone.length === 10) {
      return cleanPhone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    return phone;
  };

  const clearError = () => {
    error.value = null;
  };

  const clearProfile = () => {
    profile.value = null;
    dashboardStats.value = {
      totalOrders: 0,
      totalSpent: 0,
      activeAddresses: 0,
      wishlistItems: 0,
    };
  };

  return {
    // Estado
    profile: readonly(profile),
    loading: readonly(loading),
    error: readonly(error),
    dashboardStats: readonly(dashboardStats),

    // Getters
    fullName,
    isProfileComplete,

    // Actions
    fetchProfile,
    createProfile,
    updateProfile,
    fetchDashboardData,

    // Validações
    validateCPF,
    validatePhone,

    // Formatadores
    formatCPF,
    formatPhone,

    // Utilitários
    clearError,
    clearProfile,
  };
});