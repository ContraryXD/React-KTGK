"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Carousel } from "antd";
import { getAllCategories } from "../api/categories";
import { goiYTimKiem } from "../api/search";

const Hero = ({
  type = "normal", // 'normal', 'home', hoặc 'shop'
  showCategories = true,
  showSearch = true,
  showPhone = true,
  className = "",
  categories = [], // Categories từ parent component (cho home page)
  heroItems = [], // Hero carousel items (cho home page)
  onSearch,
}) => {
  const router = useRouter();
  // const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); // Removed
  const [danhMuc, setDanhMuc] = useState([]);
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");
  // const [danhMucDuocChon, setDanhMucDuocChon] = useState("All Categories"); // Removed
  const [goiY, setGoiY] = useState([]);
  const [hienThiGoiY, setHienThiGoiY] = useState(false);
  const [dangTai, setDangTai] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(type === "home" ? false : showCategories);
  // Fetch categories on mount (only if not provided via props)
  useEffect(() => {
    const layDanhMuc = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        setDanhMuc(fetchedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
        setDanhMuc([]); // Set empty array on error
      }
    };

    if (showCategories && (!categories || categories.length === 0)) {
      layDanhMuc();
    } else if (categories && categories.length > 0) {
      // Make sure categories are in the right format with name and slug properties
      const formattedCategories = categories.map((cat) => {
        // If category is already an object with name and slug, return as is
        if (cat && typeof cat === "object" && cat.name && cat.slug) {
          return cat;
        }
        // If it's a string, format it
        if (typeof cat === "string") {
          return {
            name: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " "),
            slug: cat.toLowerCase().replace(/\s+/g, "-"),
          };
        }
        return cat; // Return as is if we can't format it
      });
      setDanhMuc(formattedCategories);
    }
  }, [showCategories, categories]);

  // Handle search suggestions with debounce
  const layGoiYTimKiem = useCallback(async (tuKhoa) => {
    if (!tuKhoa || tuKhoa.length < 2) {
      setGoiY([]);
      setHienThiGoiY(false);
      return;
    }

    try {
      setDangTai(true);
      const suggestions = await goiYTimKiem(tuKhoa);
      setGoiY(suggestions);
      setHienThiGoiY(true);
    } catch (error) {
      console.error("Error getting search suggestions:", error);
      setGoiY([]);
    } finally {
      setDangTai(false);
    }
  }, []);
  // Debounced search suggestion handler
  useEffect(() => {
    const timer = setTimeout(() => {
      layGoiYTimKiem(tuKhoaTimKiem);
    }, 300);

    return () => clearTimeout(timer);
  }, [tuKhoaTimKiem, layGoiYTimKiem]); // Handle search form submission
  const xuLyTimKiem = (e) => {
    e.preventDefault();

    if (!tuKhoaTimKiem.trim()) return;

    // Hide suggestions
    setHienThiGoiY(false);

    // If onSearch prop is provided, use it, otherwise navigate to search page
    if (onSearch) {
      onSearch(tuKhoaTimKiem.trim());
    } else {
      window.location.href = `/search/${encodeURIComponent(tuKhoaTimKiem.trim())}`;
    }
  }; // Handle suggestion click
  const xuLyChonGoiY = (goiY) => {
    setTuKhoaTimKiem(goiY.text);
    setHienThiGoiY(false);

    if (goiY.type === "category") {
      window.location.href = `/shop/${goiY.slug}`;
    } else {
      window.location.href = `/search/${encodeURIComponent(goiY.text)}`;
    }
  };

  // Handle input change
  const xuLyDoiTuKhoa = (e) => {
    setTuKhoaTimKiem(e.target.value);
  };

  // Handle input focus
  const xuLyFocus = () => {
    if (goiY.length > 0) {
      setHienThiGoiY(true);
    }
  };
  // Handle input blur (delay to allow click on suggestions)
  const xuLyBlur = () => {
    setTimeout(() => {
      setHienThiGoiY(false);
    }, 200); // Delay to allow click on suggestion
  };
  // Removed xuLyChonDanhMuc function

  const heroClassName = `hero ${type === "home" ? "" : "hero-normal"} ${className}`.trim();

  return (
    <section className={heroClassName}>
      <div className="container">
        <div className="row">
          {/* Categories Sidebar */}
          {showCategories && (
            <div className="col-lg-3">
              <div className="hero__categories">
                <div
                  className="hero__categories__all"
                  onClick={() => {
                    if (type === "home") {
                      setIsCategoriesOpen((prev) => !prev);
                    }
                  }}
                  style={type === "home" ? { cursor: "pointer" } : {}}
                >
                  <i className="fa fa-bars"></i>
                  <span>Tất cả danh mục</span>
                </div>{" "}
                {isCategoriesOpen && (
                  <ul>
                    {danhMuc && danhMuc.length > 0 ? (
                      danhMuc.slice(0, 12).map((category) => (
                        <li key={category.slug}>
                          <Link href={`/shop/${category.slug}`}>{category.name}</Link>
                        </li>
                      ))
                    ) : (
                      <li>Loading categories...</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Search Section */}
          <div className={showCategories ? "col-lg-9" : "col-lg-12"}>
            {showSearch && (
              <div className="hero__search">
                {" "}
                <div className="hero__search__form">
                  <form onSubmit={xuLyTimKiem}>
                    {/* Removed category dropdown */}
                    <div className="search-input-container" style={{ position: "relative", flexGrow: 1 }}>
                      <input type="text" placeholder="Bạn cần gì?" value={tuKhoaTimKiem} onChange={xuLyDoiTuKhoa} onFocus={xuLyFocus} onBlur={xuLyBlur} autoComplete="off" />
                      {hienThiGoiY && (
                        <div className="search-suggestions">
                          {dangTai ? (
                            <div className="search-suggestion-item loading">
                              <i className="fa fa-spinner fa-spin"></i>
                              <span>Đang tìm kiếm...</span>
                            </div>
                          ) : goiY.length > 0 ? (
                            goiY.map((item, index) => (
                              <div
                                key={index}
                                className="search-suggestion-item"
                                onMouseDown={() => xuLyChonGoiY(item)} // Use onMouseDown
                              >
                                <i className={`fa ${item.type === "category" ? "fa-folder" : "fa-search"}`}></i>
                                <span>{item.text}</span>
                                <small className="suggestion-type">{item.type === "category" ? "Danh mục" : "Sản phẩm"}</small>
                              </div>
                            ))
                          ) : (
                            tuKhoaTimKiem.length >= 2 &&
                            !dangTai && (
                              <div className="search-suggestion-item no-results">
                                <i className="fa fa-info-circle"></i>
                                <span>Không tìm thấy gợi ý</span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="site-btn">
                      TÌM KIẾM
                    </button>
                  </form>
                </div>
                {showPhone && (
                  <div className="hero__search__phone">
                    <div className="hero__search__phone__icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="hero__search__phone__text">
                      <h5>+84 11.188.888</h5>
                      <span>hỗ trợ 24/7</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hero Carousel for Home Page */}
            {type === "home" && heroItems.length > 0 && (
              <Carousel autoplay dots={true} effect="fade" autoplaySpeed={5000} className="hero__carousel">
                {heroItems.map((item) => (
                  <div key={item.id}>
                    <div className="hero__item set-bg" style={{ backgroundImage: `url('${item.image}')` }}>
                      <div className="hero__text">
                        <span>{item.category}</span>
                        <h2 dangerouslySetInnerHTML={{ __html: item.title.replace(" ", "<br />") }}></h2>
                        <p>{item.subtitle}</p>
                        <Link href={item.link} className="primary-btn">
                          MUA NGAY
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
