export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
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
      description: "<p>Experience premium sound quality with these wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort.</p><ul><li>Active Noise Cancellation</li><li>30-hour battery life</li><li>Premium comfort design</li><li>Bluetooth 5.0 connectivity</li></ul>",
      images: [
        { src: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { src: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=800" }
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
      description: "<p>Monitor your health and fitness with GPS tracking, heart rate monitoring, and 7-day battery life.</p><ul><li>GPS tracking</li><li>Heart rate monitoring</li><li>7-day battery life</li><li>Water resistant</li></ul>",
      images: [
        { src: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ]
    }
  ]
  
  const product = mockProducts.find(p => p.slug === slug)
  
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }
  
  return product
})