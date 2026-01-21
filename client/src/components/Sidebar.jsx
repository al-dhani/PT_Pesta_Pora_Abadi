import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="mb-6 text-gray-500 hover:text-[#EC008C]"
        >
          ✕ Tutup
        </button>

        <ul className="space-y-4 font-medium text-gray-700">
          <li><Link onClick={onClose} to="/">Home</Link></li>
          <li><Link onClick={onClose} to="/myclient">Klien Kami</Link></li>
          <li><Link onClick={onClose} to="/artikel">Artikel</Link></li>
          <li><Link onClick={onClose} to="/event">Event</Link></li>
          <li><Link onClick={onClose} to="/galeri">Galeri</Link></li>
          <li><Link onClick={onClose} to="/branches">Cabang</Link></li>
          <li><Link onClick={onClose} to="/login">Login</Link></li>
          <li><Link onClick={onClose} to="/register">Register</Link></li>
        </ul>
      </aside>
    </>
  );
}
