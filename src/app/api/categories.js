import axios from "axios";

export async function getCategoryImage(slug) {
  try {
    const productRes = await axios.get(`https://dummyjson.com/products/category/${slug}?limit=1&skip=1&select=thumbnail`);
    return productRes.data; // Return the data directly
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function getAllCategories() {
  try {
    const categoriesRes = await axios.get("https://dummyjson.com/products/categories");
    // Transform raw category strings into objects with name and slug properties
    return categoriesRes.data.map((category) => {
      if (typeof category === "string") {
        return {
          name: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " "),
          slug: category.toLowerCase().replace(/\s+/g, "-"),
        };
      }
      // If it's not a string (perhaps already an object), return it as is or handle as needed
      // For now, let's assume if it's not a string, it might already be in the desired format or an error.
      // You might want to add more specific handling here if categories can be other types.
      return category;
    });
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error; // Re-throw the error
  }
}
