"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ShopSidebar from "../ShopSidebar";
import Hero from "../../components/Hero";
import axios from "axios";

export function laySPDanhMuc({ category, limit = 9, skip = 0 }) {
  return axios
    .get(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`)
    .then((response) => ({
      products: response.data.products || [],
      total: response.data.total || 0,
      skip: response.data.skip || 0,
      limit: response.data.limit || 0,
    }))
    .catch((error) => {
      console.error(`Lỗi khi tải sản phẩm cho danh mục ${category}:`, error);
      return { products: [], total: 0, skip: 0, limit: 0 };
    });
}

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.cat;

  const [sanPham, setSanPham] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoSP, setTongSoSP] = useState(0);
  const [sapXepTheo, setSapXepTheo] = useState("default");
  const [khoangGia, setKhoangGia] = useState({ min: 0, max: 1000 });
  const soSPMoiTrang = 9;
  const layDuLieuSP = useCallback(async () => {
    setIsLoading(true);
    try {
      const boQua = (trangHienTai - 1) * soSPMoiTrang;

      const duLieu = await laySPDanhMuc({
        category: categorySlug,
        limit: soSPMoiTrang,
        skip: boQua,
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
      setSanPham([]);
      setTongSoSP(0);
    } finally {
      setIsLoading(false);
    }
  }, [trangHienTai, categorySlug, soSPMoiTrang]);

  useEffect(() => {
    layDuLieuSP();
  }, [layDuLieuSP]);

  useEffect(() => {
    setTrangHienTai(1);
  }, [categorySlug]);

  const formatGia = (gia) => {
    return `$${gia.toFixed(2)}`;
  };

  const formatTenDanhMuc = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
    setTrangHienTai(1);
  };

  const xuLyDoiGia = useCallback((khoangGiaMoi) => {
    setKhoangGia(khoangGiaMoi);
    setTrangHienTai(1);
  }, []);
  return (
    <>
      {/* Hero Section Begin */}
      <Hero type="shop" showCategories={false} showSearch={true} showPhone={true} />
      {/* Hero Section End */}

      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: "url(/img/breadcrumb.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>{formatTenDanhMuc(categorySlug)}</h2>
                <div className="breadcrumb__option">
                  <Link href="/">Trang chủ</Link>
                  <Link href="/shop">Cửa hàng</Link>
                  <span>{formatTenDanhMuc(categorySlug)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}

      {/* Product Section Begin */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-5">
              <ShopSidebar
                onCategoryChange={() => {}} // Categories handled by routing now
                onPriceChange={xuLyDoiGia}
                selectedCategory={categorySlug}
                priceRange={khoangGia}
                isCategory={true}
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
              </div>

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
                  {sanPham.length === 0 ? (
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <h4>Không tìm thấy sản phẩm nào trong danh mục này</h4>
                        <Link href="/shop" className="primary-btn">
                          Xem tất cả sản phẩm
                        </Link>
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
                                  </li>{" "}
                                  <li>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (window.addToCart) {
                                          window.addToCart(sp.id, 1);
                                        } else {
                                          alert(`Product "${sp.title}" would be added to cart!`);
                                        }
                                      }}
                                    >
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
                      </div>

                      {/* Pagination */}
                      {tongSoTrang > 1 && (
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
                      )}
                    </>
                  )}
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
