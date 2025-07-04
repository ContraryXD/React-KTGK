//Sử dụng thư viện axios
//B1 cài đặt thư viện
//B2 Tạo để nhận dữ liệu từ api gửi về
//B3 UseEffect để gọi api sử axio
//B4 kiểm tra dữ liệu đã tải xong chưa
//B5 hiển thị dữ liệu
"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
//Tạo link trong next js thì sử component Link



export default function Header() {

    const [search, setSearch] = useState(false);
    //https://dummyjson.com/products/categories

    function showSearch(e) {
        e.preventDefault();
        setSearch(!search);
    }

    //B2 Tạo biến chứa dữ liệu
    const [data, setData] = useState({categories: [], isLoading: true});
    //B3 
    useEffect(() => {
        //Toàn bộ kết quả trả về của axios đều nằm trong data
        axios.get('https://dummyjson.com/products/categories')
        .then(kQ => {setData({categories: kQ.data, isLoading: false})})
        .catch(e => console.error(e));
    },[]);

    if(!data.isLoading)
    return (
        <>
            <div className="top-header-area" id="sticker">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 text-center">
                            <div className="main-menu-wrap">
                                {/* logo */}
                                <div className="site-logo">
                                    <a href="index.html">
                                        <img src="assets/img/logo.png" alt="" />
                                    </a>
                                </div>
                                {/* logo */}
                                {/* menu start */}
                                <nav className="main-menu">
                                    <ul>
                                        <li className="current-list-item">
                                            <Link href={'/'}>Trang chủ</Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href={'/lien-he'}>Liên hệ</Link>
                                                </li>
                                                <li>
                                                    <Link href={'/thong-tin'}>Thông tin về website</Link>
                                                </li>
                                            </ul>

                                            
                                        </li>

                                        {/*B4 Hiển thị menu*/}
                                        {data.categories.map((v,i) => 
                                                ((i > 5) && (i < 10))? <li key={v.slug}><Link href={`/${v.slug}`}>{v.name}</Link></li> : ''
                                        )}


                                        <li>
                                            <div className="header-icons">
                                                <Link className="shopping-cart" href={'/gio-hang'}>
                                                    <i className="fas fa-shopping-cart" />
                                                </Link>
                                                <a className="mobile-hide search-bar-icon" href="#" onClick={(e) => showSearch(e)}>
                                                    <i className="fas fa-search" />
                                                </a>
                                                <Link href={'/dang-nhap'}>
                                                     <i className="fas fa-user" />
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                                <a className="mobile-show search-bar-icon" href="#">
                                    <i className="fas fa-search" />
                                </a>
                                <div className="mobile-menu" />
                                {/* menu end */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`search-area ${(search === true) ? 'search-active' : ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="close-btn" onClick={(e) => showSearch(e)}>
                                <i className="fas fa-window-close" />
                            </span>
                            <div className="search-bar">
                                <div className="search-bar-tablecell">
                                    <h3>Search For:</h3>
                                    <input type="text" placeholder="Keywords" />
                                    <button type="submit">
                                        Search <i className="fas fa-search" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}