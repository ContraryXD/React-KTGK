"use client";
import Link from "next/link";
import Image from "next/image";
import { Carousel, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

const CategoriesCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products/categories");
        // Take first 8 categories and add default images
        const categoriesWithImages = response.data.slice(0, 8).map((category, index) => ({
          name: category.name || category,
          slug: category.slug || category.toLowerCase().replace(/\s+/g, "-"),
          img: `/img/categories/cat-${(index % 5) + 1}.jpg`, // Cycle through available images
        }));
        setCategories(categoriesWithImages);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to static categories
        setCategories([
          { name: "Fresh Fruit", slug: "fresh-fruit", img: "/img/categories/cat-1.jpg" },
          { name: "Dried Fruit", slug: "dried-fruit", img: "/img/categories/cat-2.jpg" },
          { name: "Vegetables", slug: "vegetables", img: "/img/categories/cat-3.jpg" },
          { name: "Drink Fruits", slug: "drink-fruits", img: "/img/categories/cat-4.jpg" },
          { name: "Fresh Meat", slug: "fresh-meat", img: "/img/categories/cat-5.jpg" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Carousel settings for responsive display
  const carouselSettings = {
    infinite: true,
    waitForAnimate: false,
    draggable: true,
    arrows: true,
    dots: false,
    infinite: true,
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
                      <div className="categories__item set-bg" style={{ backgroundImage: `url(${category.img})` }}>
                        <h5>
                          <Link href={`/shop?category=${category.slug}`}>{category.name}</Link>
                        </h5>
                      </div>
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default CategoriesCarousel;
