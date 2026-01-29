import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#EC008C] to-[#00B4D8]">

      {/* HOME BUTTON (DI LUAR CARD) */}
      <Link
        to="/"
        className="absolute top-6 left-6"
        title="Kembali ke Website"
      >
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition">
          <span className="text-3xl">🏠</span>
        </div>
      </Link>

      {/* CARD LOGIN */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Masuk ke dashboard admin
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EC008C]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EC008C]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#EC008C] text-white py-3 rounded-xl font-bold hover:bg-[#d0007a] transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} PT Pesta Pora Abadi
        </p>
      </div>
    </div>
  );
};

export default Login;
