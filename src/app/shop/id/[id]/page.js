"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getProductById, getProducts } from "../../../api/products";
import Hero from "../../../components/Hero";

export default function ChiTietSanPham({ params }) {
  // Unwrap the params Promise using React.use()
  const thamSo = React.use(params);
  const [sanPham, setSanPham] = useState(null);
  const [sanPhamLienQuan, setSanPhamLienQuan] = useState([]);
  const [dangTai, setDangTai] = useState(true);
  const [soLuong, setSoLuong] = useState(1);
  const [tabHienTai, setTabHienTai] = useState("description");
  const [isAddingToCart, setIsAddingToCart] = useState(false); // State for loading indicator
  const [addToCartMessage, setAddToCartMessage] = useState(null); // State for success/error message

  const layChiTietSanPham = useCallback(async () => {
    setDangTai(true);
    try {
      // Lấy chi tiết sản phẩm
      const chiTietSP = await getProductById(thamSo.id);
      setSanPham(chiTietSP);

      // Lấy sản phẩm liên quan (cùng danh mục)
      const dsLienQuan = await getProducts({
        limit: 4,
        category: chiTietSP.category,
      });

      // Lọc bỏ sản phẩm hiện tại khỏi danh sách liên quan
      const spLienQuanDaLoc = dsLienQuan.products.filter((sp) => sp.id !== parseInt(thamSo.id));
      setSanPhamLienQuan(spLienQuanDaLoc.slice(0, 4));
    } catch (error) {
      console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      setSanPham(null);
    } finally {
      setDangTai(false);
    }
  }, [thamSo.id]);

  useEffect(() => {
    layChiTietSanPham();
  }, [layChiTietSanPham]);

  const formatGia = (gia) => {
    return `$${gia.toFixed(2)}`;
  };

  const tinhGiaGiam = (giaGoc, phanTramGiam) => {
    const giaGiam = giaGoc - (giaGoc * phanTramGiam) / 100;
    return giaGiam;
  };

  const xuLyDoiSoLuong = (loai) => {
    if (loai === "tang") {
      setSoLuong(soLuong + 1);
    } else if (loai === "giam" && soLuong > 1) {
      setSoLuong(soLuong - 1);
    }
  };

  const renderNgoiSao = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fa fa-star-half-o"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa fa-star-o"></i>);
    }

    return stars;
  };
  const xuLyThemVaoGio = async () => {
    if (!sanPham) return;
    setIsAddingToCart(true);
    setAddToCartMessage(null);
    try {
      // Use the global addToCart function from the cart page
      if (window.addToCart) {
        await window.addToCart(sanPham.id, soLuong);
        alert(`Successfully added ${soLuong} of ${sanPham.title} to cart!`);
        setAddToCartMessage({ type: "success", text: `Successfully added ${soLuong} of ${sanPham.title} to cart!` });
      } else {
        // Fallback alert if cart page is not loaded
        alert(`Product "${sanPham.title}" (Qty: ${soLuong}) would be added to cart!`);
        setAddToCartMessage({ type: "success", text: `Product "${sanPham.title}" (Qty: ${soLuong}) would be added to cart!` });
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert(`Failed to add item to cart: ${error.message}`);
      setAddToCartMessage({ type: "error", text: `Failed to add item to cart: ${error.message}` });
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (dangTai) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center" style={{ padding: "100px 0" }}>
            <div className="spinner-border" role="status">
              <span className="sr-only">Đang tải...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sanPham) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center" style={{ padding: "100px 0" }}>
            <h2>Không tìm thấy sản phẩm</h2>
            <Link href="/shop" className="primary-btn">
              Quay lại cửa hàng
            </Link>
          </div>
        </div>
      </div>
    );
  }
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
                <h2>{sanPham.title}</h2>
                <div className="breadcrumb__option">
                  <Link href="/">Trang chủ</Link>
                  <Link href="/shop">Cửa hàng</Link>
                  <span>{sanPham.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}

      {/* Product Details Section Begin */}
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img className="product__details__pic__item--large" src={sanPham.thumbnail || "/img/Image-not-found.png"} alt={sanPham.title} />
                </div>
                {sanPham.images && sanPham.images.length > 1 && (
                  <div className="product__details__pic__slider owl-carousel">
                    {sanPham.images.slice(0, 4).map((hinh, index) => (
                      <img key={index} data-imgbigurl={hinh} src={hinh} alt={`${sanPham.title} ${index + 1}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{sanPham.title}</h3>
                <div className="product__details__rating">
                  {renderNgoiSao(sanPham.rating || 0)}
                  <span>({sanPham.reviews?.length || 0} đánh giá)</span>
                </div>
                <div className="product__details__price">
                  {sanPham.discountPercentage > 0 ? (
                    <>
                      <span className="text-muted text-decoration-line-through me-2">{formatGia(sanPham.price)}</span>
                      {formatGia(tinhGiaGiam(sanPham.price, sanPham.discountPercentage))}
                      <span className="badge bg-danger ms-2">-{sanPham.discountPercentage}%</span>
                    </>
                  ) : (
                    formatGia(sanPham.price)
                  )}
                </div>
                <p>{sanPham.description}</p>
                <div className="product__details__quantity">
                  <div className="quantity">
                    <div className="pro-qty">
                      <button type="button" className="qtybtn" onClick={() => xuLyDoiSoLuong("giam")}>
                        -
                      </button>
                      <input type="text" value={soLuong} readOnly />
                      <button type="button" className="qtybtn" onClick={() => xuLyDoiSoLuong("tang")}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={xuLyThemVaoGio} className="primary-btn" disabled={isAddingToCart || sanPham.stock === 0}>
                  {isAddingToCart ? "ĐANG THÊM..." : sanPham.stock === 0 ? "HẾT HÀNG" : "THÊM VÀO GIỎ"}
                </button>
                {addToCartMessage && <div style={{ marginTop: "10px", color: addToCartMessage.type === "success" ? "green" : "red" }}>{addToCartMessage.text}</div>}
                <a href="#" className="heart-icon">
                  <span className="icon_heart_alt"></span>
                </a>
                <ul>
                  <li>
                    <b>Tình trạng</b>
                    <span className={sanPham.stock > 0 ? "text-success" : "text-danger"}>{sanPham.stock > 0 ? `Còn ${sanPham.stock} sản phẩm` : "Hết hàng"}</span>
                  </li>
                  <li>
                    <b>Thương hiệu</b> <span>{sanPham.brand || "Không có"}</span>
                  </li>
                  <li>
                    <b>Danh mục</b> <span>{sanPham.category}</span>
                  </li>
                  <li>
                    <b>Vận chuyển</b> <span>Giao hàng nhanh.</span>
                  </li>
                  <li>
                    <b>Chia sẻ</b>
                    <div className="share">
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest"></i>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className={`nav-link ${tabHienTai === "description" ? "active" : ""}`} onClick={() => setTabHienTai("description")} role="tab">
                      Mô tả
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link ${tabHienTai === "information" ? "active" : ""}`} onClick={() => setTabHienTai("information")} role="tab">
                      Thông tin
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link ${tabHienTai === "reviews" ? "active" : ""}`} onClick={() => setTabHienTai("reviews")} role="tab">
                      Đánh giá <span>({sanPham.reviews?.length || 0})</span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  {tabHienTai === "description" && (
                    <div className="tab-pane active" role="tabpanel">
                      <div className="product__details__tab__desc">
                        <h6>Thông tin sản phẩm</h6>
                        <p>{sanPham.description}</p>
                        {sanPham.warrantyInformation && (
                          <p>
                            <strong>Bảo hành:</strong> {sanPham.warrantyInformation}
                          </p>
                        )}
                        {sanPham.shippingInformation && (
                          <p>
                            <strong>Vận chuyển:</strong> {sanPham.shippingInformation}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {tabHienTai === "information" && (
                    <div className="tab-pane active" role="tabpanel">
                      <div className="product__details__tab__desc">
                        <h6>Chi tiết kỹ thuật</h6>
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>
                                <strong>Thương hiệu</strong>
                              </td>
                              <td>{sanPham.brand || "Không có"}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Danh mục</strong>
                              </td>
                              <td>{sanPham.category}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>SKU</strong>
                              </td>
                              <td>{sanPham.sku || "Không có"}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Cân nặng</strong>
                              </td>
                              <td>{sanPham.weight ? `${sanPham.weight} kg` : "Không có"}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Kích thước</strong>
                              </td>
                              <td>{sanPham.dimensions ? `${sanPham.dimensions.width} x ${sanPham.dimensions.height} x ${sanPham.dimensions.depth} cm` : "Không có"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {tabHienTai === "reviews" && (
                    <div className="tab-pane active" role="tabpanel">
                      <div className="product__details__tab__desc">
                        <h6>Đánh giá khách hàng</h6>
                        {sanPham.reviews && sanPham.reviews.length > 0 ? (
                          sanPham.reviews.map((danhGia, index) => (
                            <div key={index} className="mb-3 p-3 border-bottom">
                              <div className="d-flex justify-content-between">
                                <strong>{danhGia.reviewerName}</strong>
                                <div>{renderNgoiSao(danhGia.rating)}</div>
                              </div>
                              <p className="mb-1">{danhGia.comment}</p>
                              <small className="text-muted">{new Date(danhGia.date).toLocaleDateString("vi-VN")}</small>
                            </div>
                          ))
                        ) : (
                          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Details Section End */}

      {/* Related Product Section Begin */}
      {sanPhamLienQuan.length > 0 && (
        <section className="related-product">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title related__product__title">
                  <h2>Sản phẩm liên quan</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {sanPhamLienQuan.map((sp) => (
                <div key={sp.id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="product__item">
                    <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${sp.thumbnail})` }}>
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
          </div>
        </section>
      )}
      {/* Related Product Section End */}
    </>
  );
}
