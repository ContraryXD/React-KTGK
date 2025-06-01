import axios from "axios";

export async function getCategoryImage(slug) {
   try {
      const productRes = await axios.get(
         `https://dummyjson.com/products/category/${slug}?limit=1&skip=1&select=thumbnail`
      );
      return productRes.data; // Return the data directly
   } catch (error) {
      console.error(`Error fetching category ${slug}:`, error);
      throw error; // Re-throw the error to be caught by the caller
   }
}

export async function getAllCategories() {
   try {
      const categoriesRes = await axios.get("https://dummyjson.com/products/categories");
      return categoriesRes.data; // Return the data directly (array of category objects)
   } catch (error) {
      console.error("Error fetching all categories:", error);
      throw error; // Re-throw the error
   }
}
