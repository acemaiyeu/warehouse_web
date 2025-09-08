import React, { useState } from "react";
import axios from "axios";

// Thành phần React xử lý chức năng đăng nhập
const LoginComponent = () => {
  // Sử dụng state để quản lý dữ liệu nhập vào của form và thông báo
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Tạo một instance Axios với URL cơ sở (base URL) cho API
  const api = axios.create({
    baseURL: "https://4967b5a38b8e.ngrok-free.app/api/auth",
  });

  // Hàm xử lý khi người dùng gửi form đăng nhập
  const handleLogin = async (event) => {
    // Ngăn trình duyệt tải lại trang
    event.preventDefault();
    setMessage("");

    try {
      // Gửi yêu cầu POST bằng axios đến điểm cuối đăng nhập
      const response = await api.post(
            "/login",
            {
              email,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

      // Nếu đăng nhập thành công, hiển thị thông báo và lưu token
      setMessage("Đăng nhập thành công!");
      setIsLoggedIn(true);
      // Lưu token JWT vào localStorage để sử dụng sau này
      localStorage.setItem("access_token", response.data.access_token);
      console.log("Token đã được lưu:", response.data.access_token);
    } catch (error) {
      // Xử lý lỗi từ server hoặc lỗi kết nối
      if (error.response) {
        // Lỗi từ server (ví dụ: email hoặc mật khẩu không đúng)
        setMessage(
          error.response.data.error || "Đăng nhập thất bại. Vui lòng thử lại."
        );
      } else if (error.request) {
        // Yêu cầu được gửi nhưng không nhận được phản hồi
        setMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      } else {
        // Lỗi trong quá trình thiết lập yêu cầu
        console.error("Lỗi khi thiết lập yêu cầu:", error.message);
        setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập
        </h1>

        {message && (
          <div
            className={`p-4 rounded-lg text-sm text-center mb-4 ${
              message.includes("thành công")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Đăng nhập
            </button>
          </form>
        ) : (
          <p className="text-center text-lg text-green-600 font-bold">
            Bạn đã đăng nhập thành công!
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
