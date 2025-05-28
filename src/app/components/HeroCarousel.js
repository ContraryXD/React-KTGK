import Link from "next/link";
import Image from "next/image";

const HeroCarousel = () => {
  // Placeholder for carousel logic
  return (
    <section className="hero">
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
                <li>
                  <Link href="#">Fruit & Nut Gifts</Link>
                </li>
                <li>
                  <Link href="#">Fresh Berries</Link>
                </li>
                <li>
                  <Link href="#">Ocean Foods</Link>
                </li>
                <li>
                  <Link href="#">Butter & Eggs</Link>
                </li>
                <li>
                  <Link href="#">Fastfood</Link>
                </li>
                <li>
                  <Link href="#">Fresh Onion</Link>
                </li>
                <li>
                  <Link href="#">Papayaya & Crisps</Link>
                </li>
                <li>
                  <Link href="#">Oatmeal</Link>
                </li>
                <li>
                  <Link href="#">Fresh Bananas</Link>
                </li>
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
            {/* Single Hero Item - Carousel functionality to be added later */}
            <div className="hero__item set-bg" style={{ backgroundImage: "url('/img/hero/banner.jpg')" }}>
              <div className="hero__text">
                <span>FRUIT FRESH</span>
                <h2>
                  Vegetable <br />
                  100% Organic
                </h2>
                <p>Free Pickup and Delivery Available</p>
                <Link href="/shop" className="primary-btn">
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
