export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  try {
    // Build WooCommerce API URL for categories
    const baseUrl = `${config.public.woocommerceUrl}/wp-json/wc/v3/products/categories`
    const params = new URLSearchParams()
    
    // Add query parameters
    if (query.page) params.append('page', query.page.toString())
    if (query.per_page) params.append('per_page', query.per_page.toString())
    if (query.orderby) params.append('orderby', query.orderby.toString())
    if (query.order) params.append('order', query.order.toString())
    if (query.hide_empty) params.append('hide_empty', query.hide_empty.toString())
    
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
    
    const categories = await response.json()
    
    return {
      data: categories,
      total: parseInt(response.headers.get('X-WP-Total') || '0')
    }
    
  } catch (error) {
    console.error('Error fetching categories:', error)
    
    // Fallback to mock data
    return {
      data: [
        {
          id: 1,
          name: "Sample Category",
          slug: "sample-category",
          description: "Please configure your WooCommerce API credentials.",
          count: 0
        }
      ],
      total: 1,
      error: 'Failed to connect to WooCommerce. Please check your API credentials.'
    }
  }
})