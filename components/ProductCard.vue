<template>
  <div class="card group cursor-pointer transition-transform duration-200 hover:scale-105">
    <div class="aspect-square bg-gray-100 relative overflow-hidden">
      <img 
        :src="product.images?.[0]?.src || '/placeholder-image.jpg'" 
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div class="absolute top-2 right-2">
        <span v-if="product.on_sale" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Sale
        </span>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span v-if="product.on_sale" class="text-lg font-bold text-red-600">
            ${{ product.sale_price }}
          </span>
          <span 
            :class="[
              'text-lg font-bold',
              product.on_sale ? 'text-gray-500 line-through text-sm' : 'text-gray-900'
            ]"
          >
            ${{ product.regular_price }}
          </span>
        </div>
        <button class="btn-primary text-sm px-3 py-1">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>