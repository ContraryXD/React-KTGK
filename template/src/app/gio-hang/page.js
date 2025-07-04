'use client'
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import { xoa } from "@/store/giohang";

export default function GioHang() {
    const dispatch = useDispatch();
    const giohang = useSelector((state) => state.giohang.sanpham);
    
    const xoasp = function(e, id){
        e.preventDefault();
        let sp = giohang.find((i) => i.id == id);
        dispatch(xoa({sanpham: sp}));
    }
    
    return (
        <>
            <Breadcrumb a={'Fresh and Organic'} b={'Cart'} />
            <div className="cart-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <thead className="cart-table-head">
                                        <tr className="table-head-row">
                                            <th className="product-remove" />
                                            <th className="product-image">Product Image</th>
                                            <th className="product-name">Name</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-total">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {giohang.map((v) =>
                                            <tr key={v.id} className="table-body-row">
                                                <td className="product-remove">
                                                    <a href="#" onClick={(e) => xoasp(e, v.id)}>
                                                        <i className="far fa-window-close" />
                                                    </a>
                                                </td>
                                                <td className="product-image">
                                                    <img src={v.img} alt="" />
                                                </td>
                                                <td className="product-name">{v.ten}</td>
                                                <td className="product-price">${v.gia}</td>
                                                <td className="product-quantity">
                                                    <input type="number" placeholder={0} value={v.sl} onChange={() =>{}}/>
                                                </td>
                                                <td className="product-total">{v.gia * v.sl}</td>
                                            </tr>
                                        )}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="total-section">
                                <table className="total-table">
                                    <thead className="total-table-head">
                                        <tr className="table-total-row">
                                            <th>Total</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="total-data">
                                            <td>
                                                <strong>Subtotal: </strong>
                                            </td>
                                            <td>$500</td>
                                        </tr>
                                        <tr className="total-data">
                                            <td>
                                                <strong>Shipping: </strong>
                                            </td>
                                            <td>$45</td>
                                        </tr>
                                        <tr className="total-data">
                                            <td>
                                                <strong>Total: </strong>
                                            </td>
                                            <td>$545</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">
                                    <a href="cart.html" className="boxed-btn">
                                        Update Cart
                                    </a>
                                    <a href="checkout.html" className="boxed-btn black">
                                        Check Out
                                    </a>
                                </div>
                            </div>
                            <div className="coupon-section">
                                <h3>Apply Coupon</h3>
                                <div className="coupon-form-wrap">
                                    <form action="index.html">
                                        <p>
                                            <input type="text" placeholder="Coupon" />
                                        </p>
                                        <p>
                                            <input type="submit" defaultValue="Apply" />
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}