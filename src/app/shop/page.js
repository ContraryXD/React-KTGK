"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ShopSidebar from "./ShopSidebar";
import Hero from "../components/Hero";
import axios from "axios";
import { App } from "antd";

export default function ShopPage() {
  const { notification } = App.useApp();
  const [sanPham, setSanPham] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoSP, setTongSoSP] = useState(0);
  const [sapXepTheo, setSapXepTheo] = useState("default");
  const [khoangGia, setKhoangGia] = useState({ min: 0, max: 1000 });
  const [viewMode, setViewMode] = useState("grid");
  const soSPMoiTrang = 9;

  const layDuLieuSP = () => {
    setIsLoading(true);
    const boQua = (trangHienTai - 1) * soSPMoiTrang;

    let sortBy, order;
    if (sapXepTheo === "price-low") {
      sortBy = "price";
      order = "asc";
    } else if (sapXepTheo === "price-high") {
      sortBy = "price";
      order = "desc";
    } else if (sapXepTheo === "name") {
      sortBy = "title";
      order = "asc";
    }

    let url = `https://dummyjson.com/products?limit=${soSPMoiTrang}&skip=${boQua}`;
    if (sortBy) {
      url += `&sortBy=${sortBy}`;
    }
    if (order) {
      url += `&order=${order}`;
    }

    axios
      .get(url)
      .then((response) => {
        const duLieu = {
          products: response.data.products || [],
          total: response.data.total || 0,
          skip: response.data.skip || 0,
          limit: response.data.limit || 0,
        };

        let dsSPDaFormat = duLieu.products.map((sanPham) => ({
          id: sanPham.id,
          title: sanPham.title,
          price: sanPham.price,
          image: sanPham.thumbnail,
          category: sanPham.category,
          discountPercentage: sanPham.discountPercentage,
        }));

        dsSPDaFormat = dsSPDaFormat.filter((sp) => sp.price >= khoangGia.min && sp.price <= khoangGia.max);

        setSanPham(dsSPDaFormat);
        setTongSoSP(duLieu.total);
      })
      .catch((error) => {
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    layDuLieuSP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trangHienTai, sapXepTheo, khoangGia]);

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

  const xuLyDoiGia = (khoangGiaMoi) => {
    setKhoangGia(khoangGiaMoi);
    setTrangHienTai(1); // Reset về trang đầu khi lọc
  };
  return (
    <>
      {/* Hero Section with Search */}
      <Hero type="normal" showCategories={false} showSearch={true} showPhone={true} />
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
                      <span className="px-2">Sắp xếp theo</span>
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
                  </div>{" "}
                  <div className="col-lg-4 col-md-3">
                    <div className="filter__option">
                      <span
                        className={`icon_grid-2x2 ${viewMode === "grid" ? "active" : ""}`}
                        style={{
                          cursor: "pointer",
                          marginRight: "10px",
                          color: viewMode === "grid" ? "#7fad39" : "#b2b2b2",
                        }}
                        onClick={() => setViewMode("grid")}
                        title="Grid View"
                      ></span>
                      <span
                        className={`icon_ul ${viewMode === "list" ? "active" : ""}`}
                        style={{
                          cursor: "pointer",
                          color: viewMode === "list" ? "#7fad39" : "#b2b2b2",
                        }}
                        onClick={() => setViewMode("list")}
                        title="List View"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Products Grid */}
              {isLoading ? (
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Đang tải sản phẩm...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Grid View */}
                  {viewMode === "grid" && (
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
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (window.addToCart) {
                                        window.addToCart(sp.id, 1);
                                      } else {
                                        notification.info({
                                          message: "Chức năng chưa sẵn sàng",
                                          description: `Sản phẩm "${sp.title}" sẽ được thêm vào giỏ hàng!`,
                                          placement: "topRight",
                                        });
                                      }
                                    }}
                                  >
                                    <i className="fa fa-shopping-cart"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="product__item__text">
                              <h6>
                                <Link href={`/shop/id/${sp.id}`}>{sp.title}</Link>
                              </h6>
                              <h5>{formatGia(sp.price)}</h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}{" "}
                  {/* List View */}
                  {viewMode === "list" && (
                    <div className="row">
                      {sanPham.map((sp) => (
                        <div key={sp.id} className="col-12 mb-4">
                          <div
                            className="product__item__list d-flex align-items-center justify-content-between"
                            style={{
                              border: "1px solid #ebebeb",
                              padding: "25px",
                              backgroundColor: "#fff",
                            }}
                          >
                            {/* Product Info */}
                            <div className="product__item__text__list flex-grow-1">
                              <h4 style={{ marginBottom: "15px" }}>
                                <Link
                                  href={`/shop/id/${sp.id}`}
                                  style={{
                                    color: "#1c1c1c",
                                    textDecoration: "none",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {sp.title}
                                </Link>
                              </h4>
                              <div className="product__price__list" style={{ marginBottom: "15px" }}>
                                <h3
                                  style={{
                                    color: "#7fad39",
                                    fontSize: "26px",
                                    fontWeight: "700",
                                    margin: "0",
                                  }}
                                >
                                  {formatGia(sp.price)}
                                </h3>
                              </div>
                              <div className="product__category__list" style={{ marginBottom: "15px" }}>
                                <span
                                  style={{
                                    color: "#b2b2b2",
                                    fontSize: "14px",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Danh mục: {sp.category}
                                </span>
                              </div>
                              {sp.discountPercentage > 0 && (
                                <div className="product__discount__list" style={{ marginBottom: "15px" }}>
                                  <span
                                    style={{
                                      backgroundColor: "#ff6b6b",
                                      color: "#fff",
                                      padding: "4px 8px",
                                      borderRadius: "4px",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Giảm {sp.discountPercentage.toFixed(1)}%
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Actions Section */}
                            <div className="product__actions__list d-flex align-items-center gap-3">
                              <div className="product__action__buttons d-flex gap-2" style={{ marginRight: "20px" }}>
                                <a
                                  href="#"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    backgroundColor: "#7fad39",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    textDecoration: "none",
                                  }}
                                >
                                  <i className="fa fa-heart"></i>
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    backgroundColor: "#7fad39",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    textDecoration: "none",
                                  }}
                                >
                                  <i className="fa fa-retweet"></i>
                                </a>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (window.addToCart) {
                                      window.addToCart(sp.id, 1);
                                    } else {
                                      notification.info({
                                        message: "Chức năng chưa sẵn sàng",
                                        description: `Sản phẩm "${sp.title}" sẽ được thêm vào giỏ hàng!`,
                                        placement: "topRight",
                                      });
                                    }
                                  }}
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    backgroundColor: "#7fad39",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    textDecoration: "none",
                                  }}
                                >
                                  <i className="fa fa-shopping-cart"></i>
                                </a>
                              </div>
                              <Link
                                href={`/shop/id/${sp.id}`}
                                style={{
                                  backgroundColor: "#7fad39",
                                  color: "#fff",
                                  padding: "12px 25px",
                                  borderRadius: "4px",
                                  textDecoration: "none",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  display: "inline-block",
                                }}
                              >
                                Xem chi tiết
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}{" "}
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
