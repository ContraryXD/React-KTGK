// filepath: d:\Data\Projects\React\ktgk\src\app\components\Banner.js
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "antd";

const Banner = () => {
  // Banner carousel items
  const bannerItems = [
    {
      id: 1,
      image: "/img/banner/banner-1.jpg",
      title: "Special Offer",
      subtitle: "Fresh Organic Vegetables",
      discount: "20% OFF",
      link: "/shop",
    },
    {
      id: 2,
      image: "/img/banner/banner-2.jpg",
      title: "Limited Time",
      subtitle: "Premium Fruits Collection",
      discount: "30% OFF",
      link: "/shop",
    },
  ];

  return (
    <section className="banner spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-4">
            <div className="banner__item">
              <Carousel autoplay dots={true} effect="slide" autoplaySpeed={4000} className="banner__carousel">
                {bannerItems.map((item) => (
                  <div key={item.id}>
                    <div className="banner__item__pic">
                      <Image src={item.image} alt={item.title} width={500} height={300} className="img-fluid" />
                    </div>
                    <div className="banner__item__text">
                      <h2>{item.title}</h2>
                      <p>{item.subtitle}</p>
                      <div className="banner__discount">
                        <span>{item.discount}</span>
                      </div>
                      <Link href={item.link} className="primary-btn">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
