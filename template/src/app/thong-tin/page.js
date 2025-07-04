
//Trang chủ sẽ chạy trong file page.js ở thư mục app
//Tạo những trang cố định khác
//B1. Tạo thư mục giống với tên đường link truy cập
//Tạo file page.js chạy chính trong thư muc đó
//B2 Tạo link thì sử dụng Component Link trong thư viện next/link
//Trang lỗi có 3 loại trang
//Loại 1 - Trang không được tìm thấy 404 - Page not found
//Thư mục app/not-found.js
//Loại 2 - Lỗi trong component
//Trong thư mục component có tên file là: error.js
//Loại 3 - Lỗi layout
//Trong thư mục app có tên file là: error.js
//Nếu đã làm trang not-found thì không cần làm trang error.js trong thư mục app
//Gửi thông tin meta của từ trang thì sử dụng hàm generateMetadata
//Hàm generateMetadata không sử dụng ở phía client

import Breadcrumb from "../components/Breadcrumb";

export async function generateMetadata({params}){
    return {
        title : 'Fruitkha - Thông tin về website',
        description: 'Trang web bán thực phẩm'
    }
}

export default function About() {
    return (
        <>
            {/* breadcrumb-section */}
            <Breadcrumb a={'We sale fresh fruits'} b={'About Us'}/>
            {/* end breadcrumb section */}
            
            {/* featured section */}
            <div className="feature-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="featured-text">
                                <h2 className="pb-3">
                                    Why <span className="orange-text">Fruitkha</span>
                                </h2>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 mb-4 mb-md-5">
                                        <div className="list-box d-flex">
                                            <div className="list-icon">
                                                <i className="fas fa-shipping-fast" />
                                            </div>
                                            <div className="content">
                                                <h3>Home Delivery</h3>
                                                <p>
                                                    sit voluptatem accusantium dolore mque laudantium, totam
                                                    rem aperiam, eaque ipsa quae ab illo.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                                        <div className="list-box d-flex">
                                            <div className="list-icon">
                                                <i className="fas fa-money-bill-alt" />
                                            </div>
                                            <div className="content">
                                                <h3>Best Price</h3>
                                                <p>
                                                    sit voluptatem accusantium dolore mque laudantium, totam
                                                    rem aperiam, eaque ipsa quae ab illo.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                                        <div className="list-box d-flex">
                                            <div className="list-icon">
                                                <i className="fas fa-briefcase" />
                                            </div>
                                            <div className="content">
                                                <h3>Custom Box</h3>
                                                <p>
                                                    sit voluptatem accusantium dolore mque laudantium, totam
                                                    rem aperiam, eaque ipsa quae ab illo.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="list-box d-flex">
                                            <div className="list-icon">
                                                <i className="fas fa-sync-alt" />
                                            </div>
                                            <div className="content">
                                                <h3>Quick Refund</h3>
                                                <p>
                                                    sit voluptatem accusantium dolore mque laudantium, totam
                                                    rem aperiam, eaque ipsa quae ab illo.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end featured section */}
            {/* shop banner */}
            <section className="shop-banner">
                <div className="container">
                    <h3>
                        December sale is on! <br /> with big{" "}
                        <span className="orange-text">Discount...</span>
                    </h3>
                    <div className="sale-percent">
                        <span>
                            Sale! <br /> Upto
                        </span>
                        50% <span>off</span>
                    </div>
                    <a href="shop.html" className="cart-btn btn-lg">
                        Shop Now
                    </a>
                </div>
            </section>
            {/* end shop banner */}
            {/* team section */}
            <div className="mt-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="section-title">
                                <h3>
                                    Our <span className="orange-text">Team</span>
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
                                    fuga quas itaque eveniet beatae optio.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-team-item">
                                <div className="team-bg team-bg-1" />
                                <h4>
                                    Jimmy Doe <span>Farmer</span>
                                </h4>
                                <ul className="social-link-team">
                                    <li>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-instagram" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-team-item">
                                <div className="team-bg team-bg-2" />
                                <h4>
                                    Marry Doe <span>Farmer</span>
                                </h4>
                                <ul className="social-link-team">
                                    <li>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-instagram" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                            <div className="single-team-item">
                                <div className="team-bg team-bg-3" />
                                <h4>
                                    Simon Joe <span>Farmer</span>
                                </h4>
                                <ul className="social-link-team">
                                    <li>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-instagram" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end team section */}
            {/* testimonail-section */}
            <div className="testimonail-section mt-80 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 text-center">
                            <div className="testimonial-sliders">
                                <div className="single-testimonial-slider">
                                    <div className="client-avater">
                                        <img src="assets/img/avaters/avatar1.png" alt="" />
                                    </div>
                                    <div className="client-meta">
                                        <h3>
                                            Saira Hakim <span>Local shop owner</span>
                                        </h3>
                                        <p className="testimonial-body">
                                            " Sed ut perspiciatis unde omnis iste natus error veritatis et
                                            quasi architecto beatae vitae dict eaque ipsa quae ab illo
                                            inventore Sed ut perspiciatis unde omnis iste natus error sit
                                            voluptatem accusantium "
                                        </p>
                                        <div className="last-icon">
                                            <i className="fas fa-quote-right" />
                                        </div>
                                    </div>
                                </div>
                                <div className="single-testimonial-slider">
                                    <div className="client-avater">
                                        <img src="assets/img/avaters/avatar2.png" alt="" />
                                    </div>
                                    <div className="client-meta">
                                        <h3>
                                            David Niph <span>Local shop owner</span>
                                        </h3>
                                        <p className="testimonial-body">
                                            " Sed ut perspiciatis unde omnis iste natus error veritatis et
                                            quasi architecto beatae vitae dict eaque ipsa quae ab illo
                                            inventore Sed ut perspiciatis unde omnis iste natus error sit
                                            voluptatem accusantium "
                                        </p>
                                        <div className="last-icon">
                                            <i className="fas fa-quote-right" />
                                        </div>
                                    </div>
                                </div>
                                <div className="single-testimonial-slider">
                                    <div className="client-avater">
                                        <img src="assets/img/avaters/avatar3.png" alt="" />
                                    </div>
                                    <div className="client-meta">
                                        <h3>
                                            Jacob Sikim <span>Local shop owner</span>
                                        </h3>
                                        <p className="testimonial-body">
                                            " Sed ut perspiciatis unde omnis iste natus error veritatis et
                                            quasi architecto beatae vitae dict eaque ipsa quae ab illo
                                            inventore Sed ut perspiciatis unde omnis iste natus error sit
                                            voluptatem accusantium "
                                        </p>
                                        <div className="last-icon">
                                            <i className="fas fa-quote-right" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end testimonail-section */}
        </>
    )
}