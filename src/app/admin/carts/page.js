"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { xoa } from "../../../store/giohang";
import { App } from "antd";

export default function AdminCarts() {
  const { notification } = App.useApp();
  const [GioHangDaChon, setGioHangDaChon] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [Loading, setLoading] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const giohang = useSelector((state) => state.giohang);

  const cartData = {
    id: 1,
    userId: user?.id || "Guest",
    userName: user?.firstName + " " + user?.lastName || "Guest User",
    total: giohang.tongtien,
    totalProducts: giohang.sanpham.length,
    totalQuantity: giohang.sanpham.reduce((total, item) => total + item.sl, 0),
    products: giohang.sanpham,
  };

  const xemChiTiet = () => {
    setGioHangDaChon(cartData);
    setShowDetails(true);
  };

  const xoaSP = (productId) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      const productToDelete = giohang.sanpham.find((item) => item.id === productId);
      if (productToDelete) {
        dispatch(xoa({ sanpham: productToDelete }));
        notification.success({
          message: "Xóa sản phẩm thành công",
          description: "Sản phẩm đã được xóa khỏi giỏ hàng",
          placement: "topRight",
        });
        if (showDetails) {
          setGioHangDaChon({
            ...cartData,
            products: giohang.sanpham.filter((item) => item.id !== productId),
          });
        }
      }
    }
  };

  const clearGioHang = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      giohang.sanpham.forEach((item) => {
        dispatch(xoa({ sanpham: item }));
      });
      notification.success({
        message: "Đã xóa toàn bộ giỏ hàng",
        description: "Tất cả sản phẩm đã được xóa khỏi giỏ hàng",
        placement: "topRight",
      });
      setShowDetails(false);
    }
  };

  useEffect(() => {
    const checkAdminAccess = () => {
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
      setLoading(false);
    };

    checkAdminAccess();
  }, [user, router]);

  if (Loading) {
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
      <div style={{ marginBottom: "20px" }}>
        <Link href="/admin" style={{ color: "#7fad39", textDecoration: "none" }}>
          ← Quay lại Admin
        </Link>
      </div>

      <h1>Quản lý Giỏ hàng</h1>

      {showDetails && GioHangDaChon && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              width: "700px",
              maxWidth: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h3>Chi tiết giỏ hàng #{GioHangDaChon.id}</h3>
            <p>
              <strong>User:</strong> {GioHangDaChon.userName}
            </p>
            <p>
              <strong>Tổng tiền:</strong> ${GioHangDaChon.total.toFixed(2)}
            </p>
            <p>
              <strong>Tổng số sản phẩm:</strong> {GioHangDaChon.totalProducts}
            </p>
            <p>
              <strong>Tổng số lượng:</strong> {GioHangDaChon.totalQuantity}
            </p>

            <h4>Sản phẩm trong giỏ hàng:</h4>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", marginTop: "10px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Hình ảnh</th>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Sản phẩm</th>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Giá</th>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Số lượng</th>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Tổng</th>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {GioHangDaChon.products?.map((product, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        <img src={product.img} alt={product.ten} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.ten}</td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>${product.gia}</td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.sl}</td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>${(product.gia * product.sl).toFixed(2)}</td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        <button
                          onClick={() => xoaSP(product.id)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button
                onClick={clearGioHang}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Xóa toàn bộ giỏ hàng
              </button>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#7fad39",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {giohang.sanpham.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h3>Không có giỏ hàng nào</h3>
          <p>Hiện tại không có giỏ hàng nào từ người dùng</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>ID</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>User</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Tổng tiền</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Số sản phẩm</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Số lượng</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cartData.id}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cartData.userName}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>${cartData.total.toFixed(2)}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cartData.totalProducts}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cartData.totalQuantity}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  <button
                    onClick={() => xemChiTiet()}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => clearGioHang()}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa toàn bộ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
