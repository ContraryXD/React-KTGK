"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const checkAdmin = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.isAdmin === true) {
          setIsAdmin(true);
        } else {
          router.push("/login");
        }
      } else if (user && user.isAdmin === true) {
        setIsAdmin(true);
      } else {
        router.push("/login");
      }
      setIsLoading(false);
    };

    checkAdmin();
  }, [user, router]);

  if (isLoading) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <div>Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <h2>Bạn không có quyền truy cập trang này</h2>
        <Link href="/login" style={{ color: "#7fad39" }}>
          Đăng nhập lại
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>Trang admin</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginTop: "30px" }}>
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
          <h3>Quản lý Người dùng</h3>
          <p>Xem, thêm, sửa, xóa người dùng trong hệ thống</p>
          <Link
            href="/admin/users"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#7fad39",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Quản lý Users
          </Link>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
          <h3>Quản lý Sản phẩm</h3>
          <p>Xem, thêm, sửa, xóa sản phẩm trong cửa hàng</p>
          <Link
            href="/admin/products"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#7fad39",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Quản lý Products
          </Link>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
          <h3>Quản lý Giỏ hàng</h3>
          <p>Xem thông tin giỏ hàng của khách hàng</p>
          <Link
            href="/admin/carts"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#7fad39",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Quản lý Carts
          </Link>
        </div>
      </div>
    </div>
  );
}
