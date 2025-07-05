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
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      if (isAdminLogin) {
        if (user.username === "admin" && user.password === "admin") {
          const adminData = {
            id: 0,
            username: "admin",
            firstName: "Admin",
            lastName: "User",
            isAdmin: true,
          };
          dispatch(dangnhap(adminData));
          localStorage.setItem("user", JSON.stringify(adminData));
          setBtnLogin(false);

          notification.success({
            message: "Đăng nhập Admin thành công",
            description: "Chào mừng Admin!",
            placement: "topRight",
          });

          route.push("/admin");
        } else {
          setBtnLogin(false);
          notification.error({
            message: "Đăng nhập Admin thất bại",
            description: "Tài khoản Admin không đúng!",
            placement: "topRight",
          });
        }
      } else {
        axios
          .post("https://dummyjson.com/user/login", {
            username: user.username,
            password: user.password,
            expiresInMins: 30,
          })
          .then((kQ) => {
            const userData = { ...kQ.data, isAdmin: false };
            dispatch(dangnhap(userData));
            localStorage.setItem("user", JSON.stringify(userData));
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
    }
  }, [btnLogin, status, route, dispatch, user, notification, isAdminLogin]);

  return (
    <div className="flex items-center justify-center bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-2 bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
        <div>
          <h3 className="text-center text-3xl font-extrabold text-gray-900 pb-6">Đăng nhập</h3>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => dangNhap(e)}>
          <div className="space-y-4">
            <input type="text" placeholder="username" name="username" onChange={(e) => layGiaTri(e)} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />

            <div className="relative pt-2">
              <input type={showPassword ? "text" : "password"} placeholder="password" name="password" onChange={(e) => layGiaTri(e)} className="appearance-none rounded-md relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
              </button>
            </div>

            <div className="flex items-center pb-3">
              <input type="checkbox" id="adminCheck" checked={isAdminLogin} onChange={(e) => setIsAdminLogin(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="adminCheck" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                Đăng nhập với quyền Admin
              </label>
            </div>
          </div>

          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
            Đăng nhập
          </button>

          <p className="mt-2 text-center text-sm text-gray-600">
            Bạn chưa có tài khoản?
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              Tạo tài khoản
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
