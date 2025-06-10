<template>
  <footer class="bg-white border-t border-gray-200 mt-16">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="text-xl font-bold text-gray-900">Store</span>
          </div>
          <p class="text-gray-600 mb-4">
            Modern e-commerce store built with Nuxt 3 and WooCommerce.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-gray-600 transition-colors">
              <TwitterIcon class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-600 transition-colors">
              <FacebookIcon class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-600 transition-colors">
              <GithubIcon class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-gray-600 hover:text-blue-600 transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/products" class="text-gray-600 hover:text-blue-600 transition-colors">Products</NuxtLink></li>
            <li><NuxtLink to="/categories" class="text-gray-600 hover:text-blue-600 transition-colors">Categories</NuxtLink></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Support</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Shipping</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
        <p>&copy; 2025 Store. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer logic can be added here
</script>