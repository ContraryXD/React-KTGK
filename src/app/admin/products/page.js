"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { App } from "antd";

export default function AdminProducts() {
  const { notification } = App.useApp();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editSP, seteditSP] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    brand: "",
    description: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  const laySP = () => {
    axios
      .get("https://dummyjson.com/products?limit=30")
      .then((kQ) => {
        setProducts(kQ.data.products || []);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Lỗi khi tải sản phẩm:", e);
        setProducts([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    laySP();
  }, []);

  const edit = (product) => {
    seteditSP(product);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      brand: product.brand || "",
      description: product.description || "",
    });
    setShowForm(true);
  };

  const add = () => {
    seteditSP(null);
    setFormData({
      title: "",
      price: "",
      category: "",
      brand: "",
      description: "",
    });
    setShowForm(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (editSP) {
      axios
        .put(`https://dummyjson.com/products/${editSP.id}`, formData)
        .then((kQ) => {
          setProducts(products.map((product) => (product.id === editSP.id ? { ...product, ...formData } : product)));
          notification.success({
            message: "Cập nhật thành công",
            description: "Thông tin sản phẩm đã được cập nhật",
            placement: "topRight",
          });
          setShowForm(false);
        })
        .catch((e) => {
          console.error("Lỗi khi lưu:", e);
          notification.error({
            message: "Cập nhật thất bại",
            description: "Không thể cập nhật thông tin sản phẩm",
            placement: "topRight",
          });
        });
    } else {
      axios
        .post("https://dummyjson.com/products/add", formData)
        .then((kQ) => {
          setProducts([{ ...kQ.data, ...formData }, ...products]);
          notification.success({
            message: "Thêm mới thành công",
            description: "Sản phẩm mới đã được thêm vào hệ thống",
            placement: "topRight",
          });
          setShowForm(false);
        })
        .catch((e) => {
          console.error("Lỗi khi lưu:", e);
          notification.error({
            message: "Thêm mới thất bại",
            description: "Không thể thêm sản phẩm mới",
            placement: "topRight",
          });
        });
    }
  };

  const xoa = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      axios
        .delete(`https://dummyjson.com/products/${id}`)
        .then((kQ) => {
          setProducts(products.filter((product) => product.id !== id));
          notification.success({
            message: "Xóa thành công",
            description: "Sản phẩm đã được xóa khỏi hệ thống",
            placement: "topRight",
          });
        })
        .catch((e) => {
          console.error("Lỗi khi xóa:", e);
          notification.error({
            message: "Xóa thất bại",
            description: "Không thể xóa sản phẩm",
            placement: "topRight",
          });
        });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      setAuthLoading(false);
    };

    checkAdminAccess();
  }, [user, router]);

  if (authLoading) {
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

      <h1>Quản lý Sản phẩm</h1>

      <button
        onClick={add}
        style={{
          padding: "10px 20px",
          backgroundColor: "#7fad39",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Thêm sản phẩm mới
      </button>

      {showForm && (
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
              width: "500px",
              maxWidth: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h3>{editSP ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
            <form onSubmit={submit}>
              <div style={{ marginBottom: "15px" }}>
                <label>Tên sản phẩm:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Giá:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Danh mục:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Thương hiệu:</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Mô tả:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "5px",
                    resize: "vertical",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#ccc",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#7fad39",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {editSP ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
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
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Tên sản phẩm</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Giá</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Danh mục</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Thương hiệu</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{product.id}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{product.title}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>${product.price}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{product.category}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{product.brand || "N/A"}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => edit(product)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => xoa(product.id)}
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
