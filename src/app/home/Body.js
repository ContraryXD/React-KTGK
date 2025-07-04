"use client";
import Link from "next/link";
import Image from "next/image";
import { Carousel, ConfigProvider } from "antd";
import { getAllCategories, getCategoryImage } from "../api/categories";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";

export default function Body() {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);
   const [products, setProducts] = useState([]);
   const [productsLoading, setProductsLoading] = useState(true);
   const [allProducts, setAllProducts] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState("*");

   // Fetch categories from API
   useEffect(() => {
      const fetchCategories = async () => {
         try {
            // Correctly await getAllCategories and use its direct response
            const categoryObjects = await getAllCategories();

            if (!categoryObjects || !Array.isArray(categoryObjects)) {
               console.error("Error: getAllCategories did not return a valid array.", categoryObjects);
               setCategories([{ name: "Error Loading", slug: "error", img: "/img/Image-not-found.png" }]);
               setLoading(false);
               return;
            }

            const categoryData = await Promise.all(
               categoryObjects.map(async (categoryObj) => {
                  try {
                     if (!categoryObj || typeof categoryObj.slug !== "string") {
                        console.error("Invalid category object:", categoryObj);
                        return {
                           name: categoryObj?.name || "Invalid Category",
                           slug: categoryObj?.slug || "invalid-slug-or-object",
                           img: "/img/Image-not-found.png"
                        };
                     }

                     // Correctly await getOneCategories and use its direct response
                     const productData = await getCategoryImage(categoryObj.slug);
                     const product = productData?.products?.[0]; // Access products from the returned data

                     return {
                        name: categoryObj.name,
                        slug: categoryObj.slug,
                        img: product?.thumbnail || "/img/Image-not-found.png"
                     };
                  } catch (productError) {
                     console.error(`Error fetching product for category '${categoryObj?.slug}':`, productError);
                     return {
                        name: categoryObj?.name || "Category Fetch Error",
                        slug: categoryObj?.slug || "unknown-slug",
                        img: "/img/Image-not-found.png"
                     };
                  }
               })
            );

            setCategories(categoryData);
         } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([{ name: "Not found", slug: "", img: "/img/Image-not-found.png" }]);
         } finally {
            setLoading(false);
         }
      };
      fetchCategories();
   }, []);

   const handleCategoryFilter = async (categorySlug) => {
      setSelectedCategory(categorySlug);
      setProductsLoading(true);

      try {
         if (categorySlug === "*") {
            setProducts(allProducts);
         } else {
            // Fetch products for specific category
            const response = await axios.get(`https://dummyjson.com/products/category/${categorySlug}?limit=8`);
            const categoryProducts = response.data.products.map((product) => ({
               id: product.id,
               title: product.title,
               price: `$${product.price.toFixed(2)}`,
               originalPrice:
                  product.discountPercentage > 0
                     ? `$${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}`
                     : null,
               discount: product.discountPercentage > 0 ? `-${Math.round(product.discountPercentage)}%` : null,
               image: product.thumbnail,
               category: product.category,
               rating: product.rating
            }));
            setProducts(categoryProducts);
         }
      } catch (error) {
         console.error("Error fetching category products:", error); // Fallback to filtering from all products
         const filteredProducts = allProducts.filter((product) => {
            // Check if product.category exists and is a string before using toLowerCase
            if (product.category && typeof product.category === "string") {
               return (
                  product.category.toLowerCase().replace(/\s+/g, "-") === categorySlug ||
                  product.category.toLowerCase() === categorySlug
               );
            }
            return false;
         });
         setProducts(filteredProducts);
      } finally {
         setProductsLoading(false);
      }
   };

   const heroItems = [
      {
         id: 1,
         category: "FRUIT FRESH",
         title: "Vegetable 100% Organic",
         subtitle: "Free Pickup and Delivery Available",
         image: "/img/hero/banner.jpg",
         link: "/shop"
      },
      {
         id: 2,
         category: "FRESH MEAT",
         title: "Premium Quality Meat",
         subtitle: "Farm Fresh Daily Delivery",
         image: "/img/hero/banner.jpg",
         link: "/shop"
      },
      {
         id: 3,
         category: "ORGANIC DAIRY",
         title: "Fresh Milk & Cheese",
         subtitle: "Direct from Local Farms",
         image: "/img/hero/banner.jpg",
         link: "/shop"
      }
   ];

   const carouselSettings = {
      infinite: true,
      waitForAnimate: false,
      draggable: true,
      arrows: true,
      dots: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1
            }
         }
      ]
   };

   const themeConfig = {
      components: {
         Carousel: {
            arrowSize: 12,
            arrowOffset: -40
         }
      }
   };
   return (
      <>
         <Hero
            type="home"
            showCategories={true}
            showSearch={true}
            showPhone={true}
            categories={categories}
            heroItems={heroItems}
         />
         {/* Categories Carousel */}
         <ConfigProvider theme={themeConfig}>
            <section className="categories">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-12">
                        {loading ? (
                           <div className="text-center py-4">
                              <div className="spinner-border" role="status">
                                 <span className="sr-only">Loading categories...</span>
                              </div>
                           </div>
                        ) : (
                           <Carousel {...carouselSettings} className="categories__slider">
                              {categories.map((category, index) => (
                                 <div key={index}>
                                    <div
                                       className="categories__item set-bg"
                                       style={{ backgroundImage: `url(${category.img})` }}>
                                       <h5>
                                          <Link href={`/shop/${category.slug}`}>{category.name}</Link>
                                       </h5>
                                    </div>
                                 </div>
                              ))}
                           </Carousel>
                        )}
                     </div>
                  </div>{" "}
               </div>
            </section>
         </ConfigProvider>

         {/* Featured Products Section */}
         <section className="featured spad">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="section-title">
                        <h2>Featured Product</h2>
                     </div>{" "}
                     <div className="featured__controls">
                        <ul>
                           <li
                              className={selectedCategory === "*" ? "active" : ""}
                              onClick={() => handleCategoryFilter("*")}
                              style={{ cursor: "pointer" }}>
                              All
                           </li>
                           {categories.slice(0, 8).map((category) => (
                              <li
                                 key={category.slug}
                                 className={selectedCategory === category.slug ? "active" : ""}
                                 onClick={() => handleCategoryFilter(category.slug)}
                                 style={{ cursor: "pointer" }}>
                                 {category.name}
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
               {productsLoading ? (
                  <div className="row">
                     <div className="col-lg-12 text-center">
                        <div className="spinner-border" role="status">
                           <span className="sr-only">Loading products...</span>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="row featured__filter">
                     {products.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                           <div className="featured__item">
                              <div
                                 className="featured__item__pic set-bg"
                                 style={{ backgroundImage: `url(${product.image})` }}>
                                 <ul className="featured__item__pic__hover">
                                    <li>
                                       <a href="#">
                                          <i className="fa fa-heart"></i>
                                       </a>
                                    </li>
                                    <li>
                                       <a href="#">
                                          <i className="fa fa-retweet"></i>
                                       </a>
                                    </li>{" "}
                                    <li>
                                       <a
                                          href="#"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             if (window.addToCart) {
                                                window.addToCart(product.id, 1);
                                             } else {
                                                alert(`Sản phẩm "${product.title}" sẽ được thêm vào giỏ hàng!`);
                                             }
                                          }}>
                                          <i className="fa fa-shopping-cart"></i>
                                       </a>
                                    </li>
                                 </ul>
                              </div>
                              <div className="featured__item__text">
                                 <h6>
                                    <Link href={`/shop/id/${product.id}`}>{product.title}</Link>
                                 </h6>
                                 <div className="product__discount__item__text">
                                    {product.originalPrice && (
                                       <span className="original-price">{product.originalPrice}</span>
                                    )}
                                    <h5>{product.price}</h5>
                                    {product.discount && (
                                       <div className="product__discount__percent">{product.discount}</div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </section>

         {/* Latest Products Section */}
         <section className="latest-product spad">
            <div className="container">
               <div className="row">
                  <div className="col-lg-4 col-md-6">
                     <div className="latest-product__text">
                        <h4>Latest Products</h4>
                        <div className="latest-product__slider">
                           {productsLoading ? (
                              <div className="text-center py-4">
                                 <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                 </div>
                              </div>
                           ) : (
                              <div className="latest-prdouct__slider__item">
                                 {allProducts.slice(0, 3).map((product) => (
                                    <Link
                                       href={`/shop/${product.id}`}
                                       key={product.id}
                                       className="latest-product__item">
                                       <div className="latest-product__item__pic">
                                          <img src={product.image} alt={product.title} />
                                       </div>
                                       <div className="latest-product__item__text">
                                          <h6>{product.title}</h6>
                                          <span>{product.price}</span>
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <div className="latest-product__text">
                        <h4>Top Rated Products</h4>
                        <div className="latest-product__slider">
                           {productsLoading ? (
                              <div className="text-center py-4">
                                 <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                 </div>
                              </div>
                           ) : (
                              <div className="latest-prdouct__slider__item">
                                 {allProducts.slice(3, 6).map((product) => (
                                    <Link
                                       href={`/shop/${product.id}`}
                                       key={product.id}
                                       className="latest-product__item">
                                       <div className="latest-product__item__pic">
                                          <img src={product.image} alt={product.title} />
                                       </div>
                                       <div className="latest-product__item__text">
                                          <h6>{product.title}</h6>
                                          <span>{product.price}</span>
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <div className="latest-product__text">
                        <h4>Review Products</h4>
                        <div className="latest-product__slider">
                           {productsLoading ? (
                              <div className="text-center py-4">
                                 <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                 </div>
                              </div>
                           ) : (
                              <div className="latest-prdouct__slider__item">
                                 {allProducts.slice(5, 8).map((product) => (
                                    <Link
                                       href={`/shop/${product.id}`}
                                       key={product.id}
                                       className="latest-product__item">
                                       <div className="latest-product__item__pic">
                                          <img src={product.image} alt={product.title} />
                                       </div>
                                       <div className="latest-product__item__text">
                                          <h6>{product.title}</h6>
                                          <span>{product.price}</span>
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
