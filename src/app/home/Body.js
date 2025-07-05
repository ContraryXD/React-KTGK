"use client";
import Link from "next/link";
import Image from "next/image";
import { Carousel, ConfigProvider, App } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import { useDispatch } from "react-redux";
import { them } from "../../store/giohang";

export default function Body() {
  const { notification } = App.useApp();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("*");
  const dispatch = useDispatch();

  const addToCart = (productId, quantity = 1) => {
    const product = allProducts.find((p) => p.id === productId) || products.find((p) => p.id === productId);
    if (product) {
      const cartItem = {
        id: product.id,
        ten: product.title,
        gia: parseFloat(product.price.replace("$", "")),
        img: product.image,
        sl: quantity,
      };
      dispatch(them({ sanpham: cartItem }));
      notification.success({
        message: "Đã thêm vào giỏ hàng",
        description: `${product.title} đã được thêm vào giỏ hàng`,
        placement: "topRight",
      });
    }
  };
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((categoriesRes) => {
        const categoryObjects = categoriesRes.data;
        const promises = categoryObjects.map((categoryObj) => {
          return axios
            .get(`https://dummyjson.com/products/category/${categoryObj.slug}`, {
              params: { limit: 1, skip: 1, select: "thumbnail" },
            })
            .then((productRes) => {
              const product = productRes.data?.products?.[0];
              return {
                name: categoryObj.name,
                slug: categoryObj.slug,
                img: product?.thumbnail || "/img/Image-not-found.png",
              };
            })
            .catch(() => {
              return {
                name: categoryObj.name,
                slug: categoryObj.slug,
                img: "/img/Image-not-found.png",
              };
            });
        });
        return Promise.all(promises);
      })
      .then((categoryData) => {
        setCategories(categoryData);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh mục:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=50")
      .then((kQ) => {
        const formattedProducts = kQ.data.products.map((product) => ({
          id: product.id,
          title: product.title,
          price: `$${product.price.toFixed(2)}`,
          originalPrice: product.discountPercentage > 0 ? `$${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}` : null,
          discount: product.discountPercentage > 0 ? `-${Math.round(product.discountPercentage)}%` : null,
          image: product.thumbnail,
          category: product.category,
          rating: product.rating,
        }));
        setAllProducts(formattedProducts);
        setProducts(formattedProducts.slice(0, 8));
        setProductsLoading(false);
      })
      .catch((e) => {
        console.error("Lỗi khi tải tất cả sản phẩm:", e);
        setProductsLoading(false);
      });
  }, []);

  const handleCategoryFilter = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setProductsLoading(true);

    if (categorySlug === "*") {
      setProducts(allProducts);
      setProductsLoading(false);
    } else {
      axios
        .get(`https://dummyjson.com/products/category/${categorySlug}?limit=8`)
        .then((kQ) => {
          const categoryProducts = kQ.data.products.map((product) => ({
            id: product.id,
            title: product.title,
            price: `$${product.price.toFixed(2)}`,
            originalPrice: product.discountPercentage > 0 ? `$${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}` : null,
            discount: product.discountPercentage > 0 ? `-${Math.round(product.discountPercentage)}%` : null,
            image: product.thumbnail,
            category: product.category,
            rating: product.rating,
          }));
          setProducts(categoryProducts);
          setProductsLoading(false);
        })
        .catch((e) => {
          console.error("Lỗi khi tải sản phẩm theo danh mục:", e);
          setProductsLoading(false);
        });
    }
  };

  const heroItems = [
    {
      id: 1,
      category: "FRUIT FRESH",
      title: "Vegetable 100% Organic",
      subtitle: "Free Pickup and Delivery Available",
      image: "/img/hero/banner.jpg",
      link: "/shop",
    },
    {
      id: 2,
      category: "FRESH MEAT",
      title: "Premium Quality Meat",
      subtitle: "Farm Fresh Daily Delivery",
      image: "/img/hero/banner.jpg",
      link: "/shop",
    },
    {
      id: 3,
      category: "ORGANIC DAIRY",
      title: "Fresh Milk & Cheese",
      subtitle: "Direct from Local Farms",
      image: "/img/hero/banner.jpg",
      link: "/shop",
    },
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
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const themeConfig = {
    components: {
      Carousel: {
        arrowSize: 12,
        arrowOffset: -40,
      },
    },
  };
  return (
    <>
      <Hero type="home" showCategories={true} showSearch={true} showPhone={true} categories={categories} heroItems={heroItems} />
      {/* Categories Carousel */}
      <ConfigProvider theme={themeConfig}>
        <section className="categories">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading categories...</span>
                    </div>
                  </div>
                ) : (
                  <Carousel {...carouselSettings} className="categories__slider">
                    {categories.map((category, index) => (
                      <div key={index}>
                        <div className="categories__item set-bg" style={{ backgroundImage: `url(${category.img})` }}>
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
                  <li className={selectedCategory === "*" ? "active" : ""} onClick={() => handleCategoryFilter("*")} style={{ cursor: "pointer" }}>
                    All
                  </li>
                  {categories.slice(0, 8).map((category) => (
                    <li key={category.slug} className={selectedCategory === category.slug ? "active" : ""} onClick={() => handleCategoryFilter(category.slug)} style={{ cursor: "pointer" }}>
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
                    <div className="featured__item__pic set-bg" style={{ backgroundImage: `url(${product.image})` }}>
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
                              addToCart(product.id, 1);
                            }}
                          >
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
                        {product.originalPrice && <span className="original-price">{product.originalPrice}</span>}
                        <h5>{product.price}</h5>
                        {product.discount && <div className="product__discount__percent">{product.discount}</div>}
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
                        <Link href={`/shop/id/${product.id}`} key={product.id} className="latest-product__item">
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
                        <Link href={`/shop/id/${product.id}`} key={product.id} className="latest-product__item">
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
                        <Link href={`/shop/id/${product.id}`} key={product.id} className="latest-product__item">
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
