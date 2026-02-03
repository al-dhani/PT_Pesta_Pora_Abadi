import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

// Import React Icons
import { FaRegNewspaper, FaHandshake, FaCalendarAlt, FaImages, FaBox, FaRocket, FaLock } from "react-icons/fa";
import { AiFillBulb, AiFillStar } from "react-icons/ai";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [partners, setPartners] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/login");

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/artikel")
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/event")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/partners")
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/galeri")
      .then(res => res.json())
      .then(data => setGallery(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/produk")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const menus = [
  { 
    name: "Articles", 
    table: "articles", 
    gradient: "from-[#EC008C] to-[#ff1a9e]",
    icon: <FaRegNewspaper size={28} color="white" />, // icon jadi putih
    count: articles.length,
  },
  { 
    name: "Partners", 
    table: "partners", 
    gradient: "from-[#00BCD4] to-[#00d4e8]",
    icon: <FaHandshake size={28} color="white" />, // icon biru
    count: partners.length,
  },
  { 
    name: "Events", 
    table: "event", 
    gradient: "from-[#EC008C] to-[#00BCD4]",
    icon: <FaCalendarAlt size={28} color="white" />, // icon kuning
    count: events.length,
  },
  { 
    name: "Gallery", 
    table: "gallery", 
    gradient: "from-[#00BCD4] to-[#EC008C]",
    icon: <FaImages size={28} color="white" />, // icon pink
    count: gallery.length,
  },
  { 
    name: "Products", 
    table: "products", 
    gradient: "from-[#ff1a9e] to-[#EC008C]",
    icon: <FaBox size={28} color="white" />, // icon pink muda
    count: products.length,
  },
];


  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Dashboard Admin
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              {formatDate(currentTime)}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#EC008C] to-[#00BCD4] rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TITLE */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Kelola Konten
        </h2>
        <p className="text-gray-600">
          Pilih modul untuk mengelola konten website
        </p>
      </div>

      {/* MENU CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu, index) => (
          <div
            key={menu.table}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-transparent transform hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Header dengan Pattern */}
            <div className={`bg-gradient-to-br ${menu.gradient} p-8 relative overflow-hidden`}>
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/5 rounded-full"></div>
              
              <div className="relative z-10">
                {/* Icon Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4 text-3xl border-2 border-white/30 shadow-lg">
                  {menu.icon}
                </div>
                
                {/* Stats Badge */}
                <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="text-xs font-bold text-gray-900">{menu.count}</span>
                  <span className={`text-xs font-semibold ${
                    menu.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {menu.change}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                  {menu.name}
                </h3>
                <p className="text-white/80 text-sm font-medium">
                  Kelola data {menu.name.toLowerCase()}
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Quick Stats */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{menu.count}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    menu.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {menu.change}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(`/admin/${menu.table}`)}
                className={`w-full bg-gradient-to-r ${menu.gradient} text-white font-bold py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105`}
              >
                <span>Kelola Sekarang</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK TIPS SECTION */}
      <div className="mt-10 bg-gradient-to-r from-[#EC008C]/10 via-[#00BCD4]/10 to-[#EC008C]/10 rounded-3xl p-8 border border-[#EC008C]/20 shadow-lg">
        <div className="flex items-start gap-6">
          <div className="text-5xl text-yellow-400"><AiFillBulb /></div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              Tips Cepat
              <span className="text-xs bg-[#EC008C] text-white px-2 py-1 rounded-full">New</span>
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Klik pada salah satu kartu di atas untuk mulai mengelola konten. 
              Setiap modul dilengkapi dengan fitur CRUD lengkap dan statistik real-time.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-1">
                <AiFillStar /> Easy to use
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-1">
                <FaRocket /> Fast & Responsive
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-1">
                <FaLock /> Secure
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2024 Dashboard Admin - Powered by Mie Gacoan <FaBox className="inline ml-1" /></p>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
