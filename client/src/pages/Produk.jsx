const menu = [
  { nama: "Mie Gacoan Lv 1–8", kategori: "Mie" },
  { nama: "Mie Hompimpa", kategori: "Mie" },
  { nama: "Es Gobak Sodor", kategori: "Minuman" },
  { nama: "Es Teklek", kategori: "Minuman" },
  { nama: "Udang Rambutan", kategori: "Snack" },
  { nama: "Pangsit Goreng", kategori: "Snack" }
];

export default function Produk({ preview }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-2xl font-bold text-[#00B4D8] mb-4">
        Produk Kami
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {menu.slice(0, preview ? 3 : menu.length).map((m, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 hover:bg-gray-50"
          >
            <h4 className="font-semibold">{m.nama}</h4>
            <p className="text-sm text-gray-500">{m.kategori}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
