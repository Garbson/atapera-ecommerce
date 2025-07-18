// stores/useAddressStore.ts
export const useAddressStore = defineStore('addresses', () => {
  // Obter cliente Supabase diretamente na store
  const getSupabaseClient = () => { return useSupabase(); };

  // Estado
  const addresses = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const currentAddress = ref(null);

  // Types
  interface Address {
    id?: string;
    user_id: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    postal_code: string;
    is_default: boolean;
    created_at?: string;
    updated_at?: string;
  }

  interface CEPData {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
  }

  // Getters
  const defaultAddress = computed(() => 
    addresses.value.find((addr: Address) => addr.is_default)
  );

  const sortedAddresses = computed(() => 
    [...addresses.value].sort((a: Address, b: Address) => {
      if (a.is_default && !b.is_default) return -1;
      if (!a.is_default && b.is_default) return 1;
      return 0;
    })
  );

  // Actions
  const fetchAddresses = async () => {
    try {
      loading.value = true;
      error.value = null;

      const { data: userState } = useAuth();
      if (!userState.value?.id) {
        return { data: [], error: 'Usuário não autenticado' };
      }

      const supabase = getSupabaseClient();
      const { data, error: fetchError } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userState.value.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      addresses.value = data || [];
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error('Erro ao buscar endereços:', err);
      return { data: [], error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const createAddress = async (addressData: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      loading.value = true;
      error.value = null;

      const { data: userState } = useAuth();
      if (!userState.value?.id) {
        return { data: null, error: 'Usuário não autenticado' };
      }

      const newAddress = {
        ...addressData,
        user_id: userState.value.id,
        postal_code: addressData.postal_code.replace(/\D/g, ''), // Remove formatação
      };

      // Se for o primeiro endereço ou marcado como padrão, definir como padrão
      if (addresses.value.length === 0 || addressData.is_default) {
        // Remover padrão de outros endereços
        if (addressData.is_default) {
          await updateDefaultAddress(null);
        }
        newAddress.is_default = true;
      }

      const supabase = getSupabaseClient();
      const { data, error: createError } = await supabase
        .from('addresses')
        .insert([newAddress])
        .select()
        .single();

      if (createError) throw createError;

      addresses.value.unshift(data);
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error('Erro ao criar endereço:', err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const updateAddress = async (id: string, addressData: Partial<Address>) => {
    try {
      loading.value = true;
      error.value = null;

      const cleanData = {
        ...addressData,
        postal_code: addressData.postal_code?.replace(/\D/g, ''), // Remove formatação
      };

      // Se marcando como padrão, remover padrão de outros
      if (cleanData.is_default) {
        await updateDefaultAddress(null);
      }

      const supabase = getSupabaseClient();
      const { data, error: updateError } = await supabase
        .from('addresses')
        .update({ ...cleanData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      const index = addresses.value.findIndex((addr: Address) => addr.id === id);
      if (index !== -1) {
        addresses.value[index] = data;
      }
      
      if (currentAddress.value?.id === id) {
        currentAddress.value = data;
      }

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error('Erro ao atualizar endereço:', err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;

      const addressToDelete = addresses.value.find((addr: Address) => addr.id === id);
      const isDefault = addressToDelete?.is_default;

      const supabase = getSupabaseClient();
      const { error: deleteError } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      addresses.value = addresses.value.filter((addr: Address) => addr.id !== id);
      
      if (currentAddress.value?.id === id) {
        currentAddress.value = null;
      }

      // Se era o endereço padrão e ainda há endereços, definir o primeiro como padrão
      if (isDefault && addresses.value.length > 0) {
        await setAsDefault(addresses.value[0].id!);
      }

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error('Erro ao excluir endereço:', err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const setAsDefault = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;

      const { data: userState } = useAuth();
      const supabase = getSupabaseClient();
      
      // Primeiro, remover padrão de todos os endereços do usuário
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', userState.value.id);

      // Depois, definir o endereço selecionado como padrão
      const { data, error: updateError } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Atualizar estado local
      addresses.value.forEach((addr: Address) => {
        addr.is_default = addr.id === id;
      });

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error('Erro ao definir endereço como padrão:', err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const fetchCEP = async (cep: string): Promise<CEPData | null> => {
    const cleanCEP = cep.replace(/\D/g, '');
    
    if (cleanCEP.length !== 8) {
      return null;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        return null;
      }
      
      return data;
    } catch (err) {
      console.error('Erro ao buscar CEP:', err);
      return null;
    }
  };

  const validateCEP = (cep: string): boolean => {
    const cleanCEP = cep.replace(/\D/g, '');
    return cleanCEP.length === 8;
  };

  const formatCEP = (cep: string): string => {
    const cleanCEP = cep.replace(/\D/g, '');
    return cleanCEP.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  };

  // Método auxiliar para atualizar endereços padrão
  const updateDefaultAddress = async (excludeId: string | null) => {
    try {
      const { data: userState } = useAuth();
      const supabase = getSupabaseClient();
      
      let query = supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', userState.value.id);

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { error: updateError } = await query;
      if (updateError) throw updateError;

      return { error: null };
    } catch (err: any) {
      console.error('Erro ao atualizar endereços padrão:', err);
      return { error: err.message };
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const clearCurrentAddress = () => {
    currentAddress.value = null;
  };

  return {
    // Estado
    addresses: readonly(addresses),
    loading: readonly(loading),
    error: readonly(error),
    currentAddress: readonly(currentAddress),

    // Getters
    defaultAddress,
    sortedAddresses,

    // Actions
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setAsDefault,
    fetchCEP,

    // Utilitários
    validateCEP,
    formatCEP,
    clearError,
    clearCurrentAddress,
  };
});