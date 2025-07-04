"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";

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

export default function ShopSidebar({ onCategoryChange, onPriceChange, selectedCategory, priceRange, isCategory = false }) {
  const [danhMuc, setDanhMuc] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [giaMin, setGiaMin] = useState(priceRange?.min || 0);
  const [giaMax, setGiaMax] = useState(priceRange?.max || 1000);
  const [isDragging, setIsDragging] = useState(false);

  const minGiaToiThieu = 0;
  const maxGiaToiDa = 2000;

  useEffect(() => {
    layDanhMuc();
  }, []);

  useEffect(() => {
    if (priceRange) {
      setGiaMin(priceRange.min);
      setGiaMax(priceRange.max);
    }
  }, [priceRange]);

  const layDanhMuc = async () => {
    try {
      const dlDanhMuc = await getAllCategories();
      setDanhMuc(dlDanhMuc);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
      setDanhMuc([]);
    } finally {
      setIsLoading(false);
    }
  };
  const xuLyClickDanhMuc = (slugDanhMuc) => {
    if (!isCategory && onCategoryChange) {
      onCategoryChange(slugDanhMuc === selectedCategory ? null : slugDanhMuc);
    }
  };
  const xuLyDoiGia = () => {
    onPriceChange({ min: giaMin, max: giaMax });
  };

  const datLaiKhoangGia = () => {
    setGiaMin(minGiaToiThieu);
    setGiaMax(maxGiaToiDa);
    onPriceChange({ min: minGiaToiThieu, max: maxGiaToiDa });
  };
  const xuLyDoiGiaMin = (value) => {
    const newMin = Math.min(value, giaMax - 10);
    setGiaMin(newMin);
  };

  const xuLyDoiGiaMax = (value) => {
    const newMax = Math.max(value, giaMin + 10);
    setGiaMax(newMax);
  };

  const xuLyBatDauKeo = () => {
    setIsDragging(true);
  };

  const xuLyKetThucKeo = () => {
    setIsDragging(false);
  };
  const formatTenDanhMuc = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="sidebar">
      {" "}
      {/* Department Section */}
      <div className="sidebar__item">
        <h4>Danh mục</h4>
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Đang tải...</span>
            </div>
          </div>
        ) : (
          <ul>
            <li>
              <Link href="/shop" className={!selectedCategory ? "active" : ""}>
                Tất cả sản phẩm
              </Link>
            </li>
            {danhMuc.map((dmuc) => (
              <li key={dmuc.slug}>
                <Link href={`/shop/${dmuc.slug}`} className={selectedCategory === dmuc.slug ? "active" : ""}>
                  {formatTenDanhMuc(dmuc.name)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>{" "}
      {/* Price Range Section */}
      <div className="sidebar__item">
        <h4>Lọc theo giá</h4>
        <div className="price-range-wrap">
          <div className="price-range">
            {/* Dual Range Slider */}
            <div className="price-slider-container">
              <div className="price-slider">
                <div className="slider-track"></div>
                <div
                  className="slider-range"
                  style={{
                    left: `${((giaMin - minGiaToiThieu) / (maxGiaToiDa - minGiaToiThieu)) * 100}%`,
                    width: `${((giaMax - giaMin) / (maxGiaToiDa - minGiaToiThieu)) * 100}%`,
                  }}
                ></div>{" "}
                <input type="range" className="slider-thumb slider-thumb-min" min={minGiaToiThieu} max={maxGiaToiDa} value={giaMin} onChange={(e) => xuLyDoiGiaMin(Number(e.target.value))} onMouseDown={xuLyBatDauKeo} onMouseUp={xuLyKetThucKeo} onTouchStart={xuLyBatDauKeo} onTouchEnd={xuLyKetThucKeo} />
                <input type="range" className="slider-thumb slider-thumb-max" min={minGiaToiThieu} max={maxGiaToiDa} value={giaMax} onChange={(e) => xuLyDoiGiaMax(Number(e.target.value))} onMouseDown={xuLyBatDauKeo} onMouseUp={xuLyKetThucKeo} onTouchStart={xuLyBatDauKeo} onTouchEnd={xuLyKetThucKeo} />
              </div>
            </div>

            {/* Price Display */}
            <div className="price-inputs">
              <div className="price-input-group">
                <label htmlFor="minamount">Giá tối thiểu:</label>
                <input type="number" id="minamount" value={giaMin} onChange={(e) => xuLyDoiGiaMin(Number(e.target.value))} min={minGiaToiThieu} max={maxGiaToiDa} />
              </div>
              <div className="price-input-group">
                <label htmlFor="maxamount">Giá tối đa:</label>
                <input type="number" id="maxamount" value={giaMax} onChange={(e) => xuLyDoiGiaMax(Number(e.target.value))} min={minGiaToiThieu} max={maxGiaToiDa} />
              </div>
            </div>

            <div className="price-range-controls">
              <button type="button" className="price-filter-btn" onClick={xuLyDoiGia}>
                Áp dụng lọc
              </button>
              <button type="button" className="price-reset-btn" onClick={datLaiKhoangGia}>
                Đặt lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
