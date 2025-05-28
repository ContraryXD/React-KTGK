import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import Link from "next/link";
import Image from "next/image";

// Placeholder data - replace with actual data fetching or props
const products = Array(9).fill({
  name: "Crab Pool Security",
  price: "$30.00",
  img: "/img/product/product-1.jpg", // Placeholder, ideally unique images
});

const saleProducts = Array(6).fill({
  name: "Raisin'n'nuts",
  price: "$30.00",
  originalPrice: "$36.00",
  discount: "-20%",
  category: "Dried Fruit",
  img: "/img/product/discount/pd-1.jpg", // Placeholder
});

export default function ShopPage() {
  return (
    <>
      {/* <div id="preloder">
        <div className="loader"></div>
      </div> */}

      <Header />

      {/* Hero Section for Shop Page (normal variant) */}
      <section className="hero hero-normal">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                <div className="hero__categories__all">
                  <i className="fa fa-bars"></i>
                  <span>All departments</span>
                </div>
                <ul>
                  <li>
                    <Link href="#">Fresh Meat</Link>
                  </li>
                  <li>
                    <Link href="#">Vegetables</Link>
                  </li>
                  {/* Add other categories */}
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form action="#">
                    <div className="hero__search__categories">
                      All Categories
                      <span className="arrow_carrot-down"></span>
                    </div>
                    <input type="text" placeholder="What do yo u need?" />
                    <button type="submit" className="site-btn">
                      SEARCH
                    </button>
                  </form>
                </div>
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>+65 11.188.888</h5>
                    <span>support 24/7 time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumb pageTitle="Organi Shop" parentPage={{ title: "Home", href: "/" }} />

      {/* Product Section Begin */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              <div className="sidebar">
                <div className="sidebar__item">
                  <h4>Department</h4>
                  <ul>
                    <li>
                      <Link href="#">Fresh Meat</Link>
                    </li>
                    <li>
                      <Link href="#">Vegetables</Link>
                    </li>
                    {/* Add other departments */}
                  </ul>
                </div>
                <div className="sidebar__item">
                  <h4>Price</h4>
                  {/* Price range slider - requires JS, placeholder for now */}
                  <div className="price-range-wrap">
                    <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="10" data-max="540">
                      <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                      <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                      <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                    </div>
                    <div className="range-slider">
                      <div className="price-input">
                        <input type="text" id="minamount" />
                        <input type="text" id="maxamount" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add other sidebar items like Colors, Popular Size, Latest Products */}
              </div>
            </div>
            <div className="col-lg-9 col-md-7">
              <div className="product__discount">
                <div className="section-title product__discount__title">
                  <h2>Sale Off</h2>
                </div>
                <div className="row">
                  {/* Placeholder for owl-carousel */}
                  <div className="product__discount__slider">
                    {saleProducts.slice(0, 3).map(
                      (
                        product,
                        index // Displaying first 3 for example
                      ) => (
                        <div className="col-lg-4" key={`sale-${index}`}>
                          <div className="product__discount__item">
                            <div className="product__discount__item__pic set-bg" style={{ backgroundImage: `url(${product.img})` }}>
                              <div className="product__discount__percent">{product.discount}</div>
                              <ul className="product__item__pic__hover">
                                <li>
                                  <Link href="#">
                                    <i className="fa fa-heart"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="fa fa-retweet"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="fa fa-shopping-cart"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="product__discount__item__text">
                              <span>{product.category}</span>
                              <h5>
                                <Link href="#">{product.name}</Link>
                              </h5>
                              <div className="product__item__price">
                                {product.price} <span>{product.originalPrice}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <div className="filter__sort">
                      <span>Sort By</span>
                      <select>
                        <option value="0">Default</option>
                        <option value="0">Default</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="filter__found">
                      <h6>
                        <span>{products.length}</span> Products found
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
              <div className="row">
                {products.map((product, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                    <div className="product__item">
                      <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${product.img.replace("product-1", `product-${index + 1}`)})` }}>
                        {" "}
                        {/* Temporary image variation */}
                        <ul className="product__item__pic__hover">
                          <li>
                            <Link href="#">
                              <i className="fa fa-heart"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fa fa-retweet"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fa fa-shopping-cart"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>
                          <Link href="#">{product.name}</Link>
                        </h6>
                        <h5>{product.price}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="product__pagination">
                <Link href="#">1</Link>
                <Link href="#">2</Link>
                <Link href="#">3</Link>
                <Link href="#">
                  <i className="fa fa-long-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Section End */}

      <Footer />
    </>
  );
}
