export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  // Mock data for now - replace with actual WooCommerce API call
  const mockProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      slug: "premium-wireless-headphones",
      regular_price: "199.99",
      sale_price: "149.99",
      on_sale: true,
      stock_status: "instock",
      short_description: "High-quality wireless headphones with noise cancellation.",
      description: "<p>Experience premium sound quality with these wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort.</p>",
      images: [
        { src: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ]
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      slug: "smart-fitness-watch",
      regular_price: "299.99",
      sale_price: "",
      on_sale: false,
      stock_status: "instock",
      short_description: "Track your fitness goals with this advanced smartwatch.",
      description: "<p>Monitor your health and fitness with GPS tracking, heart rate monitoring, and 7-day battery life.</p>",
      images: [
        { src: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ]
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      slug: "portable-bluetooth-speaker",
      regular_price: "79.99",
      sale_price: "59.99",
      on_sale: true,
      stock_status: "instock",
      short_description: "Compact speaker with powerful sound and waterproof design.",
      description: "<p>Take your music anywhere with this waterproof Bluetooth speaker featuring 12-hour battery life and 360-degree sound.</p>",
      images: [
        { src: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ]
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      slug: "wireless-charging-pad",
      regular_price: "49.99",
      sale_price: "",
      on_sale: false,
      stock_status: "instock",
      short_description: "Fast wireless charging for all compatible devices.",
      description: "<p>Charge your devices wirelessly with this sleek charging pad supporting fast charging up to 15W.</p>",
      images: [
        { src: "https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ]
    },
    {
      id: 5,
      name: "USB-C Hub",
      slug: "usb-c-hub",
      regular_price: "89.99",
      sale_price: "69.99",
      on_sale: true,
      stock_status: "instock",
      short_description: "7-in-1 USB-C hub with multiple ports and 4K HDMI output.",
      description: "<p>Expand your laptop connectivity with this versatile hub featuring USB 3.0, HDMI 4K, SD card reader, and more.</p>",
      images: [
        { src: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ]
    },
    {
      id: 6,
      name: "Mechanical Keyboard",
      slug: "mechanical-keyboard",
      regular_price: "129.99",
      sale_price: "",
      on_sale: false,
      stock_status: "instock",
      short_description: "RGB backlit mechanical keyboard with tactile switches.",
      description: "<p>Enhance your typing experience with this premium mechanical keyboard featuring customizable RGB lighting and durable switches.</p>",
      images: [
        { src: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ]
    },
    {
      id: 7,
      name: "Laptop Stand",
      slug: "laptop-stand",
      regular_price: "39.99",
      sale_price: "29.99",
      on_sale: true,
      stock_status: "instock",
      short_description: "Adjustable aluminum laptop stand for better ergonomics.",
      description: "<p>Improve your workspace ergonomics with this adjustable laptop stand made from premium aluminum.</p>",
      images: [
        { src: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ]
    },
    {
      id: 8,
      name: "Webcam HD 1080p",
      slug: "webcam-hd-1080p",
      regular_price: "69.99",
      sale_price: "",
      on_sale: false,
      stock_status: "instock",
      short_description: "Crystal clear HD webcam with auto-focus and built-in microphone.",
      description: "<p>Perfect for video calls and streaming with 1080p resolution, auto-focus, and noise-canceling microphone.</p>",
      images: [
        { src: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ]
    }
  ]
  
  // Apply filters based on query parameters
  let filteredProducts = [...mockProducts]
  
  if (query.featured) {
    filteredProducts = filteredProducts.slice(0, parseInt(query.per_page) || 8)
  }
  
  if (query.per_page) {
    const perPage = parseInt(query.per_page)
    const page = parseInt(query.page) || 1
    const start = (page - 1) * perPage
    filteredProducts = filteredProducts.slice(start, start + perPage)
  }
  
  return {
    data: filteredProducts,
    total: mockProducts.length
  }
})