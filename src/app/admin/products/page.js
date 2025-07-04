"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    brand: "",
    description: "",
  });

  const fetchProducts = () => {
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
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      brand: product.brand || "",
      description: product.description || "",
    });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      price: "",
      category: "",
      brand: "",
      description: "",
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      axios
        .put(`https://dummyjson.com/products/${editingProduct.id}`, formData)
        .then((kQ) => {
          setProducts(products.map((product) => (product.id === editingProduct.id ? { ...product, ...formData } : product)));
          alert("Cập nhật thành công!");
          setShowForm(false);
        })
        .catch((e) => {
          console.error("Lỗi khi lưu:", e);
          alert("Có lỗi xảy ra!");
        });
    } else {
      axios
        .post("https://dummyjson.com/products/add", formData)
        .then((kQ) => {
          setProducts([{ ...kQ.data, ...formData }, ...products]);
          alert("Thêm mới thành công!");
          setShowForm(false);
        })
        .catch((e) => {
          console.error("Lỗi khi lưu:", e);
          alert("Có lỗi xảy ra!");
        });
    }
  };

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      axios
        .delete(`https://dummyjson.com/products/${id}`)
        .then((kQ) => {
          setProducts(products.filter((product) => product.id !== id));
          alert("Xóa thành công!");
        })
        .catch((e) => {
          console.error("Lỗi khi xóa:", e);
          alert("Có lỗi xảy ra!");
        });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/admin" style={{ color: "#7fad39", textDecoration: "none" }}>
          ← Quay lại Admin
        </Link>
      </div>

      <h1>Quản lý Sản phẩm</h1>

      <button
        onClick={handleAdd}
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
            <h3>{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
            <form onSubmit={handleSubmit}>
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
                  {editingProduct ? "Cập nhật" : "Thêm mới"}
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
                      onClick={() => handleEdit(product)}
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
                      onClick={() => handleDelete(product.id)}
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
