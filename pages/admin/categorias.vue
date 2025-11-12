<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Gerenciar Categorias</h1>
          <p class="text-gray-600">
            Organize e gerencie as categorias de produtos da loja
          </p>
        </div>
        <div class="flex items-center gap-4">
          <button
            @click="initializeCategories"
            :disabled="loading"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <svg
              v-if="loading"
              class="animate-spin w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
              />
            </svg>
            {{ loading ? "Inicializando..." : "Criar Categorias Base" }}
          </button>
          <button
            @click="showAddModal = true"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Nova Categoria
          </button>
        </div>
      </div>

      <!-- Categories Tree -->
      <div
        v-if="loading && categoriesTree.length === 0"
        class="flex justify-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"
        ></div>
      </div>

      <div v-else class="space-y-6">
        <!-- Category Tree Item -->
        <div
          v-for="categoryTree in categoriesTree"
          :key="categoryTree.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <!-- Parent Category -->
          <div class="relative overflow-hidden">
            <!-- Header com gradiente -->
            <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2"></div>

            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <!-- Cabeçalho da categoria -->
                  <div class="flex items-center gap-4 mb-3">
                    <!-- Ícone/Avatar da categoria -->
                    <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center border border-indigo-200">
                      <span class="text-2xl" v-if="categoryTree.icon">{{ categoryTree.icon }}</span>
                      <svg v-else class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>

                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-3 mb-1">
                        <h3 class="text-xl font-bold text-gray-900 truncate">
                          {{ categoryTree.name }}
                        </h3>
                        <span
                          :class="
                            categoryTree.is_active
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          "
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                        >
                          <div
                            :class="categoryTree.is_active ? 'bg-emerald-400' : 'bg-gray-400'"
                            class="w-2 h-2 rounded-full mr-1.5"
                          ></div>
                          {{ categoryTree.is_active ? "Ativa" : "Inativa" }}
                        </span>
                      </div>

                      <!-- Descrição melhorada -->
                      <p class="text-gray-600 text-sm leading-relaxed mb-3" v-if="categoryTree.description">
                        {{ categoryTree.description }}
                      </p>
                      <p class="text-gray-400 text-sm italic mb-3" v-else>
                        Nenhuma descrição definida
                      </p>
                    </div>
                  </div>

                  <!-- Informações técnicas com ícones -->
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <!-- URL -->
                    <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <div class="min-w-0 flex-1">
                        <p class="text-xs text-gray-500 mb-1">URL</p>
                        <p class="font-mono text-xs text-gray-700 truncate">
                          /categoria/{{ categoryTree.slug }}
                        </p>
                      </div>
                    </div>

                    <!-- Produtos -->
                    <div class="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <div class="min-w-0 flex-1">
                        <p class="text-xs text-gray-500 mb-1">Produtos</p>
                        <p class="text-sm font-semibold text-blue-700">
                          {{ categoryTree.product_count || 0 }}
                        </p>
                      </div>
                    </div>

                    <!-- Data -->
                    <div class="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                      <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div class="min-w-0 flex-1">
                        <p class="text-xs text-gray-500 mb-1">Criada</p>
                        <p class="text-xs font-medium text-purple-700">
                          {{ new Date(categoryTree.created_at).toLocaleDateString("pt-BR") }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Subcategorias counter -->
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span class="text-sm font-medium text-gray-700">
                      {{ (categoryTree.children || []).length }} subcategoria{{ (categoryTree.children || []).length !== 1 ? 's' : '' }}
                    </span>
                  </div>
                </div>

                <!-- Parent Category Actions -->
                <div class="flex flex-col gap-2 ml-4">
                  <!-- Botão Criar Subcategoria - Destaque -->
                  <button
                    @click="createSubcategory(categoryTree)"
                    class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    title="Criar Subcategoria"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span class="text-sm font-medium">Nova Sub</span>
                  </button>

                  <!-- Outros botões -->
                  <div class="flex gap-1">
                    <button
                      @click="editCategory(categoryTree)"
                      class="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                      title="Editar Categoria"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <button
                      @click="toggleCategoryStatus(categoryTree)"
                      :class="categoryTree.is_active ? 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100' : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'"
                      class="p-2 rounded-lg transition-colors border"
                      :title="categoryTree.is_active ? 'Desativar' : 'Ativar'"
                    >
                      <svg v-if="categoryTree.is_active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    <button
                      @click="deleteCategory(categoryTree)"
                      class="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                      title="Excluir Categoria"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Subcategories -->
          <div v-if="categoryTree.children && categoryTree.children.length > 0" class="border-t border-gray-200">
            <!-- Header das subcategorias -->
            <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-gray-900">Subcategorias</h4>
                    <p class="text-xs text-gray-500">{{ categoryTree.children.length }} item{{ categoryTree.children.length !== 1 ? 'ns' : '' }} encontrado{{ categoryTree.children.length !== 1 ? 's' : '' }}</p>
                  </div>
                </div>

                <button
                  @click="createSubcategory(categoryTree)"
                  class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Adicionar
                </button>
              </div>
            </div>

            <!-- Grid das subcategorias -->
            <div class="p-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div
                  v-for="subcategory in categoryTree.children"
                  :key="subcategory.id"
                  class="group relative bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200"
                >
                  <!-- Linha decorativa -->
                  <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-t-xl"></div>

                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                      <!-- Avatar da subcategoria -->
                      <div class="w-10 h-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center border border-indigo-100">
                        <span class="text-lg" v-if="subcategory.icon">{{ subcategory.icon }}</span>
                        <svg v-else class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>

                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <h4 class="text-sm font-semibold text-gray-900 truncate">
                            {{ subcategory.name }}
                          </h4>
                          <span
                            :class="
                              subcategory.is_active
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                            "
                            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
                          >
                            <div
                              :class="subcategory.is_active ? 'bg-emerald-400' : 'bg-gray-400'"
                              class="w-1.5 h-1.5 rounded-full mr-1"
                            ></div>
                            {{ subcategory.is_active ? "Ativa" : "Inativa" }}
                          </span>
                        </div>

                        <!-- Descrição -->
                        <p class="text-xs text-gray-600 leading-relaxed mb-2" v-if="subcategory.description">
                          {{ subcategory.description }}
                        </p>
                        <p class="text-xs text-gray-400 italic mb-2" v-else>
                          Sem descrição
                        </p>
                      </div>
                    </div>

                    <!-- Actions no hover -->
                    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        @click="editCategory(subcategory)"
                        class="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors border border-blue-200"
                        title="Editar Subcategoria"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      <button
                        @click="toggleCategoryStatus(subcategory)"
                        :class="subcategory.is_active ? 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100' : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'"
                        class="p-1.5 rounded-md transition-colors border"
                        :title="subcategory.is_active ? 'Desativar' : 'Ativar'"
                      >
                        <svg v-if="subcategory.is_active" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>

                      <button
                        @click="deleteCategory(subcategory)"
                        class="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors border border-red-200"
                        title="Excluir Subcategoria"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Footer info -->
                  <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div class="flex items-center gap-3 text-xs text-gray-500">
                      <div class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span class="font-mono truncate max-w-24">/{{ subcategory.slug }}</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span class="font-medium">{{ subcategory.product_count || 0 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Subcategories State -->
          <div v-if="!categoryTree.children || categoryTree.children.length === 0" class="border-t border-gray-200">
            <div class="p-8 bg-gradient-to-r from-gray-50 to-gray-100 text-center">
              <div class="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-sm">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 mb-2">Nenhuma subcategoria</h4>
              <p class="text-gray-600 mb-6 max-w-md mx-auto">
                Esta categoria ainda não possui subcategorias. Crie a primeira para organizar melhor seus produtos.
              </p>
              <button
                @click="createSubcategory(categoryTree)"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Criar primeira subcategoria
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="categoriesTree.length === 0 && !loading"
          class="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300"
        >
          <svg
            class="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Nenhuma categoria encontrada
          </h3>
          <p class="text-gray-600 mb-4">
            Comece criando sua primeira categoria de produtos
          </p>
          <button
            @click="showAddModal = true"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Criar Categoria
          </button>
        </div>
      </div>

      <!-- Mensagens -->
      <div
        v-if="message"
        class="mt-4 p-4 rounded-lg"
        :class="
          messageType === 'success'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        "
      >
        {{ message }}
      </div>
    </div>

    <!-- Modal Add/Edit Category -->
    <CategoryModal
      v-if="showAddModal || editingCategory"
      :category="editingCategory"
      @close="closeModal"
      @save="saveCategory"
    />
  </AdminLayout>
</template>

<script setup>
definePageMeta({
  middleware: ["admin-auth"],
});

// Composables
const supabase = useSupabase();
const categoriesStore = useCategoriesStore();
const { loading } = storeToRefs(categoriesStore);

// Computed para árvore de categorias
const categoriesTree = computed(() => categoriesStore.getCategoriesTree);

// Estados locais
const message = ref("");
const messageType = ref("success");
const showAddModal = ref(false);
const editingCategory = ref(null);
const creatingSubcategory = ref(null);

// Métodos CRUD
const editCategory = (category) => {
  editingCategory.value = { ...category };
  showAddModal.value = false;
  creatingSubcategory.value = null;
};

const createSubcategory = (parentCategory) => {
  creatingSubcategory.value = parentCategory;
  editingCategory.value = {
    name: '',
    slug: '',
    description: '',
    image_url: '',
    icon: '',
    is_active: true,
    sort_order: 0,
    parent_id: parentCategory.id,
    meta_title: '',
    meta_description: ''
  };
  showAddModal.value = false;
};

const closeModal = () => {
  showAddModal.value = false;
  editingCategory.value = null;
  creatingSubcategory.value = null;
};

const saveCategory = async () => {
  await categoriesStore.fetchCategories(true); // Recarregar lista após salvar com contagem
  showMessage('Categoria salva com sucesso!', 'success');
  closeModal();
};

const showMessage = (text, type = 'success') => {
  message.value = text;
  messageType.value = type;
  setTimeout(() => {
    message.value = '';
  }, 5000);
};

const toggleCategoryStatus = async (category) => {
  try {
    const result = await categoriesStore.toggleCategoryStatus(category.id);
    if (result.error) throw new Error(result.error);

    await categoriesStore.fetchCategories(true);
    showMessage(`Categoria ${category.is_active ? "desativada" : "ativada"} com sucesso!`);
  } catch (error) {
    console.error("Erro ao alterar status:", error);
    showMessage("Erro ao alterar status da categoria", "error");
  }
};

const deleteCategory = async (category) => {
  const isSubcategory = !!category.parent_id;
  const categoryType = isSubcategory ? "subcategoria" : "categoria";

  if (
    confirm(
      `Tem certeza que deseja excluir a ${categoryType} "${category.name}"? Esta ação não pode ser desfeita.`
    )
  ) {
    try {
      const result = await categoriesStore.deleteCategory(category.id);
      if (result.error) throw new Error(result.error);

      await categoriesStore.fetchCategories(true);
      showMessage(`${categoryType.charAt(0).toUpperCase() + categoryType.slice(1)} excluída com sucesso!`);
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      showMessage(
        `Erro ao excluir ${categoryType}. Verifique se não há produtos ou subcategorias vinculados.`,
        "error"
      );
    }
  }
};

const initializeCategories = async () => {
  try {
    // Categorias base para criar
    const baseCategories = [
      {
        name: "Airsoft",
        slug: "airsoft",
        description: "Equipamentos e acessórios para Airsoft",
        is_active: true,
      },
      {
        name: "Armas de Fogo",
        slug: "armas-fogo",
        description: "Armas de fogo registradas",
        is_active: true,
      },
      {
        name: "Armas de Pressão",
        slug: "armas-pressao",
        description: "Carabinas e pistolas de pressão",
        is_active: true,
      },
      {
        name: "Pesca",
        slug: "pesca",
        description: "Equipamentos para pesca esportiva",
        is_active: true,
      },
      {
        name: "Caça",
        slug: "caca",
        description: "Equipamentos para caça esportiva",
        is_active: true,
      },
      {
        name: "Vestuário",
        slug: "vestuario",
        description: "Roupas e acessórios outdoor",
        is_active: true,
      },
      {
        name: "Camping",
        slug: "camping",
        description: "Equipamentos para camping e aventuras outdoor",
        is_active: true,
      },
      {
        name: "Motores",
        slug: "motores",
        description: "Equipamentos para motores e acessórios automotivos",
        is_active: true,
      },
      {
        name: "Lazer",
        slug: "lazer",
        description: "Equipamentos de lazer e entretenimento para atividades recreativas",
        is_active: true,
      },
    ];

    // Verificar se categorias já existem
    const { data: existingCategories } = await supabase
      .from("categories")
      .select("slug");

    const existingSlugs = existingCategories?.map((c) => c.slug) || [];
    const categoriesToCreate = baseCategories.filter(
      (c) => !existingSlugs.includes(c.slug)
    );

    if (categoriesToCreate.length === 0) {
      showMessage("Todas as categorias base já existem!");
      return;
    }

    // Criar categorias
    const { error } = await supabase
      .from("categories")
      .insert(categoriesToCreate);

    if (error) throw error;

    showMessage(`${categoriesToCreate.length} categorias criadas com sucesso!`);

    // Recarregar categorias
    await categoriesStore.fetchCategories(true);
  } catch (err) {
    console.error("Erro ao criar categorias:", err);
    showMessage(`Erro ao criar categorias: ${err.message}`, "error");
  }
};

// Carregar categorias ao montar
onMounted(async () => {
  await categoriesStore.fetchCategories(true);
});

// SEO
useHead({
  title: "Categorias - Admin | Atapera",
});
</script>
