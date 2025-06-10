<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">R</span>
          </div>
          <span class="text-xl font-bold text-gray-900">The Relic</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Home
          </NuxtLink>
          <NuxtLink to="/products" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Products
          </NuxtLink>
          <NuxtLink to="/categories" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Categories
          </NuxtLink>
        </nav>

        <!-- Cart -->
        <div class="flex items-center space-x-4">
          <button class="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <CartIcon class="w-6 h-6" />
            <span class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Header logic will be added here
</script>