<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-12">
      <div class="max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Welcome to The Relic
        </h1>
        <p class="text-xl mb-6 opacity-90">
          Discover unique and rare collectibles. From vintage treasures to modern rarities, find your next prized possession.
        </p>
        <NuxtLink to="/products" class="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Shop Now
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Featured Products</h2>
        <NuxtLink to="/products" class="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </NuxtLink>
      </div>
      
      <ProductGrid :products="featuredProducts" :loading="loading" />
      
      <div v-if="error" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <p class="text-yellow-800">{{ error }}</p>
        <p class="text-sm text-yellow-600 mt-1">Please check your WooCommerce API configuration.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data: productsData, pending: loading } = await useFetch('/api/products', {
  query: { featured: true, per_page: 8 }
})

const featuredProducts = computed(() => productsData.value?.data || [])
const error = computed(() => productsData.value?.error || null)

useHead({
  title: 'Home - The Relic Store',
  meta: [
    { name: 'description', content: 'Discover unique and rare collectibles at The Relic Store. From vintage treasures to modern rarities, find your next prized possession.' }
  ]
})
</script>