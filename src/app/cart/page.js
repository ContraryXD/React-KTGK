"use client";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import { xoa, capnhat } from "../../store/giohang";
import Link from "next/link";
import { App } from "antd";

export default function GioHang() {
  const { notification } = App.useApp();
  const dispatch = useDispatch();
  const giohang = useSelector((state) => state.giohang.sanpham);

  const xoasp = function (e, id) {
    e.preventDefault();
    let sp = giohang.find((i) => i.id == id);
    dispatch(xoa({ sanpham: sp }));
    notification.success({
      message: "Đã xóa sản phẩm",
      description: `${sp.ten} đã được xóa khỏi giỏ hàng`,
      placement: "topRight",
    });
  };

  const capnhatsl = function (e, id) {
    let sl = parseInt(e.target.value);
    if (sl > 0) {
      let sp = giohang.find((i) => i.id == id);
      dispatch(capnhat({ sanpham: { ...sp, sl: sl } }));
      notification.info({
        message: "Đã cập nhật số lượng",
        description: `Số lượng ${sp.ten} đã được cập nhật`,
        placement: "topRight",
      });
    }
  };

  const tongTien = giohang.reduce((tong, sp) => tong + sp.gia * sp.sl, 0);

  return (
    <>
      <Breadcrumb a={"Shopping Cart"} b={"Cart"} />
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th className="shoping__product">Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {giohang.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <div style={{ padding: "50px 0" }}>
                            <h3>Your cart is empty</h3>
                            <p>Add some products to your cart</p>
                            <Link href="/shop" className="primary-btn">
                              Continue Shopping
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      giohang.map((v) => (
                        <tr key={v.id}>
                          <td className="shoping__cart__item">
                            <img src={v.img} alt="" />
                            <h5>{v.ten}</h5>
                          </td>
                          <td className="shoping__cart__price">${v.gia}</td>
                          <td className="shoping__cart__quantity">
                            <div className="quantity">
                              <div className="pro-qty">
                                <input type="number" value={v.sl} onChange={(e) => capnhatsl(e, v.id)} min="1" />
                              </div>
                            </div>
                          </td>
                          <td className="shoping__cart__total">${(v.gia * v.sl).toFixed(2)}</td>
                          <td className="shoping__cart__item__close">
                            <span className="icon_close" onClick={(e) => xoasp(e, v.id)} style={{ cursor: "pointer" }}></span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {giohang.length > 0 && (
            <div className="row">
              <div className="col-lg-12">
                <div className="shoping__cart__btns">
                  <Link href="/shop" className="primary-btn cart-btn">
                    CONTINUE SHOPPING
                  </Link>
                  <a href="#" className="primary-btn cart-btn cart-btn-right">
                    <span className="icon_loading"></span>
                    Update Cart
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="shoping__continue">
                  <div className="shoping__discount">
                    <h5>Discount Codes</h5>
                    <form action="#">
                      <input type="text" placeholder="Enter your coupon code" />
                      <button type="submit" className="site-btn">
                        APPLY COUPON
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="shoping__checkout">
                  <h5>Cart Total</h5>
                  <ul>
                    <li>
                      Subtotal <span>${tongTien.toFixed(2)}</span>
                    </li>
                    <li>
                      Total <span>${tongTien.toFixed(2)}</span>
                    </li>
                  </ul>
                  <a href="#" className="primary-btn">
                    PROCEED TO CHECKOUT
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
