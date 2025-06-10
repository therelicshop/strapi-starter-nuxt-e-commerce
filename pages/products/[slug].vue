<template>
  <div v-if="product">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Product Images -->
      <div class="space-y-4">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img 
            :src="selectedImage" 
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-if="product.images.length > 1" class="grid grid-cols-4 gap-2">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImage = image.src"
            class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors"
            :class="selectedImage === image.src ? 'border-blue-500' : 'border-transparent'"
          >
            <img :src="image.src" :alt="product.name" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span v-if="product.on_sale" class="text-2xl font-bold text-red-600">
                ${{ product.sale_price }}
              </span>
              <span 
                :class="[
                  'text-2xl font-bold',
                  product.on_sale ? 'text-gray-500 line-through' : 'text-gray-900'
                ]"
              >
                ${{ product.regular_price }}
              </span>
            </div>
            <span v-if="product.on_sale" class="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
              Save ${{ (product.regular_price - product.sale_price).toFixed(2) }}
            </span>
          </div>
        </div>

        <div v-if="product.short_description" class="prose prose-gray">
          <div v-html="product.short_description"></div>
        </div>

        <!-- Add to Cart -->
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <label class="font-medium">Quantity:</label>
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button @click="quantity = Math.max(1, quantity - 1)" class="px-3 py-2 hover:bg-gray-100">-</button>
              <input v-model.number="quantity" type="number" min="1" class="w-16 text-center border-0 focus:ring-0" />
              <button @click="quantity++" class="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
          </div>
          
          <button 
            @click="addToCart"
            :disabled="product.stock_status !== 'instock'"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ product.stock_status === 'instock' ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>

        <!-- Product Details -->
        <div v-if="product.description" class="border-t pt-6">
          <h3 class="font-semibold text-lg mb-4">Product Details</h3>
          <div class="prose prose-gray max-w-none" v-html="product.description"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else-if="pending" class="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
    <div class="space-y-4">
      <div class="aspect-square bg-gray-200 rounded-lg"></div>
      <div class="grid grid-cols-4 gap-2">
        <div v-for="i in 4" :key="i" class="aspect-square bg-gray-200 rounded-lg"></div>
      </div>
    </div>
    <div class="space-y-6">
      <div class="h-8 bg-gray-200 rounded w-3/4"></div>
      <div class="h-6 bg-gray-200 rounded w-1/2"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 rounded"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-12">
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
    <p class="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
    <NuxtLink to="/products" class="btn-primary">Browse Products</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const quantity = ref(1)
const selectedImage = ref('')

const { data: product, pending } = await useFetch(`/api/products/${route.params.slug}`)

// Set initial selected image
watch(product, (newProduct) => {
  if (newProduct && newProduct.images.length > 0) {
    selectedImage.value = newProduct.images[0].src
  }
}, { immediate: true })

const addToCart = () => {
  // Cart functionality will be implemented later
  console.log('Adding to cart:', { product: product.value, quantity: quantity.value })
  // Show success message or update cart state
}

useHead(() => ({
  title: product.value ? `${product.value.name} - Modern E-commerce Store` : 'Product - Modern E-commerce Store',
  meta: [
    { 
      name: 'description', 
      content: product.value?.short_description || 'Product details and information' 
    }
  ]
}))
</script>