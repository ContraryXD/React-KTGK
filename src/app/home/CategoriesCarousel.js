"use client";
import Link from "next/link";
import Image from "next/image";
import { Carousel, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setCategories([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
}
