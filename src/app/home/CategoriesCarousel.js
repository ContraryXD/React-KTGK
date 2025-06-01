"use client";
import Link from "next/link";
import Image from "next/image";
import { Carousel, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAllCategories, getCategoryImage } from "../api/categories";

const CategoriesCarousel = () => {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);

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
};

export default CategoriesCarousel;
