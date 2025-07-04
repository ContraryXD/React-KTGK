"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllCategories } from "../api/categories";

const Hero = () => {
   const [tuKhoa, setTuKhoa] = useState("");
   const [categories, setCategories] = useState([]);
   const router = useRouter();

   useEffect(() => {
      getAllCategories()
         .then((data) => {
            setCategories(data);
         })
         .catch((error) => {
            console.error("Error fetching categories:", error);
         });
   }, []);

   const handleTimKiem = () => {
      if (tuKhoa.trim() !== "") {
         router.push(`/search/${tuKhoa}`);
      }
   };

   return (
      <section className="hero">
         <div className="container">
            <div className="row">
               <div className="col-lg-3">
                  <div className="hero__categories">
                     <div className="hero__categories__all">
                        <i className="fa fa-bars" />
                        <span>Tất cả danh mục</span>
                     </div>
                     <ul
                        style={{
                           maxHeight: "450px",
                           overflowY: "auto",
                           scrollbarWidth: "thin",
                           scrollbarColor: "#7fad39 #f8f9fa"
                        }}>
                        {categories.map((category) => (
                           <li key={category.slug}>
                              <Link href={`/shop/${category.slug}`}>{category.name}</Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
               <div className="col-lg-9">
                  <div className="hero__search">
                     <div className="hero__search__form">
                        <form action="#">
                           <div className="hero__search__categories">
                              Tất cả danh mục
                              <span className="arrow_carrot-down" />
                           </div>
                           <input
                              type="text"
                              placeholder="Bạn cần gì?"
                              value={tuKhoa}
                              onChange={(e) => setTuKhoa(e.target.value)}
                           />
                           <button type="button" onClick={handleTimKiem} className="site-btn">
                              TÌM KIẾM
                           </button>
                        </form>
                     </div>
                     <div className="hero__search__phone">
                        <div className="hero__search__phone__icon">
                           <i className="fa fa-phone" />
                        </div>
                        <div className="hero__search__phone__text">
                           <h5>+84 11.188.888</h5>
                           <span>hỗ trợ 24/7</span>
                        </div>
                     </div>
                  </div>
                  <div
                     className="hero__item set-bg"
                     style={{
                        backgroundImage: "url('/img/hero/banner.jpg')"
                     }}>
                     <div className="hero__text">
                        <span>TRÁI CÂY TƯƠI</span>
                        <h2>
                           Rau củ quả <br /> 100% Hữu cơ
                        </h2>
                        <p>Miễn phí giao hàng và nhận hàng</p>
                        <a href="#" className="primary-btn">
                           MUA NGAY
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Hero;
