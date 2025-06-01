import HeroCarousel from "./home/HeroCarousel";
import CategoriesCarousel from "./home/CategoriesCarousel";
import FeaturedProducts from "./home/FeaturedProducts";
import Link from "next/link";
import Image from "next/image";
import Body from "./home/Body";

export default function HomePage() {
   return (
      <>
         <Body />
         <div className="banner">
            <div className="container">
               <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                     <div className="banner__pic">
                        <Image src="/img/banner/banner-1.jpg" alt="Banner 1" width={570} height={270} />{" "}
                        {/* Adjust width and height as needed */}
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                     <div className="banner__pic">
                        <Image src="/img/banner/banner-2.jpg" alt="Banner 2" width={570} height={270} />{" "}
                        {/* Adjust width and height as needed */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Banner End */}

         {/* Blog Section Begin */}
         <section className="from-blog spad">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="section-title from-blog__title">
                        <h2>From The Blog</h2>
                     </div>
                  </div>
               </div>{" "}
               <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6">
                     <div className="blog__item">
                        <div className="blog__item__pic">
                           <Image src="/img/blog/blog-1.jpg" alt="Cooking tips" width={370} height={270} />
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
                           <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                     <div className="blog__item">
                        <div className="blog__item__pic">
                           <Image src="/img/blog/blog-2.jpg" alt="Breakfast preparation" width={370} height={270} />
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
                              <Link href="#">6 ways to prepare breakfast for 30</Link>
                           </h5>
                           <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                     <div className="blog__item">
                        <div className="blog__item__pic">
                           <Image src="/img/blog/blog-3.jpg" alt="Clean farm visit" width={370} height={270} />
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
                              <Link href="#">Visit the clean farm in the US</Link>
                           </h5>
                           <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* Blog Section End */}
      </>
   );
}
