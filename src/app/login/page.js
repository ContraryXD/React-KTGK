"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Đăng nhập thành công!");
        console.log("Login successful:", data);

        // Store user data in localStorage (optional)
        localStorage.setItem("user", JSON.stringify(data));

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setError(data.message || "Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = () => {
    setFormData({
      username: "emilys",
      password: "emilyspass",
    });
  };

  return (
    <div className="container" style={{ minHeight: "80vh", paddingTop: "50px", paddingBottom: "50px" }}>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>Đăng Nhập</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Tên đăng nhập:
                  </label>
                  <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleInputChange} required placeholder="Nhập tên đăng nhập" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu:
                  </label>
                  <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="Nhập mật khẩu" />
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}

                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                  </button>
                </div>

                <div className="text-center mb-3">
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleTestLogin}>
                    Sử dụng tài khoản test (emilys/emilyspass)
                  </button>
                </div>

                <div className="text-center">
                  <p className="mb-0">
                    <Link href="/" className="text-decoration-none">
                      ← Quay về trang chủ
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* API Information */}
          <div className="card mt-4" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="card-body">
              <h6 className="card-title">Thông tin API Test:</h6>
              <div className="row">
                <div className="col-6">
                  <small className="text-muted">
                    <strong>Username:</strong> emilys
                    <br />
                    <strong>Password:</strong> emilyspass
                  </small>
                </div>
                <div className="col-6">
                  <small className="text-muted">
                    <strong>Username:</strong> michaelw
                    <br />
                    <strong>Password:</strong> michaelwpass
                  </small>
                </div>
              </div>
              <small className="text-muted">API Endpoint: https://dummyjson.com/user/login</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
