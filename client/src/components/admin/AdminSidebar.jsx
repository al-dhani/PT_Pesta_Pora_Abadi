import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaNewspaper,
  FaHandshake,
  FaCalendarAlt,
  FaImages,
  FaBoxOpen,
  FaChevronRight,
  FaSignOutAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      table: "dashboard",
      icon: <FaHome />,
      gradient: "from-[#EC008C] to-[#ff1a9e]",
    },
    {
      name: "Articles",
      table: "articles",
      icon: <FaNewspaper />,
      gradient: "from-[#EC008C] to-[#ff1a9e]",
    },
    {
      name: "Partners",
      table: "partners",
      icon: <FaHandshake />,
      gradient: "from-[#00BCD4] to-[#00d4e8]",
    },
    {
      name: "Event",
      table: "event",
      icon: <FaCalendarAlt />,
      gradient: "from-[#EC008C] to-[#00BCD4]",
    },
    {
      name: "Gallery",
      table: "gallery",
      icon: <FaImages />,
      gradient: "from-[#00BCD4] to-[#EC008C]",
    },
    {
      name: "Products",
      table: "products",
      icon: <FaBoxOpen />,
      gradient: "from-[#ff1a9e] to-[#EC008C]",
    },
    {
      name: "Admintransactions",
      table: "transactions",
      icon: <FaMoneyBillWave />,
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  const isActive = (path) => location.pathname.includes(path);

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl z-50">

      {/* Decorative top line */}
      <div className="h-1 bg-gradient-to-r from-[#EC008C] via-[#00BCD4] to-[#EC008C] animate-pulse" />

      {/* LOGO */}
      <div className="p-6 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
            <img
              src="/LogoMieGacoan.png"
              alt="Mie Gacoan"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#EC008C] to-[#00BCD4] bg-clip-text text-transparent mb-1">
              Admin
            </h1>
            <p className="text-xs text-gray-400">Mie Gacoan Dashboard</p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {menus.map((menu, index) => {
          const active = isActive(menu.table);

          return (
            <button
              key={menu.table}
              onClick={() => navigate(`/admin/${menu.table}`)}
              className={`
                w-full text-left px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden
                ${active
                  ? `bg-gradient-to-r ${menu.gradient} shadow-lg shadow-pink-500/30 scale-105`
                  : "hover:bg-white/10 hover:scale-105"
                }
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {!active && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${menu.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="flex items-center gap-3 relative z-10">
                <span className="text-xl">{menu.icon}</span>

                <div className="flex-1">
                  <span className="block">{menu.name}</span>
                  {active && (
                    <span className="text-xs text-white/80 font-normal">
                      ● Active now
                    </span>
                  )}
                </div>

                <FaChevronRight
                  className={`w-4 h-4 transition-all ${active
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                    }`}
                />
              </div>

              {active && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-white rounded-l-full shadow-lg shadow-white/50" />
              )}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT — NEMPEL BAWAH */}
      <div className="p-4 border-t border-white/10 backdrop-blur-sm bg-white/5">
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/login");
          }}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 px-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;