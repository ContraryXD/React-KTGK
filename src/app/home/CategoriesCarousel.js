"use client";
import Link from "next/link";
import Image from "next/image";
import { Carousel, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

export function getCategoryImage(slug) {
  return axios
    .get(`https://dummyjson.com/products/category/${slug}`, {
      params: { limit: 1, skip: 1, select: "thumbnail" },
    })
    .then((productRes) => productRes.data)
    .catch((error) => {
      console.error(`Lỗi khi tải hình ảnh danh mục ${slug}:`, error);
      return { products: [] };
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
            slug: category.toLowerCase().replace(/\s+/g, "-"),
          };
        }
        return category;
      });
    })
    .catch((error) => {
      console.error("Lỗi khi tải tất cả danh mục:", error);
      return [];
    });
}

const CategoriesCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Correctly await getAllCategories and use its direct response
        const categoryObjects = await getAllCategories();
        if (!categoryObjects || !Array.isArray(categoryObjects)) {
          console.error("Lỗi: getAllCategories không trả về mảng hợp lệ.", categoryObjects);
          setCategories([{ name: "Lỗi tải", slug: "error", img: "/img/Image-not-found.png" }]);
          setIsLoading(false);
          return;
        }

        const categoryData = await Promise.all(
          categoryObjects.map(async (categoryObj) => {
            try {
              if (!categoryObj || typeof categoryObj.slug !== "string") {
                console.error("Đối tượng danh mục không hợp lệ:", categoryObj);
                return {
                  name: categoryObj?.name || "Danh mục không hợp lệ",
                  slug: categoryObj?.slug || "invalid-slug-or-object",
                  img: "/img/Image-not-found.png",
                };
              }
              const productData = await getCategoryImage(categoryObj.slug);
              const product = productData?.products?.[0];

              return {
                name: categoryObj.name,
                slug: categoryObj.slug,
                img: product?.thumbnail || "/img/Image-not-found.png",
              };
            } catch (productError) {
              console.error(`Lỗi khi tải sản phẩm cho danh mục '${categoryObj?.slug}':`, productError);
              return {
                name: categoryObj?.name || "Lỗi tải danh mục",
                slug: categoryObj?.slug || "unknown-slug",
                img: "/img/Image-not-found.png",
              };
            }
          })
        );

        setCategories(categoryData);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
        setCategories([{ name: "Không tìm thấy", slug: "", img: "/img/Image-not-found.png" }]);
      } finally {
        setIsLoading(false);
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
};

export default CategoriesCarousel;
