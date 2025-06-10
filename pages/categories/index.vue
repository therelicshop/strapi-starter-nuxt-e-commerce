<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Product Categories</h1>
      <p class="text-gray-600">Browse our product categories to find exactly what you're looking for.</p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="card animate-pulse">
        <div class="h-48 bg-gray-200"></div>
        <div class="p-4 space-y-2">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="categories.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <NuxtLink 
        v-for="category in categories" 
        :key="category.id"
        :to="`/products?category=${category.id}`"
        class="card group cursor-pointer transition-transform duration-200 hover:scale-105"
      >
        <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span class="text-white text-2xl font-bold">{{ category.name.charAt(0) }}</span>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-900 mb-2">{{ category.name }}</h3>
          <p class="text-gray-600 text-sm mb-2" v-if="category.description">{{ category.description }}</p>
          <p class="text-blue-600 text-sm">{{ category.count }} products</p>
        </div>
      </NuxtLink>
    </div>
    
    <div v-else class="text-center py-12">
      <p class="text-gray-500 text-lg">No categories found.</p>
    </div>
  </div>
</template>

<script setup>
const { data: categoriesData, pending: loading } = await useFetch('/api/categories', {
  query: { hide_empty: true, per_page: 20 }
})

const categories = computed(() => categoriesData.value?.data || [])

useHead({
  title: 'Categories - The Relic Store',
  meta: [
    { name: 'description', content: 'Browse our product categories to find exactly what you\'re looking for at The Relic Store.' }
  ]
})
</script>