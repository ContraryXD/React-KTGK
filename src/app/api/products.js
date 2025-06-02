import axios from "axios";

export async function getProducts({ limit = 9, skip = 0, sortBy = null, order = "asc", category = null, minPrice = null, maxPrice = null } = {}) {
  try {
    let url = `https://dummyjson.com/products`;
    const params = new URLSearchParams();

    // Add category filter if specified
    if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    // For client-side filtering/sorting, we need to get all products
    const needsClientProcessing = minPrice !== null || maxPrice !== null || sortBy;

    if (needsClientProcessing) {
      // Get all products for client-side processing
      params.append("limit", "0"); // 0 means get all products
      console.log("Fetching all products for client-side processing");
    } else {
      // Use server-side pagination when no filtering/sorting needed
      params.append("limit", limit.toString());
      params.append("skip", skip.toString());
    }

    const fullUrl = `${url}?${params.toString()}`;
    console.log("API URL:", fullUrl); // Debug log
    const response = await axios.get(fullUrl);

    let products = response.data.products || [];
    let totalProducts = response.data.total || 0;

    if (needsClientProcessing) {
      // Apply price filtering
      if (minPrice !== null || maxPrice !== null) {
        products = products.filter((product) => {
          const price = product.price;
          const minMatch = minPrice === null || price >= minPrice;
          const maxMatch = maxPrice === null || price <= maxPrice;
          return minMatch && maxMatch;
        });
        console.log(`Price filtered: ${products.length} products remain`);
      }

      // Apply sorting
      if (sortBy && products.length > 0) {
        products.sort((a, b) => {
          let aValue, bValue;

          if (sortBy === "title") {
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
          } else if (sortBy === "price") {
            aValue = a.price;
            bValue = b.price;
          } else {
            return 0;
          }

          if (order === "desc") {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          } else {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          }
        });
        console.log(`Sorted by ${sortBy} ${order}`);
      }

      // Update total after filtering/sorting
      totalProducts = products.length;

      // Apply pagination on client side
      const startIndex = skip;
      const endIndex = skip + limit;
      products = products.slice(startIndex, endIndex);

      console.log(`Client-side pagination: showing ${products.length} of ${totalProducts} products`);
    }

    return {
      products,
      total: totalProducts,
      skip: skip,
      limit: limit,
    };
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function searchProducts(query, limit = 10) {
  try {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
}
