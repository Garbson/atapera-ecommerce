// composables/useCacheControl.ts
// Utilitário para controle de cache e atualização forçada

export const useCacheControl = () => {
  const router = useRouter()
  const route = useRoute()

  // ✅ Força refresh total da página quando cache está problemático
  const forcePageRefresh = () => {
    if (process.client) {
      // Usar location.reload() para refresh total sem cache
      window.location.reload()
    }
  }

  // ✅ Força revalidação de stores com timestamp único
  const forceStoreRefresh = async (storeName: string) => {
    const timestamp = Date.now()

    try {
      switch (storeName) {
        case 'products':
          const productsStore = useProductsStore()
          productsStore.clearProductsCache()
          await productsStore.fetchProducts({ _timestamp: timestamp })
          break

        case 'categories':
          const categoriesStore = useCategoriesStore()
          await categoriesStore.fetchCategories()
          break

        default:
          console.warn(`Store '${storeName}' não reconhecida para refresh`)
      }
    } catch (error) {
      console.error(`Erro ao forçar refresh da store ${storeName}:`, error)
    }
  }

  // ✅ Limpa apenas caches específicos do app (SEGURO)
  const clearAppCaches = async () => {
    if (process.client) {
      try {
        // Limpar apenas keys específicas do app, não TUDO
        const keysToRemove = []
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          // Remover apenas keys relacionadas ao app (pinia, produtos, etc)
          if (key && (
            key.startsWith('pinia:') ||
            key.startsWith('products:') ||
            key.startsWith('categories:') ||
            key.includes('cache')
          )) {
            keysToRemove.push(key)
          }
        }

        keysToRemove.forEach(key => localStorage.removeItem(key))

        // NÃO limpar sessionStorage - pode quebrar outras funcionalidades
        // sessionStorage.clear() // ❌ REMOVIDO

        console.log(`✅ Caches do app limpos (${keysToRemove.length} items)`)
      } catch (error) {
        console.error('❌ Erro ao limpar caches:', error)
      }
    }
  }

  // ✅ Navegação forçada sem cache (adiciona timestamp à URL)
  const navigateWithoutCache = (path: string) => {
    const timestamp = Date.now()
    const separator = path.includes('?') ? '&' : '?'
    const urlWithTimestamp = `${path}${separator}_t=${timestamp}`

    return router.push(urlWithTimestamp)
  }

  // ✅ Detecta se a página precisa de refresh baseado em patterns conhecidos
  const shouldForceRefresh = () => {
    // Detectar se estamos em páginas administrativas onde cache é problemático
    const isAdminPage = route.path.startsWith('/admin')
    const isProductPage = route.path.includes('produto')

    return isAdminPage || isProductPage
  }

  // ✅ Auto-refresh em situações específicas
  const autoRefreshIfNeeded = async () => {
    if (shouldForceRefresh()) {
      // Forçar refresh das stores críticas
      await Promise.all([
        forceStoreRefresh('products'),
        forceStoreRefresh('categories')
      ])
    }
  }

  // ✅ Utilitário para debug de cache
  const debugCacheStatus = () => {
    const productsStore = useProductsStore()
    const categoriesStore = useCategoriesStore()

    console.log('🔍 Debug Cache Status:', {
      products: {
        count: productsStore.products?.length || 0,
        loading: productsStore.loading,
        lastUpdate: new Date().toISOString()
      },
      categories: {
        count: categoriesStore.categories?.length || 0,
        active: categoriesStore.activeCategories?.length || 0
      },
      route: route.path,
      timestamp: Date.now()
    })
  }

  return {
    forcePageRefresh,
    forceStoreRefresh,
    clearAppCaches, // ✅ Método mais seguro
    navigateWithoutCache,
    shouldForceRefresh,
    autoRefreshIfNeeded,
    debugCacheStatus
  }
}