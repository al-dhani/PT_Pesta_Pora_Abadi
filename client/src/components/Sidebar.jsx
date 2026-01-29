import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64
        bg-gradient-to-b from-[#EC008C] to-[#6A5ACD]
        shadow-xl z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full px-5 py-6">

          {/* ===== Header ===== */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <img
                src="/LogoMieGacoan.png"
                alt="Mie Gacoan"
                className="w-11 h-11 bg-white rounded-full p-1"
              />
              <span className="font-bold text-white text-lg">
                Mie Gacoan
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-white text-xl hover:opacity-70"
            >
              ✕
            </button>
          </div>

          {/* ===== Menu ===== */}
          <ul className="flex-1 space-y-2 text-white font-medium">
            <li>
              <Link
                onClick={onClose}
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                hover:bg-white/20 transition"
              >
                <span>🏠</span>
                <span>Home</span>
              </Link>
            </li>

            <li>
              <a
                href="#partners"
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                hover:bg-white/20 transition"
              >
                <span>🤝</span>
                <span>Partner Kami</span>
              </a>
            </li>

            <li>
              <a
                href="#artikel"
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                hover:bg-white/20 transition"
              >
                <span>📰</span>
                <span>Artikel</span>
              </a>
            </li>

            <li>
              <a
                href="#event"
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                hover:bg-white/20 transition"
              >
                <span>🎉</span>
                <span>Event</span>
              </a>
            </li>
          </ul>

          {/* ===== Footer / Login ===== */}
          <div className="pt-6 border-t border-white/30">
            <Link
              onClick={onClose}
              to="/login"
              className="flex items-center justify-center gap-2
              bg-white text-[#EC008C]
              py-3 rounded-xl font-semibold
              hover:bg-yellow-300 hover:text-black transition"
            >
              🔐 Login
            </Link>
          </div>

        </div>
      </aside>
    </>
  );
}
