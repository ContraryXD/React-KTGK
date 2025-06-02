// Search API for products
export async function timKiemSanPham(tuKhoa, options = {}) {
  const { limit = 20, skip = 0 } = options;

  try {
    console.log(`[Search API] Searching for: "${tuKhoa}"`);

    if (!tuKhoa || tuKhoa.trim() === "") {
      return {
        products: [],
        total: 0,
        skip: 0,
        limit: limit,
      };
    }

    // Build URL
    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(tuKhoa.trim())}&limit=${limit}&skip=${skip}`;
    console.log(`[Search API] Fetching: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[Search API] Found ${data.total} products for "${tuKhoa}"`);

    // Format product data with Vietnamese prices
    const ketQuaTimKiem = {
      products: data.products.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: `$${product.price}`,
        originalPrice: product.discountPercentage > 0 ? `$${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}` : null,
        discount: product.discountPercentage > 0 ? `-${Math.round(product.discountPercentage)}%` : null,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        thumbnail: product.thumbnail,
        image: product.thumbnail,
        images: product.images || [product.thumbnail],
      })),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
      tuKhoa: tuKhoa,
    };

    return ketQuaTimKiem;
  } catch (error) {
    console.error("[Search API] Error searching products:", error);
    throw error;
  }
}

// Get search suggestions based on categories and popular terms
export async function goiYTimKiem(tuKhoa) {
  try {
    if (!tuKhoa || tuKhoa.trim().length < 2) {
      return [];
    } // Get categories that match the search term
    const response = await fetch("https://dummyjson.com/products/categories");
    const categories = await response.json();

    const goiY = categories
      .filter((category) => {
        // Check if category is a string before using toLowerCase
        return typeof category === "string" && category.toLowerCase().includes(tuKhoa.toLowerCase());
      })
      .slice(0, 5)
      .map((category) => ({
        type: "category",
        text: category,
        slug: category.toLowerCase().replace(/\s+/g, "-"),
      })); // Add some popular search terms
    const tuKhoaPhoBien = ["phone", "laptop", "watch", "headphones", "shoes", "shirt", "dress", "bag", "perfume", "skincare"];

    const goiYPhoBien = tuKhoaPhoBien
      .filter((term) => {
        // Check if term is a string before using toLowerCase
        return typeof term === "string" && term.toLowerCase().includes(tuKhoa.toLowerCase());
      })
      .slice(0, 3)
      .map((term) => ({
        type: "product",
        text: term,
        slug: term,
      }));

    return [...goiY, ...goiYPhoBien];
  } catch (error) {
    console.error("[Search API] Error getting suggestions:", error);
    return [];
  }
}
