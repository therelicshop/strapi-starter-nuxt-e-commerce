export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')
  
  try {
    // First, get products by slug
    const baseUrl = `${config.public.woocommerceUrl}/wp-json/wc/v3/products`
    const params = new URLSearchParams()
    
    params.append('slug', slug)
    params.append('consumer_key', config.woocommerceKey)
    params.append('consumer_secret', config.woocommerceSecret)
    
    const url = `${baseUrl}?${params.toString()}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`)
    }
    
    const products = await response.json()
    
    if (!products || products.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found'
      })
    }
    
    const product = products[0]
    
    // Transform product to match our frontend expectations
    const transformedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      stock_status: product.stock_status,
      stock_quantity: product.stock_quantity,
      short_description: product.short_description,
      description: product.description,
      images: product.images || [],
      categories: product.categories || [],
      tags: product.tags || [],
      attributes: product.attributes || [],
      variations: product.variations || [],
      featured: product.featured,
      catalog_visibility: product.catalog_visibility,
      date_created: product.date_created,
      date_modified: product.date_modified,
      related_ids: product.related_ids || [],
      cross_sell_ids: product.cross_sell_ids || [],
      upsell_ids: product.upsell_ids || []
    }
    
    return transformedProduct
    
  } catch (error) {
    console.error('Error fetching product:', error)
    
    // Return mock product if API fails
    if (error.statusCode === 404) {
      throw error
    }
    
    return {
      id: 1,
      name: "Sample Product",
      slug: slug,
      regular_price: "99.99",
      sale_price: "",
      on_sale: false,
      stock_status: "instock",
      short_description: "This is a sample product while connecting to WooCommerce.",
      description: "<p>Please configure your WooCommerce API credentials to see live products.</p>",
      images: [
        { src: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ],
      error: 'Failed to connect to WooCommerce. Please check your API credentials.'
    }
  }
})