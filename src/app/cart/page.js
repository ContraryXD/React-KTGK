"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "../components/Hero";

export default function CartPage() {
   const [cartItems, setCartItems] = useState([]);
   const [couponCode, setCouponCode] = useState("");
   const [discount, setDiscount] = useState(0);
   const [loading, setLoading] = useState(true);

   // Fetch cart data from DummyJSON API
   const fetchCart = async () => {
      try {
         setLoading(true);
         const response = await fetch("https://dummyjson.com/carts/1");
         const cartData = await response.json();

         if (cartData && cartData.products) {
            setCartItems(
               cartData.products.map((product) => ({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  quantity: product.quantity,
                  image: product.thumbnail,
                  stock: 50, // Default stock since API doesn't provide this
                  total: product.total
               }))
            );
         }
      } catch (error) {
         console.error("Error fetching cart:", error);
         alert("Error loading cart data");
      } finally {
         setLoading(false);
      }
   };

   // Add product to cart
   const addToCart = async (productId, quantity = 1) => {
      try {
         const response = await fetch("https://dummyjson.com/carts/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               merge: true, // this will include existing products in the cart
               products: [
                  {
                     id: productId,
                     quantity: quantity
                  }
               ]
            })
         });

         const result = await response.json();
         if (response.ok) {
            alert("Sản phẩm đã được thêm vào giỏ hàng thành công!");
            fetchCart(); // Refresh cart data
         } else {
            throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
         }
      } catch (error) {
         console.error("Error adding to cart:", error);
         alert("Lỗi khi thêm sản phẩm vào giỏ hàng");
      }
   };

   // Update product quantity in cart
   const updateQuantity = async (id, newQuantity) => {
      if (newQuantity < 1) {
         removeItem(id);
         return;
      }

      try {
         const response = await fetch("https://dummyjson.com/carts/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               merge: true,
               products: [
                  {
                     id: id,
                     quantity: newQuantity
                  }
               ]
            })
         });
         if (response.ok) {
            fetchCart(); // Refresh cart data
            alert("Giỏ hàng đã được cập nhật thành công!");
         }
      } catch (error) {
         console.error("Error updating cart:", error);
         alert("Lỗi khi cập nhật giỏ hàng");
      }
   };

   // Remove item from cart (delete entire cart and re-add remaining items)
   const removeItem = async (id) => {
      try {
         // Get remaining items (exclude the one to remove)
         const remainingItems = cartItems.filter((item) => item.id !== id);

         // Delete the cart first
         await fetch("https://dummyjson.com/carts/1", {
            method: "DELETE"
         });

         // Re-add remaining items if any
         if (remainingItems.length > 0) {
            const products = remainingItems.map((item) => ({
               id: item.id,
               quantity: item.quantity
            }));

            await fetch("https://dummyjson.com/carts/1", {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  merge: false,
                  products: products
               })
            });
         }
         fetchCart(); // Refresh cart data
         alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
      } catch (error) {
         console.error("Error removing item:", error);
         alert("Lỗi khi xóa sản phẩm khỏi giỏ hàng");
      }
   };

   // Clear entire cart
   const clearCart = async () => {
      try {
         const response = await fetch("https://dummyjson.com/carts/1", {
            method: "DELETE"
         });
         if (response.ok) {
            setCartItems([]);
            alert("Giỏ hàng đã được xóa thành công!");
         }
      } catch (error) {
         console.error("Error clearing cart:", error);
         alert("Lỗi khi xóa giỏ hàng");
      }
   };
   const applyCoupon = (e) => {
      e.preventDefault();
      // Simple coupon logic - you can enhance this
      if (couponCode.toLowerCase() === "save10") {
         setDiscount(0.1); // 10% discount
         alert("Mã giảm giá đã được áp dụng! Giảm 10%");
      } else if (couponCode.toLowerCase() === "save20") {
         setDiscount(0.2); // 20% discount
         alert("Mã giảm giá đã được áp dụng! Giảm 20%");
      } else {
         setDiscount(0);
         alert("Mã giảm giá không hợp lệ");
      }
   };

   const calculateSubtotal = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
   };

   const calculateTotal = () => {
      const subtotal = calculateSubtotal();
      return subtotal - subtotal * discount;
   };
   const formatPrice = (price) => {
      return `$${price.toFixed(2)}`;
   };

   // Load cart data on component mount
   useEffect(() => {
      fetchCart();
   }, []);
   // Expose addToCart function globally for other components
   useEffect(() => {
      window.addToCart = addToCart;
      return () => {
         delete window.addToCart;
      };
   }, [addToCart]);

   if (loading) {
      return (
         <>
            <Hero type="shop" showCategories={false} showSearch={true} showPhone={true} />
            <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
               <h3>Loading cart...</h3>
            </div>
         </>
      );
   }

   return (
      <>
         {/* Hero Section */}
         <Hero type="shop" showCategories={false} showSearch={true} showPhone={true} />

         {/* Breadcrumb Section */}
         <section className="breadcrumb-section set-bg" style={{ backgroundImage: "url(/img/breadcrumb.jpg)" }}>
            <div className="container">
               <div className="row">
                  <div className="col-lg-12 text-center">
                     <div className="breadcrumb__text">
                        <h2>Shopping Cart</h2>
                        <div className="breadcrumb__option">
                           <Link href="/">Home</Link>
                           <span>Shopping Cart</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Shopping Cart Section */}
         <section className="shoping-cart spad">
            <div className="container">
               {cartItems.length === 0 ? (
                  <div className="row">
                     <div className="col-lg-12 text-center">
                        <div style={{ padding: "50px 0" }}>
                           <h3>Your cart is empty</h3>
                           <p>Add some products to your cart</p>
                           <Link href="/shop" className="primary-btn">
                              Continue Shopping
                           </Link>
                           <br />
                           <br />
                           {/* Test buttons for adding products */}
                           <div style={{ marginTop: "20px" }}>
                              <h5>Test Cart Functions:</h5>
                              <button className="primary-btn" style={{ margin: "5px" }} onClick={() => addToCart(1, 2)}>
                                 Add Product ID 1 (Qty: 2)
                              </button>
                              <button className="primary-btn" style={{ margin: "5px" }} onClick={() => addToCart(5, 1)}>
                                 Add Product ID 5 (Qty: 1)
                              </button>
                              <button
                                 className="primary-btn"
                                 style={{ margin: "5px" }}
                                 onClick={() => addToCart(10, 3)}>
                                 Add Product ID 10 (Qty: 3)
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <>
                     <div className="row">
                        <div className="col-lg-12">
                           <div className="shoping__cart__table">
                              <table>
                                 <thead>
                                    <tr>
                                       <th className="shoping__product">Products</th>
                                       <th>Price</th>
                                       <th>Quantity</th>
                                       <th>Total</th>
                                       <th></th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {cartItems.map((item) => (
                                       <tr key={item.id}>
                                          <td className="shoping__cart__item">
                                             <img src={item.image} alt={item.name} />
                                             <h5>{item.name}</h5>
                                          </td>
                                          <td className="shoping__cart__price">{formatPrice(item.price)}</td>
                                          <td className="shoping__cart__quantity">
                                             <div className="quantity">
                                                <div className="pro-qty">
                                                   <button
                                                      type="button"
                                                      className="qtybtn"
                                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                      -
                                                   </button>
                                                   <input
                                                      type="text"
                                                      value={item.quantity}
                                                      onChange={(e) => {
                                                         const value = parseInt(e.target.value) || 1;
                                                         updateQuantity(item.id, value);
                                                      }}
                                                   />
                                                   <button
                                                      type="button"
                                                      className="qtybtn"
                                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                      +
                                                   </button>
                                                </div>
                                             </div>
                                          </td>
                                          <td className="shoping__cart__total">
                                             {formatPrice(item.price * item.quantity)}
                                          </td>
                                          <td className="shoping__cart__item__close">
                                             <span
                                                className="icon_close"
                                                onClick={() => removeItem(item.id)}
                                                style={{ cursor: "pointer" }}></span>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-lg-12">
                           <div className="shoping__cart__btns">
                              <Link href="/shop" className="primary-btn cart-btn">
                                 CONTINUE SHOPPING
                              </Link>
                              <button
                                 type="button"
                                 className="primary-btn cart-btn cart-btn-right"
                                 onClick={() => fetchCart()}>
                                 <span className="icon_loading"></span>
                                 Refresh Cart
                              </button>
                              <button
                                 type="button"
                                 className="primary-btn cart-btn cart-btn-right"
                                 onClick={clearCart}
                                 style={{ marginLeft: "10px", backgroundColor: "#dc3545" }}>
                                 Clear Cart
                              </button>
                           </div>
                        </div>

                        <div className="col-lg-6">
                           <div className="shoping__continue">
                              <div className="shoping__discount">
                                 <h5>Discount Codes</h5>
                                 <form onSubmit={applyCoupon}>
                                    <input
                                       type="text"
                                       placeholder="Enter your coupon code"
                                       value={couponCode}
                                       onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button type="submit" className="site-btn">
                                       APPLY COUPON
                                    </button>
                                 </form>
                                 {discount > 0 && (
                                    <div style={{ marginTop: "10px", color: "green" }}>
                                       {(discount * 100).toFixed(0)}% discount applied!
                                    </div>
                                 )}
                                 <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
                                    <strong>Test coupon codes:</strong>
                                    <br />
                                    • SAVE10 - 10% discount
                                    <br />• SAVE20 - 20% discount
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="col-lg-6">
                           <div className="shoping__checkout">
                              <h5>Cart Total</h5>
                              <ul>
                                 <li>
                                    Subtotal <span>{formatPrice(calculateSubtotal())}</span>
                                 </li>
                                 {discount > 0 && (
                                    <li>
                                       Discount ({(discount * 100).toFixed(0)}%){" "}
                                       <span>-{formatPrice(calculateSubtotal() * discount)}</span>
                                    </li>
                                 )}
                                 <li>
                                    Total <span>{formatPrice(calculateTotal())}</span>
                                 </li>
                              </ul>
                              <Link href="/checkout" className="primary-btn">
                                 PROCEED TO CHECKOUT
                              </Link>
                           </div>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </section>
      </>
   );
}
