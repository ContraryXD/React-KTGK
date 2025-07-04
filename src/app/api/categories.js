import axios from "axios";

export function getCategoryImage(slug) {
   return axios
      .get(`https://dummyjson.com/products/category/${slug}`, {
         params: { limit: 1, skip: 1, select: "thumbnail" }
      })
      .then((productRes) => productRes.data)
      .catch((error) => {
         console.error(`Error fetching category ${slug}:`, error);
         throw error;
      });
}

export function getAllCategories() {
   return axios
      .get("https://dummyjson.com/products/categories")
      .then((categoriesRes) => {
         return categoriesRes.data.map((category) => {
            if (typeof category === "string") {
               return {
                  name: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " "),
                  slug: category.toLowerCase().replace(/\s+/g, "-")
               };
            }
            return category;
         });
      })
      .catch((error) => {
         console.error("Error fetching all categories:", error);
         throw error;
      });
}
