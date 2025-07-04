"use client";
import "../login.css";
import { dangnhap } from "../../store/login";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { App } from "antd";

export default function Login() {
  const { notification } = App.useApp();
  const [user, setUser] = useState({});
  const [btnLogin, setBtnLogin] = useState(false);
  const dispatch = useDispatch();
  const route = useRouter();
  const status = useSelector((state) => state.user.status);

  const layGiaTri = function (e) {
    let n = e.target.name;
    let v = e.target.value;
    setUser((o) => ({ ...o, [n]: v }));
  };

  const dangNhap = function (e) {
    e.preventDefault();
    setBtnLogin(true);
  };

  useEffect(() => {
    if (status === true) {
      route.push("/");
    }
    if (btnLogin === true) {
      axios
        .post("https://dummyjson.com/user/login", {
          username: user.username,
          password: user.password,
          expiresInMins: 30,
        })
        .then((kQ) => {
          dispatch(dangnhap(kQ.data));
          localStorage.setItem("user", JSON.stringify(kQ.data));
          setBtnLogin(false);

          notification.success({
            message: "Đăng nhập thành công",
            description: `Chào mừng ${kQ.data.firstName} ${kQ.data.lastName}!`,
            placement: "topRight",
          });

          route.push("/");
        })
        .catch((e) => {
          console.error(e);
          setBtnLogin(false);
          notification.error({
            message: "Đăng nhập thất bại",
            description: "Tài khoản hoặc mật khẩu không đúng!",
            placement: "topRight",
          });
        });
    }
  }, [btnLogin, status, route, dispatch, user, notification]);

  return (
    <div className="login-page">
      <div className="form">
        <h3 className="pb-10">Đăng nhập</h3>
        <form className="login-form" onSubmit={(e) => dangNhap(e)}>
          <input type="text" placeholder="username" name="username" onChange={(e) => layGiaTri(e)} />
          <input type="password" placeholder="password" name="password" onChange={(e) => layGiaTri(e)} />
          <button type="submit">Đăng nhập</button>
          <p className="message">
            Bạn chưa có tài khoản? <a href="#">Tạo tài khoản</a>
          </p>
        </form>
      </div>
    </div>
  );
}
