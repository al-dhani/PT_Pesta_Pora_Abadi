import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

const EventAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    judul: "",
    tanggal: "",
    lokasi: "",
    gambar: "",
    deskripsi: "",
  });

  /* =====================
     FETCH EVENT
  ===================== */
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/event");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* =====================
     DELETE EVENT
  ===================== */
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus event ini?")) return;

    try {
      await fetch(`http://localhost:5000/api/event/${id}`, {
        method: "DELETE",
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  /* =====================
     SUBMIT (CREATE / UPDATE)
  ===================== */
  const handleSubmit = async () => {
    try {
      const url = isEdit
        ? `http://localhost:5000/api/event/${editId}`
        : "http://localhost:5000/api/event";

      const method = isEdit ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setShowModal(false);
      setIsEdit(false);
      setForm({
        judul: "",
        tanggal: "",
        lokasi: "",
        gambar: "",
        deskripsi: "",
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#EC008C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading event...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-[#EC008C] via-purple-500 to-[#00BCD4] rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl">
                  📅
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Manajemen Event
                </h1>
              </div>
              <p className="text-white/80 text-sm md:text-base">
                Kelola semua acara dan kegiatan Anda
              </p>
            </div>
            <button
              onClick={() => {
                setIsEdit(false);
                setForm({
                  judul: "",
                  tanggal: "",
                  lokasi: "",
                  gambar: "",
                  deskripsi: "",
                });
                setShowModal(true);
              }}
              className="bg-white text-[#EC008C] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Tambah Event</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Total Event</p>
              <p className="text-3xl font-bold">{events.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Event Aktif</p>
              <p className="text-3xl font-bold">{events.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Event Terbaru</p>
              <p className="text-3xl font-bold">{events.length > 0 ? 1 : 0}</p>
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Daftar Event
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-700">Gambar</th>
                  <th className="p-4 text-left font-bold text-gray-700">Judul Event</th>
                  <th className="p-4 text-left font-bold text-gray-700">Tanggal</th>
                  <th className="p-4 text-left font-bold text-gray-700">Lokasi</th>
                  <th className="p-4 text-center font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center">
                      <div className="text-gray-400">
                        <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg font-semibold">Belum ada event</p>
                        <p className="text-sm">Klik tombol "Tambah Event" untuk membuat event baru</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  events.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* GAMBAR */}
                      <td className="p-4">
                        <div className="relative group">
                          <img
                            src={item.gambar}
                            alt={item.judul}
                            className="w-28 h-20 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow"
                            onError={(e) => {
                              e.target.src = "/images/no-image.png";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#EC008C]/0 to-purple-500/0 group-hover:from-[#EC008C]/20 group-hover:to-purple-500/20 rounded-xl transition-all"></div>
                        </div>
                      </td>

                      {/* JUDUL */}
                      <td className="p-4">
                        <p className="font-bold text-gray-800 mb-1 group-hover:text-[#EC008C] transition-colors">
                          {item.judul}
                        </p>
                        {item.deskripsi && (
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {item.deskripsi}
                          </p>
                        )}
                      </td>

                      {/* TANGGAL */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#EC008C] to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {new Date(item.tanggal).getDate()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {new Date(item.tanggal).toLocaleDateString("id-ID", { 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(item.tanggal).toLocaleDateString("id-ID", { 
                                weekday: 'long' 
                              })}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* LOKASI */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-700 font-medium">{item.lokasi}</span>
                        </div>
                      </td>

                      {/* AKSI */}
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setEditId(item.id);
                              setForm({
                                judul: item.judul,
                                tanggal: item.tanggal,
                                lokasi: item.lokasi,
                                gambar: item.gambar,
                                deskripsi: item.deskripsi,
                              });
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
            <div className="bg-gradient-to-r from-[#EC008C] via-purple-500 to-[#00BCD4] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                    {isEdit ? "✏️" : "➕"}
                  </div>
                  <h2 className="text-2xl font-bold">
                    {isEdit ? "Edit Event" : "Tambah Event Baru"}
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
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Judul Event */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Judul Event *
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 transition-all outline-none"
                  placeholder="Masukkan judul event..."
                  value={form.judul}
                  onChange={(e) =>
                    setForm({ ...form, judul: e.target.value })
                  }
                />
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tanggal */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tanggal Event *
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                    value={form.tanggal}
                    onChange={(e) =>
                      setForm({ ...form, tanggal: e.target.value })
                    }
                  />
                </div>

                {/* Lokasi */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Lokasi *
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 transition-all outline-none"
                    placeholder="Nama tempat atau alamat"
                    value={form.lokasi}
                    onChange={(e) =>
                      setForm({ ...form, lokasi: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* URL Gambar */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  URL Gambar Event
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#EC008C] focus:ring-2 focus:ring-[#EC008C]/20 transition-all outline-none"
                  placeholder="https://example.com/event.jpg"
                  value={form.gambar}
                  onChange={(e) =>
                    setForm({ ...form, gambar: e.target.value })
                  }
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Deskripsi Event
                </label>
                <textarea
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none resize-none"
                  placeholder="Tulis detail event di sini..."
                  rows="4"
                  value={form.deskripsi}
                  onChange={(e) =>
                    setForm({ ...form, deskripsi: e.target.value })
                  }
                />
              </div>

              {/* Preview Gambar */}
              {form.gambar && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <p className="text-sm font-bold text-gray-700 mb-3">Preview Gambar:</p>
                  <div className="bg-white rounded-xl overflow-hidden border-2 border-dashed border-gray-300">
                    <img
                      src={form.gambar}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x200?text=Invalid+URL";
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
                  className="bg-gradient-to-r from-[#EC008C] via-purple-500 to-[#00BCD4] text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{isEdit ? "Simpan Perubahan" : "Tambah Event"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default EventAdmin;