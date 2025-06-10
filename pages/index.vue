<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-12">
      <div class="max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p class="text-xl mb-6 opacity-90">
          Discover amazing products at unbeatable prices. Shop now and enjoy fast, free shipping on orders over $50.
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
    </section>
  </div>
</template>

<script setup>
const { data: featuredProducts, pending: loading } = await useFetch('/api/products', {
  query: { featured: true, per_page: 8 }
})

useHead({
  title: 'Home - Modern E-commerce Store',
  meta: [
    { name: 'description', content: 'Shop the latest products at our modern e-commerce store. Fast shipping, great prices, and excellent customer service.' }
  ]
})
</script>