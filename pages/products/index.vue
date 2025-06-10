<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900">All Products</h1>
      <div class="flex items-center space-x-4">
        <select v-model="sortBy" class="border border-gray-300 rounded-lg px-3 py-2">
          <option value="">Sort by</option>
          <option value="date">Newest</option>
          <option value="price">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Name: A to Z</option>
        </select>
      </div>
    </div>

    <ProductGrid :products="products" :loading="loading" />

    <!-- Load More Button -->
    <div v-if="hasMore && !loading" class="text-center mt-12">
      <button @click="loadMore" class="btn-primary">
        Load More Products
      </button>
    </div>
  </div>
</template>

<script setup>
const sortBy = ref('')
const page = ref(1)
const products = ref([])
const loading = ref(false)
const hasMore = ref(true)

const loadProducts = async (reset = false) => {
  loading.value = true
  
  try {
    const { data } = await $fetch('/api/products', {
      query: {
        page: reset ? 1 : page.value,
        per_page: 12,
        orderby: sortBy.value.includes('price') ? 'price' : sortBy.value,
        order: sortBy.value.includes('desc') ? 'desc' : 'asc'
      }
    })
    
    if (reset) {
      products.value = data
      page.value = 1
    } else {
      products.value.push(...data)
    }
    
    hasMore.value = data.length === 12
  } catch (error) {
    console.error('Error loading products:', error)
  } finally {
    loading.value = false
  }
}

const loadMore = () => {
  page.value++
  loadProducts()
}

// Watch for sort changes
watch(sortBy, () => {
  loadProducts(true)
})

// Initial load
onMounted(() => {
  loadProducts(true)
})

useHead({
  title: 'Products - Modern E-commerce Store',
  meta: [
    { name: 'description', content: 'Browse our complete collection of products. Find exactly what you\'re looking for with our easy-to-use filters and search.' }
  ]
})
</script>