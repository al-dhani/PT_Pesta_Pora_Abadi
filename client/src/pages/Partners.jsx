import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    logo: "",
  });

  const fetchPartners = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/partners");
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/partners/${editId}`
      : "http://localhost:5000/api/partners";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    setIsEdit(false);
    setForm({ nama: "", logo: "" });
    fetchPartners();
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus partner ini?")) return;

    await fetch(`http://localhost:5000/api/partners/${id}`, {
      method: "DELETE",
    });

    fetchPartners();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#00BCD4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading partners...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-[#00BCD4] to-[#EC008C] rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl">
                  🤝
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Manajemen Partners
                </h1>
              </div>
              <p className="text-white/80 text-sm md:text-base">
                Kelola logo dan data partner bisnis Anda
              </p>
            </div>
            <button
              onClick={() => {
                setIsEdit(false);
                setForm({ nama: "", logo: "" });
                setShowModal(true);
              }}
              className="bg-white text-[#00BCD4] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Tambah Partner</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Total Partner</p>
              <p className="text-3xl font-bold">{partners.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Partner Aktif</p>
              <p className="text-3xl font-bold">{partners.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Partner Terbaru</p>
              <p className="text-3xl font-bold">{partners.length > 0 ? 1 : 0}</p>
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Daftar Partners
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-700">Logo</th>
                  <th className="p-4 text-left font-bold text-gray-700">Nama Partner</th>
                  <th className="p-4 text-center font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {partners.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-12 text-center">
                      <div className="text-gray-400">
                        <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-lg font-semibold">Belum ada partner</p>
                        <p className="text-sm">Klik tombol "Tambah Partner" untuk menambahkan partner baru</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  partners.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-[#00BCD4]/5 hover:to-[#EC008C]/5 transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4">
                        <div className="relative group">
                          <div className="w-32 h-24 bg-gray-50 rounded-xl shadow-md group-hover:shadow-xl transition-shadow flex items-center justify-center p-4 border border-gray-100">
                            <img
                              src={item.logo}
                              alt={item.nama}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#00BCD4]/0 to-[#EC008C]/0 group-hover:from-[#00BCD4]/10 group-hover:to-[#EC008C]/10 rounded-xl transition-all"></div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#00BCD4] to-[#EC008C] rounded-full flex items-center justify-center text-white text-lg font-bold">
                            {item.nama ? item.nama[0].toUpperCase() : "?"}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 group-hover:text-[#00BCD4] transition-colors">
                              {item.nama}
                            </p>
                            <p className="text-xs text-gray-500">Partner Bisnis</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setEditId(item.id);
                              setForm(item);
                              setShowModal(true);
                            }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl transform animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#00BCD4] to-[#EC008C] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                    {isEdit ? "✏️" : "➕"}
                  </div>
                  <h2 className="text-2xl font-bold">
                    {isEdit ? "Edit Partner" : "Tambah Partner Baru"}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Nama Partner */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nama Partner *
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 transition-all outline-none"
                  placeholder="Masukkan nama partner..."
                  value={form.nama}
                  onChange={(e) =>
                    setForm({ ...form, nama: e.target.value })
                  }
                />
              </div>

              {/* URL Logo */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  URL Logo *
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 transition-all outline-none"
                  placeholder="https://example.com/logo.png"
                  value={form.logo}
                  onChange={(e) =>
                    setForm({ ...form, logo: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tips: Gunakan URL gambar dengan format PNG atau SVG untuk hasil terbaik
                </p>
              </div>

              {/* Preview Logo */}
              {form.logo && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <p className="text-sm font-bold text-gray-700 mb-3">Preview Logo:</p>
                  <div className="bg-white rounded-xl p-6 flex items-center justify-center border-2 border-dashed border-gray-300 min-h-[120px]">
                    <img
                      src={form.logo}
                      alt="Preview"
                      className="max-w-full max-h-32 object-contain"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200x100?text=Invalid+URL";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 rounded-b-3xl border-t border-gray-100">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#00BCD4] to-[#EC008C] text-white px-6 py-3 rounded-xl font-bold hover:from-[#00d4e8] hover:to-[#ff1a9e] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{isEdit ? "Simpan Perubahan" : "Tambah Partner"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Partners;