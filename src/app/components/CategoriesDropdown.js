"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function CategoriesDropdown({ isOpen = false, showOnHomepage = false }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh mục:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const toggleDropdown = () => {
    if (!showOnHomepage) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const shouldShowDropdown = showOnHomepage || isDropdownOpen;

  return (
    <div className="hero__categories">
      <div className="hero__categories__all" onClick={toggleDropdown} style={{ cursor: showOnHomepage ? "default" : "pointer" }}>
        <i className="fa fa-bars"></i>
        <span>Tất cả danh mục</span>
      </div>
      <ul
        style={{
          display: shouldShowDropdown ? "block" : "none",
          maxHeight: showOnHomepage ? "450px" : "300px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#7fad39 #f8f9fa",
        }}
      >
        {isLoading ? (
          <li>
            <div className="text-center py-2">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Đang tải...</span>
              </div>
            </div>
          </li>
        ) : (
          categories.slice(0, 10).map((category) => (
            <li key={category.slug}>
              <Link href={`/shop/${category.slug}`}>{category.name}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
