import HeroCarousel from "./home/HeroCarousel";
import CategoriesCarousel from "./home/CategoriesCarousel";
import FeaturedProducts from "./home/FeaturedProducts";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* Page Preloder - Assuming this is handled by Next.js or can be omitted */}
      {/* <div id="preloder">
        <div className="loader"></div>
      </div> */}

      {/* Humberger Menu - Assuming this is part of the Header or a mobile-specific component not yet built */}

      <HeroCarousel />

      <CategoriesCarousel />

      {/* Featured Section Begin */}
      <FeaturedProducts />
      {/* Featured Section End */}

      {/* Banner Begin */}
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <Image src="/img/banner/banner-1.jpg" alt="Banner 1" width={570} height={270} /> {/* Adjust width and height as needed */}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <Image src="/img/banner/banner-2.jpg" alt="Banner 2" width={570} height={270} /> {/* Adjust width and height as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner End */}

      {/* Latest Product Section Begin - This section might need its own components for sliders */}
      <section className="latest-product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="latest-product__text">
                <h4>Latest Products</h4>
                {/* Placeholder for owl-carousel */}
                <div className="latest-product__slider">
                  <div className="latest-prdouct__slider__item">
                    <Link href="#" className="latest-product__item">
                      <div className="latest-product__item__pic">
                        <Image src="/img/latest-product/lp-1.jpg" alt="" width={110} height={110} />
                      </div>
                      <div className="latest-product__item__text">
                        <h6>Crab Pool Security</h6>
                        <span>$30.00</span>
                      </div>
                    </Link>
                    {/* Add more items */}
                  </div>
                  {/* Add more slider items if structure is known */}
                </div>
              </div>
            </div>
            {/* Repeat for Top Rated and Review Products */}
          </div>
        </div>
      </section>
      {/* Latest Product Section End */}

      {/* Blog Section Begin */}
      <section className="from-blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title from-blog__title">
                <h2>From The Blog</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <Image src="/img/blog/blog-1.jpg" alt="Blog 1" width={370} height={270} />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o"></i> May 4,2019
                    </li>
                    <li>
                      <i className="fa fa-comment-o"></i> 5
                    </li>
                  </ul>
                  <h5>
                    <Link href="#">Cooking tips make cooking simple</Link>
                  </h5>
                  <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat </p>
                </div>
              </div>
            </div>
            {/* Add other blog items */}
          </div>
        </div>
      </section>
      {/* Blog Section End */}
    </>
  );
}
