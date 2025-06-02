import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li>
                    <i className="fa fa-envelope"></i> hello@colorlib.com
                  </li>
                  <li>Free Shipping for all Order of $99</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                <div className="header__top__right__social">
                  <Link href="#">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa fa-twitter"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa fa-linkedin"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa fa-pinterest-p"></i>
                  </Link>
                </div>
                <div className="header__top__right__language">
                  <Image
                    src="/img/language.png"
                    alt=""
                    width={20}
                    height={12} // Assuming width and height
                  />
                  <div>English</div>
                  <span className="arrow_carrot-down"></span>
                  <ul>
                    <li>
                      <Link href="#">Spanis</Link>
                    </li>
                    <li>
                      <Link href="#">English</Link>
                    </li>
                  </ul>
                </div>{" "}
                <div className="header__top__right__auth">
                  <Link href="/login">
                    <i className="fa fa-user"></i> Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="header__logo">
              <Link href="/">
                <Image
                  src="/img/logo.png"
                  alt="Ogani Logo"
                  width={150}
                  height={50} // Assuming width and height
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="header__menu">
              <ul>
                <li className="active">
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/shop">Shop</Link>
                </li>
                <li>
                  <Link href="#">Pages</Link>
                  <ul className="header__menu__dropdown">
                    <li>
                      <Link href="/shop-details">Shop Details</Link>
                    </li>
                    <li>
                      <Link href="/shoping-cart">Shoping Cart</Link>
                    </li>
                    <li>
                      <Link href="/checkout">Check Out</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Blog Details</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__cart">
              <ul>
                <li>
                  <Link href="#">
                    <i className="fa fa-heart"></i> <span>1</span>
                  </Link>
                </li>{" "}
                <li>
                  <Link href="/cart">
                    <i className="fa fa-shopping-bag"></i> <span>3</span>
                  </Link>
                </li>
              </ul>
              <div className="header__cart__price">
                item: <span>$150.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
