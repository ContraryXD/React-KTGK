export async function addToCartAPI(productId, quantity) {
  try {
    const response = await fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1, // Hardcoded userId as per requirement
        products: [
          {
            id: productId,
            quantity: quantity,
          },
        ],
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to add item to cart");
    }
    return result;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}
