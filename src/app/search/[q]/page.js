"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Hero from "../../components/Hero";
import { timKiemSanPham } from "../../api/search";

export default function KetQuaTimKiem() {
  const params = useParams();
  const tuKhoa = params.q || "";

  const [ketQua, setKetQua] = useState({
    products: [],
    total: 0,
    skip: 0,
    limit: 12,
  });
  const [dangTai, setDangTai] = useState(false);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [sapXepTheo, setSapXepTheo] = useState("");
  const soSPMoiTrang = 12;

  // Search function
  const thucHienTimKiem = useCallback(async (tuKhoaTimKiem, trang = 1, sapXep = "") => {
    if (!tuKhoaTimKiem.trim()) {
      setKetQua({ products: [], total: 0, skip: 0, limit: soSPMoiTrang });
      return;
    }

    try {
      setDangTai(true);
      console.log(`[Search Page] Searching for: "${tuKhoaTimKiem}", page: ${trang}`);

      const skip = (trang - 1) * soSPMoiTrang;
      const ketQuaAPI = await timKiemSanPham(tuKhoaTimKiem, {
        limit: soSPMoiTrang,
        skip: skip,
      });

      let sanPhamDaSapXep = [...ketQuaAPI.products];

      // Client-side sorting
      if (sapXep) {
        switch (sapXep) {
          case "title":
            sanPhamDaSapXep.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "title-desc":
            sanPhamDaSapXep.sort((a, b) => b.title.localeCompare(a.title));
            break;
          case "price":
            sanPhamDaSapXep.sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
            break;
          case "price-desc":
            sanPhamDaSapXep.sort((a, b) => parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
            break;
          case "rating":
            sanPhamDaSapXep.sort((a, b) => b.rating - a.rating);
            break;
          default:
            break;
        }
      }

      setKetQua({
        ...ketQuaAPI,
        products: sanPhamDaSapXep,
      });
    } catch (error) {
      console.error("[Search Page] Error searching:", error);
      setKetQua({ products: [], total: 0, skip: 0, limit: soSPMoiTrang });
    } finally {
      setDangTai(false);
    }
  }, []);

  // Effect to search when URL params change
  useEffect(() => {
    if (tuKhoa) {
      setTrangHienTai(1);
      thucHienTimKiem(tuKhoa, 1, sapXepTheo);
    }
  }, [tuKhoa, thucHienTimKiem, sapXepTheo]);

  // Handle new search from Hero component
  const xuLyTimKiemMoi = (tuKhoaMoi) => {
    // Instead of updating state, we'll navigate to the new search URL
    window.location.href = `/search/${encodeURIComponent(tuKhoaMoi)}`;
  };

  // Handle pagination
  const tongSoTrang = Math.ceil(ketQua.total / soSPMoiTrang);

  const xuLyDoiTrang = (trang) => {
    if (trang >= 1 && trang <= tongSoTrang) {
      setTrangHienTai(trang);
      thucHienTimKiem(tuKhoa, trang, sapXepTheo);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle sorting
  const xuLyDoiSapXep = (e) => {
    const sapXepMoi = e.target.value;
    setSapXepTheo(sapXepMoi);
    setTrangHienTai(1);
    thucHienTimKiem(tuKhoa, 1, sapXepMoi);
  };

  // Generate star rating
  const taoSao = (rating) => {
    const saoDay = Math.floor(rating);
    const saoNua = rating % 1 >= 0.5;
    const saoTrong = 5 - saoDay - (saoNua ? 1 : 0);

    return (
      <div className="product__item__rating">
        {[...Array(saoDay)].map((_, i) => (
          <i key={`full-${i}`} className="fa fa-star"></i>
        ))}
        {saoNua && <i className="fa fa-star-half-o"></i>}
        {[...Array(saoTrong)].map((_, i) => (
          <i key={`empty-${i}`} className="fa fa-star-o"></i>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Hero Section with Search */}
      <Hero type="normal" onSearch={xuLyTimKiemMoi} showCategories={true} showSearch={true} showPhone={true} />

      {/* Breadcrumb Section */}
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: "url(/img/breadcrumb.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Kết quả tìm kiếm</h2>
                <div className="breadcrumb__option">
                  <Link href="/">Trang chủ</Link>
                  <span>Tìm kiếm: "{tuKhoa}"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product__discount__item__text">
                <div className="section-title product__discount__title">
                  <h2>Kết quả tìm kiếm cho: "{tuKhoa}"</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary and Sorting */}
          <div className="row">
            <div className="col-lg-6">
              <div className="product__page__content">
                <div className="product__page__title">
                  <div className="section-title">
                    <h4>
                      {dangTai ? (
                        <>
                          <i className="fa fa-spinner fa-spin"></i> Đang tìm kiếm...
                        </>
                      ) : (
                        `${ketQua.total} sản phẩm được tìm thấy`
                      )}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product__page__filter">
                <p>Sắp xếp theo</p>
                <select value={sapXepTheo} onChange={xuLyDoiSapXep}>
                  <option value="">Mặc định</option>
                  <option value="title">Tên A-Z</option>
                  <option value="title-desc">Tên Z-A</option>
                  <option value="price">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Results */}
          {dangTai ? (
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Đang tải sản phẩm...</span>
                </div>
              </div>
            </div>
          ) : ketQua.products.length > 0 ? (
            <>
              <div className="row">
                {ketQua.products.map((sanPham) => (
                  <div key={sanPham.id} className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${sanPham.image})` }}>
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
                        {sanPham.discount && <div className="product__discount__percent">{sanPham.discount}</div>}
                      </div>
                      <div className="product__item__text">
                        <h6>
                          <Link href={`/shop/id/${sanPham.id}`}>{sanPham.title}</Link>
                        </h6>
                        {taoSao(sanPham.rating)}
                        <div className="product__discount__item__text">
                          {sanPham.originalPrice && <span className="original-price">{sanPham.originalPrice}</span>}
                          <h5>{sanPham.price}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {tongSoTrang > 1 && (
                <div className="product__pagination">
                  {trangHienTai > 1 && (
                    <a onClick={() => xuLyDoiTrang(trangHienTai - 1)}>
                      <i className="fa fa-long-arrow-left"></i>
                    </a>
                  )}
                  {[...Array(tongSoTrang)].map((_, index) => {
                    const trang = index + 1;
                    return (
                      <a key={trang} onClick={() => xuLyDoiTrang(trang)} className={trangHienTai === trang ? "active" : ""}>
                        {trang}
                      </a>
                    );
                  })}
                  {trangHienTai < tongSoTrang && (
                    <a onClick={() => xuLyDoiTrang(trangHienTai + 1)}>
                      <i className="fa fa-long-arrow-right"></i>
                    </a>
                  )}
                </div>
              )}
            </>
          ) : tuKhoa ? (
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="no-results">
                  <i className="fa fa-search" style={{ fontSize: "4rem", color: "#ddd", marginBottom: "20px" }}></i>
                  <h3>Không tìm thấy sản phẩm nào</h3>
                  <p>
                    Không có sản phẩm nào phù hợp với từ khóa "<strong>{tuKhoa}</strong>"
                  </p>
                  <p>Hãy thử:</p>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li>• Kiểm tra chính tả từ khóa</li>
                    <li>• Sử dụng từ khóa khác</li>
                    <li>• Sử dụng từ khóa chung hơn</li>
                  </ul>
                  <Link href="/shop" className="primary-btn" style={{ marginTop: "20px" }}>
                    Xem tất cả sản phẩm
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="no-results">
                  <i className="fa fa-search" style={{ fontSize: "4rem", color: "#ddd", marginBottom: "20px" }}></i>
                  <h3>Nhập từ khóa để tìm kiếm</h3>
                  <p>Sử dụng thanh tìm kiếm ở trên để tìm sản phẩm bạn cần</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
