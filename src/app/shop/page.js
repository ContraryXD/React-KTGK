"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ShopSidebar from "./ShopSidebar";
import { getProducts } from "../api/products";

export default function ShopPage() {
  const [sanPham, setSanPham] = useState([]);
  const [dangTai, setDangTai] = useState(true);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoSP, setTongSoSP] = useState(0);
  const [sapXepTheo, setSapXepTheo] = useState("default");
  const [khoangGia, setKhoangGia] = useState({ min: 0, max: 1000 });
  const soSPMoiTrang = 9;
  const layDuLieuSP = useCallback(async () => {
    setDangTai(true);
    try {
      const boQua = (trangHienTai - 1) * soSPMoiTrang;

      let thamSoSapXep = {};
      if (sapXepTheo === "price-low") {
        thamSoSapXep = { sortBy: "price", order: "asc" };
      } else if (sapXepTheo === "price-high") {
        thamSoSapXep = { sortBy: "price", order: "desc" };
      } else if (sapXepTheo === "name") {
        thamSoSapXep = { sortBy: "title", order: "asc" };
      }

      const duLieu = await getProducts({
        limit: soSPMoiTrang,
        skip: boQua,
        category: null, // No category filter on main shop page
        minPrice: khoangGia.min,
        maxPrice: khoangGia.max,
        ...thamSoSapXep,
      });

      const dsSPDaFormat = duLieu.products.map((sanPham) => ({
        id: sanPham.id,
        title: sanPham.title,
        price: sanPham.price,
        image: sanPham.thumbnail,
        category: sanPham.category,
        discountPercentage: sanPham.discountPercentage,
      }));

      setSanPham(dsSPDaFormat);
      setTongSoSP(duLieu.total);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      setSanPham([
        {
          id: 1,
          title: "Crab Pool Security",
          price: 30.0,
          image: "/img/product/product-1.jpg",
          category: "Seafood",
        },
      ]);
      setTongSoSP(30);
    } finally {
      setDangTai(false);
    }
  }, [trangHienTai, sapXepTheo, khoangGia, soSPMoiTrang]);
  useEffect(() => {
    layDuLieuSP();
  }, [layDuLieuSP]);

  const formatGia = (gia) => {
    return `$${gia.toFixed(2)}`;
  };

  const tongSoTrang = Math.ceil(tongSoSP / soSPMoiTrang);

  const xuLyDoiTrang = (trang) => {
    if (trang >= 1 && trang <= tongSoTrang) {
      setTrangHienTai(trang);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const xuLyDoiSapXep = (e) => {
    setSapXepTheo(e.target.value);
    setTrangHienTai(1); // Reset về trang đầu khi sắp xếp
  };

  const xuLyDoiGia = useCallback((khoangGiaMoi) => {
    setKhoangGia(khoangGiaMoi);
    setTrangHienTai(1); // Reset về trang đầu khi lọc
  }, []);

  return (
    <>
      {/* Hero Section Begin */}
      <section className="hero hero-normal">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form action="#">
                    {" "}
                    <div className="hero__search__categories">
                      Tất cả danh mục
                      <span className="arrow_carrot-down"></span>
                    </div>
                    <input type="text" placeholder="Bạn cần gì?" />
                    <button type="submit" className="site-btn">
                      TÌM KIẾM
                    </button>
                  </form>
                </div>
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>{" "}
                  <div className="hero__search__phone__text">
                    <h5>+65 11.188.888</h5>
                    <span>hỗ trợ 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: "url(/img/breadcrumb.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              {" "}
              <div className="breadcrumb__text">
                <h2>Cửa hàng Organi</h2>
                <div className="breadcrumb__option">
                  <Link href="/">Trang chủ</Link>
                  <span>Cửa hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */} {/* Product Section Begin */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            {" "}
            {/* Sidebar */}{" "}
            <div className="col-lg-3 col-md-5">
              <ShopSidebar
                onCategoryChange={() => {}} // Categories handled by routing now
                onPriceChange={xuLyDoiGia}
                selectedCategory={null} // Main shop page shows all products
                priceRange={khoangGia}
              />
            </div>
            {/* Main Product Area */}
            <div className="col-lg-9 col-md-7">
              {/* Filter Section */}
              <div className="filter__item">
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <div className="filter__sort">
                      <span>Sắp xếp theo</span>
                      <select value={sapXepTheo} onChange={xuLyDoiSapXep}>
                        <option value="default">Mặc định</option>
                        <option value="price-low">Giá: Thấp đến Cao</option>
                        <option value="price-high">Giá: Cao đến Thấp</option>
                        <option value="name">Tên: A đến Z</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="filter__found">
                      <h6>
                        <span>{tongSoSP}</span> Sản phẩm được tìm thấy
                      </h6>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3">
                    <div className="filter__option">
                      <span className="icon_grid-2x2"></span>
                      <span className="icon_ul"></span>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Products Grid */}
              {dangTai ? (
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Đang tải sản phẩm...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="row">
                    {sanPham.map((sp) => (
                      <div key={sp.id} className="col-lg-4 col-md-6 col-sm-6">
                        <div className="product__item">
                          <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${sp.image})` }}>
                            <ul className="product__item__pic__hover">
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
                          </div>{" "}
                          <div className="product__item__text">
                            <h6>
                              <Link href={`/shop/id/${sp.id}`}>{sp.title}</Link>
                            </h6>
                            <h5>{formatGia(sp.price)}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>{" "}
                  {/* Pagination */}
                  <div className="product__pagination">
                    {trangHienTai > 1 && (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          xuLyDoiTrang(trangHienTai - 1);
                        }}
                      >
                        <i className="fa fa-long-arrow-left"></i>
                      </a>
                    )}

                    {Array.from({ length: Math.min(5, tongSoTrang) }, (_, i) => {
                      let soTrang;
                      if (tongSoTrang <= 5) {
                        soTrang = i + 1;
                      } else if (trangHienTai <= 3) {
                        soTrang = i + 1;
                      } else if (trangHienTai >= tongSoTrang - 2) {
                        soTrang = tongSoTrang - 4 + i;
                      } else {
                        soTrang = trangHienTai - 2 + i;
                      }

                      return (
                        <a
                          key={soTrang}
                          href="#"
                          className={trangHienTai === soTrang ? "active" : ""}
                          onClick={(e) => {
                            e.preventDefault();
                            xuLyDoiTrang(soTrang);
                          }}
                        >
                          {soTrang}
                        </a>
                      );
                    })}

                    {trangHienTai < tongSoTrang && (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          xuLyDoiTrang(trangHienTai + 1);
                        }}
                      >
                        <i className="fa fa-long-arrow-right"></i>
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Product Section End */}
    </>
  );
}
