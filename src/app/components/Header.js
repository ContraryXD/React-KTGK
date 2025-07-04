"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { dangxuat } from "../../store/login";
import { App } from "antd";
import { useState, useEffect } from "react";

const Header = () => {
  const { notification } = App.useApp();
  const dispatch = useDispatch();
  const giohang = useSelector((state) => state.giohang.sanpham);
  const tongTien = useSelector((state) => state.giohang.tongtien);
  const user = useSelector((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogout = () => {
    dispatch(dangxuat());
    localStorage.removeItem("user");
    notification.success({
      message: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
      placement: "topRight",
    });
  };

  const cartCount = giohang.reduce((total, item) => total + item.sl, 0);
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
                  <Image src="/img/language.png" alt="" width={20} height={12} />
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
                  {!isHydrated ? (
                    <Link href="/login">
                      <i className="fa fa-user"></i> Login
                    </Link>
                  ) : user.status ? (
                    <div className="user-info">
                      <span>Hello, {user.user?.firstName || "User"}</span>
                      <button onClick={handleLogout} style={{ marginLeft: "10px", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                        <i className="fa fa-sign-out"></i> Logout
                      </button>
                    </div>
                  ) : (
                    <Link href="/login">
                      <i className="fa fa-user"></i> Login
                    </Link>
                  )}
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
                <Image src="/img/logo.png" alt="Ogani Logo" width={150} height={50} />
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
                {isHydrated && user.status && (
                  <li>
                    <Link href="/admin">Admin</Link>
                  </li>
                )}
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
                    <i className="fa fa-heart"></i> <span>0</span>
                  </Link>
                </li>{" "}
                <li>
                  <Link href="/cart">
                    <i className="fa fa-shopping-bag"></i> <span>{cartCount}</span>
                  </Link>
                </li>
              </ul>
              <div className="header__cart__price">
                item: <span>${tongTien.toFixed(2)}</span>
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
