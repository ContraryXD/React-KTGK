"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=8");
        // Map API response to our product format
        const featuredProducts = response.data.products.map((product) => ({
          id: product.id,
          title: product.title,
          price: `$${product.price.toFixed(2)}`,
          originalPrice: product.discountPercentage > 0 ? `$${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}` : null,
          discount: product.discountPercentage > 0 ? `-${Math.round(product.discountPercentage)}%` : null,
          image: product.thumbnail,
          category: product.category,
          rating: product.rating,
        }));
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to static products
        setProducts([
          {
            id: 1,
            title: "Crab Pool Security",
            price: "$30.00",
            image: "/img/featured/feature-1.jpg",
            category: "Fastfood",
          },
          {
            id: 2,
            title: "Crab Pool Security",
            price: "$30.00",
            image: "/img/featured/feature-2.jpg",
            category: "Vegetables",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Featured Product</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading products...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Featured Product</h2>
            </div>
            <div className="featured__controls">
              <ul>
                <li className="active" data-filter="*">
                  All
                </li>
                <li data-filter=".oranges">Oranges</li>
                <li data-filter=".fresh-meat">Fresh Meat</li>
                <li data-filter=".vegetables">Vegetables</li>
                <li data-filter=".fastfood">Fastfood</li>
              </ul>
            </div>
          </div>
        </div>
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
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="featured__item__text">
                  <h6>
                    <Link href={`/shop/${product.id}`}>{product.title}</Link>
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
