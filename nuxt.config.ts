export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    }
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // Private keys (only available on server-side)
    woocommerceKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    woocommerceSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    // Public keys (exposed to client-side)
    public: {
      woocommerceUrl: process.env.WOOCOMMERCE_URL || 'https://shop.therelic.cc',
      apiUrl: '/api'
    }
  },
  nitro: {
    experimental: {
      wasm: true
    }
  }
})