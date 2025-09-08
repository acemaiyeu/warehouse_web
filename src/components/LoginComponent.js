import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // thêm state cho thông báo thành công

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      // Lưu token vào localStorage
      localStorage.setItem("token", res.data.access_token);

      // Hiện thông báo thành công
      setSuccess("Đăng nhập thành công!");

      // Sau 1.5s thì chuyển sang dashboard
      //
    } catch (err) {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
