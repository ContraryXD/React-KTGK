"use client";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Trang Quản Trị</h1>

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
