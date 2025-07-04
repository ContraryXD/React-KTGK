"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function AdminCarts() {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCart, setSelectedCart] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchCarts = () => {
    axios
      .get("https://dummyjson.com/carts?limit=20")
      .then((kQ) => {
        setCarts(kQ.data.carts || []);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Lỗi khi tải giỏ hàng:", e);
        setCarts([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const handleViewDetails = (cart) => {
    axios
      .get(`https://dummyjson.com/carts/${cart.id}`)
      .then((kQ) => {
        setSelectedCart(kQ.data);
        setShowDetails(true);
      })
      .catch((e) => {
        console.error("Lỗi khi tải chi tiết giỏ hàng:", e);
        alert("Không thể tải chi tiết giỏ hàng!");
      });
  };

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa giỏ hàng này?")) {
      axios
        .delete(`https://dummyjson.com/carts/${id}`)
        .then((kQ) => {
          setCarts(carts.filter((cart) => cart.id !== id));
          alert("Xóa thành công!");
        })
        .catch((e) => {
          console.error("Lỗi khi xóa:", e);
          alert("Có lỗi xảy ra!");
        });
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/admin" style={{ color: "#7fad39", textDecoration: "none" }}>
          ← Quay lại Admin
        </Link>
      </div>

      <h1>Quản lý Giỏ hàng</h1>

      {showDetails && selectedCart && (
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
            <h3>Chi tiết giỏ hàng #{selectedCart.id}</h3>
            <p>
              <strong>User ID:</strong> {selectedCart.userId}
            </p>
            <p>
              <strong>Tổng tiền:</strong> ${selectedCart.total}
            </p>
            <p>
              <strong>Tổng số sản phẩm:</strong> {selectedCart.totalProducts}
            </p>
            <p>
              <strong>Tổng số lượng:</strong> {selectedCart.totalQuantity}
            </p>

            <h4>Sản phẩm trong giỏ hàng:</h4>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", marginTop: "10px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Sản phẩm</th>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Giá</th>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Số lượng</th>
                    <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCart.products?.map((product, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.title}</td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>${product.price}</td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.quantity}</td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>${product.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
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

      {isLoading ? (
        <div>Đang tải...</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>ID</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>User ID</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Tổng tiền</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Số sản phẩm</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Số lượng</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr key={cart.id}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cart.id}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cart.userId}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>${cart.total}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cart.totalProducts}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cart.totalQuantity}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleViewDetails(cart)}
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
                      onClick={() => handleDelete(cart.id)}
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
      )}
    </div>
  );
}
