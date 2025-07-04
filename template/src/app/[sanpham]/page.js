'use client'
import { useParams } from "next/navigation";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useState } from "react";

export default function SanPham() {

    //Dữ liệu trên đường link
    //B1 Lấy dữ liệu từ đường link - sử dụng use client
    const {sanpham} = useParams(); 
    //B2
    const [data, setData] = useState({products: [], isLoading: true});
    //B3
    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${sanpham}`)
        .then((kQ) => kQ.json())
        .then((kQ) => {setData({products: kQ.products, isLoading: false})});
    },[sanpham])

    //B4
    if(!data.isLoading)
    return (
        <>
            <Breadcrumb a={'Fresh and Organic'} b={'Shop'} />
            <div className="product-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="product-filters">
                                <ul>
                                    <li className="active" data-filter="*">
                                        All
                                    </li>
                                    <li data-filter=".strawberry">Strawberry</li>
                                    <li data-filter=".berry">Berry</li>
                                    <li data-filter=".lemon">Lemon</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row product-lists">
                        {/*B5*/}
                        {data.products.map((v) => 
                        <div key={v.id} className="col-lg-4 col-md-6 text-center">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href={`/${sanpham}/${v.id}`}>
                                        <img src={v.thumbnail} alt="" />
                                    </a>
                                </div>
                                <h3>{v.title}</h3>
                                <p className="product-price">
                                    ${v.price}
                                </p>
                                <a href="cart.html" className="cart-btn">
                                    <i className="fas fa-shopping-cart" /> Add to Cart
                                </a>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="pagination-wrap">
                                <ul>
                                    <li>
                                        <a href="#">Prev</a>
                                    </li>
                                    <li>
                                        <a href="#">1</a>
                                    </li>
                                    <li>
                                        <a className="active" href="#">
                                            2
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">3</a>
                                    </li>
                                    <li>
                                        <a href="#">Next</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}