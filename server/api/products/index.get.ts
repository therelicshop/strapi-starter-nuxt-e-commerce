export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  try {
    // Build WooCommerce API URL
    const baseUrl = `${config.public.woocommerceUrl}/wp-json/wc/v3/products`
    const params = new URLSearchParams()
    
    // Add query parameters
    if (query.page) params.append('page', query.page.toString())
    if (query.per_page) params.append('per_page', query.per_page.toString())
    if (query.orderby) params.append('orderby', query.orderby.toString())
    if (query.order) params.append('order', query.order.toString())
    if (query.featured) params.append('featured', 'true')
    if (query.category) params.append('category', query.category.toString())
    if (query.search) params.append('search', query.search.toString())
    
    // Add authentication
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
    
    // Transform products to match our frontend expectations
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      stock_status: product.stock_status,
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
      date_modified: product.date_modified
    }))
    
    return {
      data: transformedProducts,
      total: parseInt(response.headers.get('X-WP-Total') || '0'),
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '0')
    }
    
  } catch (error) {
    console.error('Error fetching products:', error)
    
    // Fallback to mock data if WooCommerce API fails
    const mockProducts = [
      {
        id: 1,
        name: "Sample Product",
        slug: "sample-product",
        regular_price: "99.99",
        sale_price: "",
        on_sale: false,
        stock_status: "instock",
        short_description: "This is a sample product while connecting to WooCommerce.",
        description: "<p>Please configure your WooCommerce API credentials to see live products.</p>",
        images: [
          { src: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800" }
        ]
      }
    ]
    
    return {
      data: mockProducts,
      total: 1,
      error: 'Failed to connect to WooCommerce. Please check your API credentials.'
    }
  }
})