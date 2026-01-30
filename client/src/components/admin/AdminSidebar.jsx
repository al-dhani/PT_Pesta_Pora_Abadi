import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const menus = [
    { name: "Articles", table: "articles" },
    { name: "Partners", table: "partners" },
    { name: "Event", table: "event" },
    { name: "Gallery", table: "gallery" },
    { name: "Products", table: "products" },
  ];

  return (
    <aside className="w-64 bg-[#EC008C] text-white flex flex-col">
      <div className="p-6 text-2xl font-extrabold border-b border-pink-300">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="w-full text-left px-4 py-3 rounded-lg bg-pink-700 hover:bg-pink-600 font-semibold"
        >
          🏠 Dashboard
        </button>

        {menus.map((menu) => (
          <button
            key={menu.table}
            onClick={() => navigate(`/admin/${menu.table}`)}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-pink-600 transition"
          >
            {menu.name}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-pink-300">
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/login");
          }}
          className="w-full bg-white text-[#EC008C] py-2 rounded-lg font-bold hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
