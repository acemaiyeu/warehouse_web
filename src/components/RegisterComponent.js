import React, { useState } from "react";
import axios from "axios";

// Thành phần React xử lý chức năng đăng ký
const RegisterComponent = () => {
  // Sử dụng state để quản lý dữ liệu nhập vào của form và thông báo
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  // Tạo một instance Axios với URL cơ sở (base URL) cho API
  const api = axios.create({
    baseURL: "https://4967b5a38b8e.ngrok-free.app/api/auth",
  });

  // Hàm xử lý khi người dùng gửi form đăng ký
  const handleRegister = async (event) => {
    // Ngăn trình duyệt tải lại trang
    event.preventDefault();
    setMessage("");

    try {
      // Gửi yêu cầu POST bằng axios đến điểm cuối đăng ký
      const response = await api.post("/register", {
        username,
        email,
        password,
        // Đảm bảo tên trường này khớp hoàn toàn với validator của Laravel
        password_confirmation: passwordConfirmation,
      });

      // Nếu đăng ký thành công, hiển thị thông báo và xóa form
      setMessage("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      // Xử lý lỗi từ server hoặc lỗi kết nối
      if (error.response) {
        // Lỗi từ server (ví dụ: lỗi validation)
        // Lấy tất cả các thông báo lỗi và nối chúng lại
        const errorMessages = Object.values(error.response.data.errors || {})
          .flat()
          .join(" ");
        setMessage(errorMessages || "Đăng ký thất bại. Vui lòng thử lại.");
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
          Đăng ký
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

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
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
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password_confirmation"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
