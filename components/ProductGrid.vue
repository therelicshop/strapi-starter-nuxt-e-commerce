<template>
  <div>
    <div v-if="loading" class="product-grid">
      <div v-for="i in 8" :key="i" class="card animate-pulse">
        <div class="aspect-square bg-gray-200"></div>
        <div class="p-4 space-y-2">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="products.length > 0" class="product-grid">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product"
      />
    </div>
    
    <div v-else class="text-center py-12">
      <p class="text-gray-500 text-lg">No products found.</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>