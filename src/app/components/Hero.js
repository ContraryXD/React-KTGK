"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CategoriesDropdown from "./CategoriesDropdown";

export default function Hero() {
  const [tuKhoa, setTuKhoa] = useState("");
  const router = useRouter();

  const timKiem = () => {
    if (tuKhoa.trim() !== "") {
      router.push(`/search/${tuKhoa}`);
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <CategoriesDropdown showOnHomepage={true} />
          </div>
          <div className="col-lg-9">
            <div className="hero__search">
              <div className="hero__search__form">
                <form action="#">
                  <div className="hero__search__categories">
                    Tất cả danh mục
                    <span className="arrow_carrot-down" />
                  </div>
                  <input type="text" placeholder="Bạn cần gì?" value={tuKhoa} onChange={(e) => setTuKhoa(e.target.value)} />
                  <button type="button" onClick={timKiem} className="site-btn">
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
                backgroundImage: "url('/img/hero/banner.jpg')",
              }}
            >
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
}
