import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: "Dashboard", table: "dashboard", icon: "🏠", gradient: "from-[#EC008C] to-[#ff1a9e]" },
    { name: "Articles", table: "articles", icon: "📝", gradient: "from-[#EC008C] to-[#ff1a9e]" },
    { name: "Partners", table: "partners", icon: "🤝", gradient: "from-[#00BCD4] to-[#00d4e8]" },
    { name: "Event", table: "event", icon: "📅", gradient: "from-[#EC008C] to-[#00BCD4]" },
    { name: "Gallery", table: "gallery", icon: "🖼️", gradient: "from-[#00BCD4] to-[#EC008C]" },
    { name: "Products", table: "products", icon: "📦", gradient: "from-[#ff1a9e] to-[#EC008C]" },
  ];

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <aside className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white fixed top-0 left-0 w-64 h-screen bg-white shadow-xl z-50">
      {/* Decorative gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EC008C] via-[#00BCD4] to-[#EC008C] animate-pulse"></div>

      {/* LOGO & HEADER */}
      <div className="p-6 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#EC008C] to-[#00BCD4] rounded-xl flex items-center justify-center text-2xl shadow-lg">
            🍜
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#EC008C] to-[#00BCD4] bg-clip-text text-transparent mb-1">
              Admin
            </h1>
            <p className="text-xs text-gray-400">Mie Gacoan Dashboard</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
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
                  : 'hover:bg-white/10 hover:scale-105'
                }
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Glow effect on hover for non-active items */}
              {!active && (
                <div className={`absolute inset-0 bg-gradient-to-r ${menu.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              )}
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <span className="text-2xl transition-all transform group-hover:scale-110">
                  {menu.icon}
                </span>
                <div className="flex-1">
                  <span className="block">{menu.name}</span>
                  {active && (
                    <span className="text-xs text-white/80 font-normal">● Active now</span>
                  )}
                </div>
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${
                    active 
                      ? 'translate-x-0 opacity-100' 
                      : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Active indicator bar */}
              {active && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-white rounded-l-full shadow-lg shadow-white/50"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t border-white/10 backdrop-blur-sm bg-white/5">
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/login");
          }}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 px-4 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
        >
          <svg 
            className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;