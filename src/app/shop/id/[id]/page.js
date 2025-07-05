"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { them } from "../../../../store/giohang";
import { App } from "antd";

export default function ProductDetail() {
  const { notification } = App.useApp();
  const { id: chitiet } = useParams();
  const [data, setData] = useState({ product: {}, isLoading: true });
  const [soLuong, setsoLuong] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${chitiet}`)
      .then((kQ) => {
        setData({ product: kQ.data, isLoading: false });
      })
      .catch((e) => console.error(e));
  }, [chitiet]);

  const themVaoGioHang = () => {
    if (data.product && data.product.id) {
      const cartItem = {
        id: data.product.id,
        ten: data.product.title,
        gia: data.product.price,
        img: data.product.thumbnail,
        sl: soLuong,
      };
      dispatch(them({ sanpham: cartItem }));
      notification.success({
        message: "Đã thêm vào giỏ hàng",
        description: `${data.product.title} đã được thêm vào giỏ hàng`,
        placement: "topRight",
      });
    }
  };

  if (data.isLoading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data.product || !data.product.id) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Không tìm thấy sản phẩm</h2>
        </div>
      </div>
    );
  }

  return (
    <section className="product-details spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
              <div className="product__details__pic__item">
                <img className="product__details__pic__item--large" src={data.product.thumbnail} alt={data.product.title} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <h3>{data.product.title}</h3>
              <div className="product__details__rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
                <span>({data.product.rating || 0} đánh giá)</span>
              </div>
              <div className="product__details__price">${data.product.price}</div>
              <p>{data.product.description}</p>
              <div className="product__details__soLuong">
                <div className="soLuong">
                  <div className="pro-qty">
                    <span className="dec qtybtn" onClick={() => setsoLuong(Math.max(1, soLuong - 1))}>
                      -
                    </span>
                    <input type="text" value={soLuong} readOnly />
                    <span className="inc qtybtn" onClick={() => setsoLuong(soLuong + 1)}>
                      +
                    </span>
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="primary-btn"
                onClick={(e) => {
                  e.preventDefault();
                  themVaoGioHang();
                }}
              >
                THÊM VÀO GIỎ HÀNG
              </a>
              <a href="#" className="heart-icon">
                <span className="icon_heart_alt"></span>
              </a>
              <ul>
                <li>
                  <b>Tình trạng</b> <span>Còn hàng</span>
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
        </div>
      </div>
    </section>
  );
}
