import Link from "next/link";
import Image from "next/image";
import { Carousel } from "antd";

export default function HeroCarousel() {
  const heroItems = [
    {
      id: 1,
      category: "FRUIT FRESH",
      title: "Vegetable 100% Organic",
      subtitle: "Free Pickup and Delivery Available",
      image: "/img/hero/banner.jpg",
      link: "/shop",
    },
    {
      id: 2,
      category: "FRESH MEAT",
      title: "Premium Quality Meat",
      subtitle: "Farm Fresh Daily Delivery",
      image: "/img/hero/banner.jpg",
      link: "/shop",
    },
    {
      id: 3,
      category: "ORGANIC DAIRY",
      title: "Fresh Milk & Cheese",
      subtitle: "Direct from Local Farms",
      image: "/img/hero/banner.jpg",
    },
  ];

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
            </div>{" "}
            {/* Hero Carousel */}
            <Carousel autoplay dots={true} effect="fade" autoplaySpeed={5000} className="hero__carousel">
              {heroItems.map((item) => (
                <div key={item.id}>
                  <div className="hero__item set-bg" style={{ backgroundImage: `url('${item.image}')` }}>
                    <div className="hero__text">
                      <span>{item.category}</span>
                      <h2 dangerouslySetInnerHTML={{ __html: item.title.replace(" ", "<br />") }}></h2>
                      <p>{item.subtitle}</p>
                      <Link href={item.link} className="primary-btn">
                        SHOP NOW
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
