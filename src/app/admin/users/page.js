"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { App } from "antd";

export default function AdminUsers() {
  const { notification } = App.useApp();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editUser, seteditUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  const layUsers = () => {
    axios
      .get("https://dummyjson.com/users?limit=20")
      .then((kQ) => {
        setUsers(kQ.data.users || []);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Lỗi khi tải người dùng:", e);
        setUsers([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    layUsers();
  }, []);

  const edit = (user) => {
    seteditUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
    });
    setShowForm(true);
  };

  const add = () => {
    seteditUser(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    });
    setShowForm(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (editUser) {
      axios
        .put(`https://dummyjson.com/users/${editUser.id}`, formData)
        .then((kQ) => {
          setUsers(users.map((user) => (user.id === editUser.id ? { ...user, ...formData } : user)));
          notification.success({
            message: "Cập nhật thành công",
            description: "Thông tin người dùng đã được cập nhật",
            placement: "topRight",
          });
          setShowForm(false);
        })
        .catch((e) => {
          console.error("Lỗi khi lưu:", e);
          notification.error({
            message: "Cập nhật thất bại",
            description: "Không thể cập nhật thông tin người dùng",
            placement: "topRight",
          });
        });
    } else {
      axios
        .post("https://dummyjson.com/users/add", formData)
        .then((kQ) => {
          setUsers([...users, { ...kQ.data, ...formData }]);
          notification.success({
            message: "Thêm mới thành công",
            description: "Người dùng mới đã được thêm vào hệ thống",
            placement: "topRight",
          });
          setShowForm(false);
        })
        .catch((e) => {
          console.error("Lỗi khi lưu:", e);
          notification.error({
            message: "Thêm mới thất bại",
            description: "Không thể thêm người dùng mới",
            placement: "topRight",
          });
        });
    }
  };

  const xoa = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      axios
        .delete(`https://dummyjson.com/users/${id}`)
        .then((kQ) => {
          setUsers(users.filter((user) => user.id !== id));
          notification.success({
            message: "Xóa thành công",
            description: "Người dùng đã được xóa khỏi hệ thống",
            placement: "topRight",
          });
        })
        .catch((e) => {
          console.error("Lỗi khi xóa:", e);
          notification.error({
            message: "Xóa thất bại",
            description: "Không thể xóa người dùng",
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

      <h1>Quản lý Người dùng</h1>

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
        Thêm người dùng mới
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
              width: "400px",
              maxWidth: "90%",
            }}
          >
            <h3>{editUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</h3>
            <form onSubmit={submit}>
              <div style={{ marginBottom: "15px" }}>
                <label>Tên:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
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
                <label>Họ:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
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
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                <label>Tuổi:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
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
                  {editUser ? "Cập nhật" : "Thêm mới"}
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
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Tên</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Họ</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Email</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Tuổi</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.id}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.firstName}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.lastName}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.email}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.age}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => edit(user)}
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
                      onClick={() => xoa(user.id)}
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
