import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    } catch {
      alert("Login gagal");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden group">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 
                   scale-105 group-hover:scale-110 
                   brightness-75 group-hover:brightness-90"
        style={{
          backgroundImage: "url('/images/gacoan-hero.jpg')",
        }}
      ></div>

      {/* OVERLAY GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>

      {/* LOGIN CARD */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className="w-[420px] backdrop-blur-xl bg-white/20 border border-white/30 
                     rounded-3xl shadow-2xl p-10 animate-fade-in relative"
        >

          {/* HOME LINK (PINDAH KE SINI) */}
          <div className="absolute top-6 left-8 text-white text-sm font-medium">
            <Link to="/" className="hover:opacity-80 transition">
              ← HOME
            </Link>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-center text-white mb-12 mt-6">
            LOGIN
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* USERNAME */}
            <input
              type="text"
              placeholder="Email / Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/40 
                         text-white placeholder-white/70 py-3 
                         focus:outline-none focus:border-white transition"
              required
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/40 
                           text-white placeholder-white/70 py-3 
                           focus:outline-none focus:border-white transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-white/70 hover:text-white transition"
              >
                👁
              </button>
            </div>

            {/* REMEMBER */}
            <div className="flex items-center gap-2 text-white text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full mt-8 py-3 rounded-full text-white font-semibold
                         bg-gradient-to-r from-[#EC008C] to-[#00B4D8]
                         hover:scale-[1.03] transition-all duration-300"
            >
              Login
            </button>

            {/* REGISTER */}
            <div className="text-center text-white/80 text-sm pt-4">
              Don’t have an account?{" "}
              <Link to="/register" className="font-semibold hover:text-white">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
