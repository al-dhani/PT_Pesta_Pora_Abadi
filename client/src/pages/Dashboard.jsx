import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/login");
  }, [navigate]);

  const menus = [
    { name: "Articles", table: "articles", color: "bg-blue-500" },
    { name: "Partners", table: "partners", color: "bg-green-500" },
    { name: "Events", table: "events", color: "bg-purple-500" },
    { name: "Gallery", table: "gallery", color: "bg-pink-500" },
    { name: "Products", table: "products", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Admin
        </h1>
        <p className="text-gray-500 mb-8">
          Kelola konten website dari satu tempat
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <div
              key={menu.table}
              className="bg-white rounded-xl shadow hover:shadow-xl transition p-6"
            >
              <div
                className={`w-12 h-12 ${menu.color} text-white flex items-center justify-center rounded-lg mb-4 text-xl`}
              >
                📁
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {menu.name}
              </h3>

              <p className="text-gray-500 text-sm mb-4">
                Kelola data {menu.name.toLowerCase()}
              </p>

              <button
                onClick={() => navigate(`/admin/${menu.table}`)}
                className="text-[#EC008C] font-semibold hover:underline"
              >
                Kelola →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
