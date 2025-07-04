import axios from "axios";

export function getAllProducts({ limit = 9, skip = 0 } = {}) {
   return axios
      .get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((response) => ({
         products: response.data.products || [],
         total: response.data.total || 0,
         skip: response.data.skip || 0,
         limit: response.data.limit || 0
      }))
      .catch((error) => {
         console.error("Lỗi khi tải tất cả sản phẩm:", error);
         throw error;
      });
}

export function sortingProducts({ limit = 9, skip = 0, sortBy, order } = {}) {
   let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

   if (sortBy) {
      url += `&sortBy=${sortBy}`;
   }
   if (order) {
      url += `&order=${order}`;
   }

   return axios
      .get(url)
      .then((response) => ({
         products: response.data.products || [],
         total: response.data.total || 0,
         skip: response.data.skip || 0,
         limit: response.data.limit || 0
      }))
      .catch((error) => {
         console.error("Lỗi khi sắp xếp sản phẩm:", error);
         throw error;
      });
}

export function getProductsByCategory({ category, limit = 9, skip = 0 }) {
   if (!category) {
      return Promise.reject(new Error("Category is required"));
   }

   return axios
      .get(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`)
      .then((response) => ({
         products: response.data.products || [],
         total: response.data.total || 0,
         skip: response.data.skip || 0,
         limit: response.data.limit || 0
      }))
      .catch((error) => {
         console.error(`Lỗi khi tải sản phẩm cho danh mục ${category}:`, error);
         throw error;
      });
}

export function getProductById(id) {
   return axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => response.data)
      .catch((error) => {
         console.error(`Error fetching product ${id}:`, error);
         throw error;
      });
}

export function searchProducts(query, limit = 10, sortBy, order) {
   let url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${limit}`;

   if (sortBy) {
      url += `&sortBy=${sortBy}`;
   }
   if (order) {
      url += `&order=${order}`;
   }

   return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
         console.error("Error searching products:", error);
         throw error;
      });
}
