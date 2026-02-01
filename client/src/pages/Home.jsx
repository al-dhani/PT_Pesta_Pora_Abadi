import { useState, useEffect } from 'react';
import axios from "axios";


export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/produk")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.error("Gagal ambil data produk:", err);
      });
  }, []);

  const handlePayment = async (product) => {
    try {
      // 1. Request token ke backend
      const res = await axios.post("http://localhost:5000/api/checkout", {
        orderId: `INV-${Date.now()}`, // ID unik
        grossAmount: product.harga, // total bayar
        customer: {
          firstName: "Alif",
          lastName: "Ramadhani",
          email: "alif@example.com",
          phone: "081234567890",
        },
      });

      const token = res.data.token;

      // 2. Panggil Snap popup
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log("success:", result);
          alert("Pembayaran berhasil!");
        },
        onPending: function (result) {
          console.log("pending:", result);
          alert("Pembayaran pending!");
        },
        onError: function (result) {
          console.log("error:", result);
          alert("Terjadi kesalahan pembayaran!");
        },
        onClose: function () {
          console.log("popup closed");
          alert("Anda menutup popup tanpa membayar");
        },
      });
    } catch (err) {
      console.error(err);
      alert("Gagal membuat transaksi!");
    }
  };

  const displayedProducts = showAll
    ? products
    : products.slice(0, 4);

  const [galeri, setGaleri] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/galeri")
      .then(res => res.json())
      .then(data => setGaleri(data))
      .catch(err => console.error("Gagal ambil galeri:", err));
  }, []);

  const [partners, setPartners] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/partners")
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error("Gagal ambil partners:", err));
  }, []);

  const [articles, setArticles] = useState([]);
  useEffect(() => {
  fetch("http://localhost:5000/api/artikel")
    .then(res => res.json())
    .then(data => setArticles(data))
    .catch(err => console.error("Gagal ambil artikel:", err));
}, []);


  const menuFavorites = [
    {
      name: "Mie Gacoan",
      description: "Mie pedas favorit dengan level sesuai selera.",
      image: "/images/miegacoan.png",
    },
    {
      name: "Udang Rambutan",
      description: "Camilan renyah dengan isian udang pilihan.",
      image: "/images/udangrambutan.png",
    },
    {
      name: "Udang Keju",
      description: "Perpaduan udang gurih dan keju lumer.",
      image: "/images/udangkeju.png",
    },
    {
      name: "Es Gobak Sodor",
      description: "Minuman segar favorit pendamping makanan.",
      image: "/images/esgobaksodor.png",
    },
  ];

  const JUMLAH_GALERI_AWAL = 5;
  const [showAllGallery, setShowAllGallery] = useState(false);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/event")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Gagal ambil event:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - MODERN & BOLD */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background dengan gradien dan pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EC008C] via-[#C4007A] to-[#00B4D8]">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#00B4D8]/20 rounded-full blur-3xl animate-pulse delay-75"></div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/30">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">PT Pesta Pora Abadi</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="block">Mie Gacoan</span>
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Pedasnya Juara!
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto font-light">
            Nikmati sensasi pedas dengan harga bersahabat di 500+ outlet seluruh Indonesia
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="group bg-white text-[#EC008C] px-8 py-4 rounded-full font-bold text-lg 
                hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-white/50 
                hover:scale-105 flex items-center gap-2"
            >
              Lihat Menu
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full 
                font-bold text-lg hover:bg-white hover:text-[#EC008C] transition-all duration-300 
                shadow-2xl hover:scale-105"
            >
              Tentang Kami
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-black mb-2">500+</div>
              <div className="text-sm text-white/80">Outlet</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-black mb-2">8 Tahun</div>
              <div className="text-sm text-white/80">Pengalaman</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-black mb-2">10M+</div>
              <div className="text-sm text-white/80">Pelanggan</div>
            </div>
          </div>
        </div>

      </section>

      {/* ABOUT SECTION - MODERN LAYOUT */}
      <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EC008C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B4D8]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-6 py-2 rounded-full font-semibold mb-4">
              Tentang Kami
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Kisah <span className="text-[#EC008C]">Mie Gacoan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perjalanan dari satu outlet kecil di Malang hingga menjadi brand mie pedas favorit Indonesia
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left: Story */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Tentang Kami</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong className="text-[#EC008C]">Mie Gacoan</strong> merupakan brand kuliner di bawah naungan
                  <strong> PT Pesta Pora Abadi</strong> yang didirikan pada tahun 2016 di Malang, Jawa Timur.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami menghadirkan konsep mie pedas modern dengan harga terjangkau yang menyasar generasi muda Indonesia,
                  dengan menu yang bervariasi dan suasana yang kekinian.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Berawal dari satu outlet kecil, kini Mie Gacoan telah berkembang menjadi salah satu brand kuliner
                  terbesar di Indonesia dengan lebih dari <strong className="text-[#00B4D8]">500+ outlet</strong> yang
                  tersebar di berbagai kota.
                </p>
              </div>

              {/* Achievement Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-[#EC008C] to-[#C4007A] text-white p-6 rounded-2xl text-center">
                  <div className="text-3xl font-black mb-1">500+</div>
                  <div className="text-xs font-medium opacity-90">Outlets</div>
                </div>
                <div className="bg-gradient-to-br from-[#00B4D8] to-[#0096B8] text-white p-6 rounded-2xl text-center">
                  <div className="text-3xl font-black mb-1">50+</div>
                  <div className="text-xs font-medium opacity-90">Kota</div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6 rounded-2xl text-center">
                  <div className="text-3xl font-black mb-1">10K+</div>
                  <div className="text-xs font-medium opacity-90">Karyawan</div>
                </div>
              </div>
            </div>

            {/* Right: Timeline */}
            <div className="bg-gradient-to-br from-[#EC008C] to-[#00B4D8] rounded-3xl p-10 text-white shadow-2xl">
              <h4 className="text-3xl font-black mb-8 flex items-center gap-3">
                <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                Sejarah Singkat
              </h4>
              <div className="space-y-6">
                {[
                  { year: "2016", text: "Pembukaan outlet pertama di Malang" },
                  { year: "2018", text: "Ekspansi ke kota-kota besar Jawa Timur" },
                  { year: "2020", text: "Mencapai 100+ outlet se-Indonesia" },
                  { year: "2024", text: "Meraih 500+ outlet dan terus berkembang" }
                ].map((milestone, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center 
                      font-black text-lg border-2 border-white/30 group-hover:bg-white group-hover:text-[#EC008C] transition-all duration-300">
                      {idx + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="font-black text-xl mb-1">{milestone.year}</div>
                      <div className="text-white/90 text-sm leading-relaxed">{milestone.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI - CARD STYLE */}
      <section id="visimisi" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#00B4D8]/10 text-[#00B4D8] px-6 py-2 rounded-full font-semibold mb-4">
              Visi & Misi
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900">
              Visi <span className="text-[#00B4D8]">Misi</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Visi */}
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 
              border-t-4 border-[#EC008C] hover:-translate-y-2">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-3xl font-black text-[#EC008C] mb-6">Visi Kami</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Menjadi brand mie pedas nomor satu pilihan masyarakat Indonesia yang dikenal dengan
                kualitas terbaik, harga terjangkau, dan pelayanan yang memuaskan di setiap outlet kami.
              </p>
            </div>

            {/* Misi */}
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 
              border-t-4 border-[#00B4D8] hover:-translate-y-2">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-3xl font-black text-[#00B4D8] mb-6">Misi Kami</h3>
              <ul className="space-y-4">
                {[
                  "Menyajikan produk mie berkualitas tinggi dengan harga yang terjangkau",
                  "Menciptakan lapangan kerja dan memberdayakan generasi muda Indonesia",
                  "Mengembangkan inovasi menu yang sesuai dengan selera pasar",
                  "Memberikan pengalaman dining yang menyenangkan dan berkesan"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#00B4D8] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN - ICON GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-6 py-2 rounded-full font-semibold mb-4">
              Keunggulan Kami
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900">
              Kenapa <span className="text-[#EC008C]">Mie Gacoan</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: "💰", title: "Harga Terjangkau", desc: "Mulai dari Rp 5.000", color: "from-[#EC008C] to-[#C4007A]" },
              { icon: "⚡", title: "Pelayanan Cepat", desc: "Pesanan siap 5-10 menit", color: "from-[#00B4D8] to-[#0096B8]" },
              { icon: "🌟", title: "Kualitas Terjamin", desc: "Bahan baku pilihan & higienis", color: "from-[#8B2C7E] to-[#6B1F5E]" },
              { icon: "🏪", title: "Outlet Nyaman", desc: "Suasana kekinian & instagramable", color: "from-[#FF6B6B] to-[#D54D4D]" }
            ].map((item, idx) => (
              <div key={idx} className={`group bg-gradient-to-br ${item.color} text-white rounded-3xl p-8 
                hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer`}>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="font-black text-xl mb-2">{item.title}</h4>
                <p className="text-white/90 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Work Process */}
          <div className="mt-20 bg-gray-50 rounded-3xl p-12 max-w-7xl mx-auto">
            <h3 className="text-3xl font-black text-center text-gray-900 mb-12">Standard Work Process</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: "📋", title: "Project Planning", desc: "Perencanaan menu & strategi outlet" },
                { icon: "👨‍🍳", title: "Research Analysis", desc: "Riset bahan baku & resep terbaik" },
                { icon: "🎨", title: "Creative Design", desc: "Desain outlet & branding menarik" },
                { icon: "✅", title: "Approved System", desc: "Quality control & pelayanan prima" }
              ].map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 
                    shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MENU FAVORIT - MODERN CARDS */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Menu <span className="text-[#EC008C]">Favorit</span> Pelanggan
            </h2>
            <p className="text-xl text-gray-300">
              Menu andalan yang paling sering dipesan pelanggan kami
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
            {[
              { num: "300+", label: "Outlet di Indonesia" },
              { num: "50+", label: "Kota Tersedia" },
              { num: "2016", label: "Tahun Berdiri" },
              { num: "10M+", label: "Pelanggan Puas" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10">
                <div className="text-4xl font-black text-[#00B4D8] mb-2">{stat.num}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Menu Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {menuFavorites.map((menu, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 
                  hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-4 mb-4 h-32 flex items-center justify-center 
                  group-hover:scale-110 transition-transform">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="max-h-24 object-contain"
                  />
                </div>
                <h4 className="font-black text-xl mb-2">{menu.name}</h4>
                <p className="text-gray-300 text-sm">{menu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUK - GRID CARDS */}
      <section id="products" className="py-24 bg-gradient-to-br from-[#FDEAF3] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-6 py-2 rounded-full font-semibold mb-4">
              Menu Unggulan
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Produk <span className="text-[#EC008C]">Kami</span>
            </h2>
            <p className="text-xl text-gray-600">
              Berbagai pilihan menu favorit dengan harga terjangkau
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            
            {displayedProducts.map(product => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
                  transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.nama_produk}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#00B4D8] text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                      {product.tipe}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-black text-xl mb-3 text-gray-900">{product.nama_produk}</h3>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Harga</div>
                      <span className="text-[#EC008C] font-black text-2xl">
                        Rp {product.harga}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePayment(product)}
                      className="bg-gradient-to-r from-[#EC008C] to-[#C4007A] text-white px-6 py-3 
    rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {products.length > 4 && (
            <div className="text-center mt-12">
              {!showAll ? (
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-[#EC008C] text-white px-10 py-4 rounded-full font-bold text-lg 
                    hover:bg-[#C4007A] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Lihat Semua Produk →
                </button>
              ) : (
                <button
                  onClick={() => setShowAll(false)}
                  className="bg-gray-200 text-gray-700 px-10 py-4 rounded-full font-bold text-lg 
                    hover:bg-gray-300 transition-all duration-300 shadow-xl hover:scale-105"
                >
                  Tampilkan Lebih Sedikit ↑
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-[#00B4D8] to-[#0096B8] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#EC008C] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-5xl md:text-6xl font-black mb-6">
              Rasakan Sensasi Pedas Favoritmu
            </h3>
            <p className="text-xl mb-10 text-white/90">
              Mie Gacoan siap menemani momen makanmu bersama teman dan keluarga
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.antaranews.com/berita/4195941/lokasi-mie-gacoan-di-berbagai-daerah-ini-daftar-dan-jam-operasinya"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#00B4D8] px-10 py-4 rounded-full font-black text-lg 
                  hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 flex items-center gap-2"
              >
                📍 Lihat Lokasi Outlet
              </a>
              <a
                href="#products"
                className="border-2 border-white px-10 py-4 rounded-full font-black text-lg 
                  hover:bg-white hover:text-[#00B4D8] transition-all duration-300 hover:scale-105"
              >
                🍜 Lihat Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY - MASONRY LAYOUT dengan variasi ukuran */}
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-6 py-2 rounded-full font-semibold mb-4">
              Galeri Kami
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Outlet <span className="text-[#EC008C]">Mie Gacoan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dokumentasi suasana outlet, menu favorit, dan momen kebersamaan pelanggan
              di berbagai cabang Mie Gacoan
            </p>
          </div>

          {/* Masonry Grid dengan ukuran bervariasi */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {(showAllGallery ? galeri : galeri.slice(0, JUMLAH_GALERI_AWAL)).map((item, idx) => {
              // Variasi ukuran: buat beberapa item lebih besar
              const isLarge = idx % 7 === 0; // Setiap item ke-7 jadi besar
              const isTall = idx % 5 === 0; // Setiap item ke-5 jadi tinggi (portrait)
              const isWide = idx % 6 === 0; // Setiap item ke-6 jadi lebar

              return (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl 
                    transition-all duration-300 cursor-pointer
                    ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                    ${isTall ? 'row-span-2' : ''}
                    ${isWide && !isLarge ? 'md:col-span-2' : ''}
                  `}
                >
                  <img
                    src={item.file_gambar}
                    alt={item.judul}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-500
                      ${isLarge ? 'h-full min-h-[500px]' : isTall ? 'h-full min-h-[400px]' : 'h-64'}
                    `}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full 
                    group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-black text-lg mb-1">{item.judul}</h4>
                    {item.deskripsi && (
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {item.deskripsi}
                      </p>
                    )}
                  </div>

                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full 
                    flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {galeri.length > JUMLAH_GALERI_AWAL && (
            <div className="text-center mt-12">
              {!showAllGallery ? (
                <button
                  onClick={() => setShowAllGallery(true)}
                  className="bg-[#EC008C] text-white px-10 py-4 rounded-full font-bold text-lg 
                    hover:bg-[#C4007A] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Lihat Lebih Banyak Foto →
                </button>
              ) : (
                <button
                  onClick={() => setShowAllGallery(false)}
                  className="bg-gray-200 text-gray-700 px-10 py-4 rounded-full font-bold text-lg 
                    hover:bg-gray-300 transition-all duration-300 shadow-xl hover:scale-105"
                >
                  Tampilkan Lebih Sedikit ↑
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#00B4D8]/10 text-[#00B4D8] px-6 py-2 rounded-full font-semibold mb-4">
              Partner Kami
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900">
              Dipercaya Oleh <span className="text-[#00B4D8]">Brand Ternama</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {partners.map(partner => (
              <div
                key={partner.id}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl 
                  transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="h-24 flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.nama}
                    className="max-h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <p className="font-bold text-center text-gray-800 group-hover:text-[#00B4D8] transition-colors">
                  {partner.nama}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Apa Kata <span className="text-[#EC008C]">Pelanggan</span>
            </h2>
            <p className="text-xl text-gray-300">
              Ribuan pelanggan puas dengan pelayanan dan rasa kami
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Andi Setiawan",
                avatar: "👨‍💼",
                rating: 5,
                text: "Mie Gacoan adalah tempat favorit saya! Harga terjangkau, rasa enak, dan pelayanannya cepat. Level 7 adalah pilihan terbaik!"
              },
              {
                name: "Sinta Dewi",
                avatar: "👩",
                rating: 5,
                text: "Outlet nya nyaman banget, cocok buat nongkrong sama teman. Dimsum nya juga enak, jadi selalu pesan paket komplit!"
              }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 
                  hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-black text-xl">{testimonial.name}</h4>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-200 italic leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT - PORTRAIT CARDS */}
      <section id="event" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#00B4D8]/10 text-[#00B4D8] px-6 py-2 rounded-full font-semibold mb-4">
              Event & Kegiatan
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Ikuti <span className="text-[#00B4D8]">Event</span> Kami
            </h2>
            <p className="text-xl text-gray-600">
              Berbagai kegiatan menarik dari Mie Gacoan untuk pelanggan setia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {events.map(event => (
              <div
                key={event.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
                  transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image - Portrait */}
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  {event.gambar ? (
                    <img
                      src={event.gambar}
                      alt={event.judul}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-8xl">
                      🎉
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
                      <div className="text-2xl font-black text-[#EC008C]">
                        {new Date(event.tanggal).getDate()}
                      </div>
                      <div className="text-xs font-bold text-gray-600 uppercase">
                        {new Date(event.tanggal).toLocaleDateString("id-ID", { month: "short" })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-black text-xl mb-3 text-gray-900 line-clamp-2 
                    group-hover:text-[#EC008C] transition-colors">
                    {event.judul}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <span>📍</span>
                    <span className="line-clamp-1">{event.lokasi}</span>
                  </div>

                  {event.deskripsi && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                      {event.deskripsi}
                    </p>
                  )}

                  {event.link ? (
  <a
    href={event.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-center w-full bg-gradient-to-r from-[#EC008C] to-[#00B4D8] text-white 
      py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
    Lihat Detail
  </a>
) : (
  <button
    disabled
    className="w-full bg-gray-300 text-gray-500 py-3 rounded-full font-bold cursor-not-allowed"
  >
    Lihat Detail
  </button>
)}

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTIKEL */}
      <section id="artikel" className="py-24 bg-gradient-to-br from-[#FDEAF3] to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
              <span className="inline-block bg-[#EC008C]/10 text-[#EC008C] px-6 py-2 rounded-full font-semibold mb-4">
                Blog & Artikel
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                News & <span className="text-[#EC008C]">Articles</span>
              </h2>
            </div>
            <button className="bg-[#00B4D8] text-white px-8 py-3 rounded-full font-bold 
              hover:bg-[#0096B8] transition-all duration-300 hover:scale-105 shadow-lg">
              View All →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {articles.map(article => (
  <div
    key={article.id}
    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
      transition-all duration-300 hover:-translate-y-2"
  >
    {/* THUMBNAIL */}
    <div className="h-56 overflow-hidden">
      <img
        src={article.thumbnail}
        alt={article.judul}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>

    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <span className="bg-[#00B4D8] text-white px-4 py-1 rounded-full text-xs font-bold">
          {article.penulis}
        </span>
        <span className="text-sm text-gray-500">
          📅 {article.created_at.slice(0, 10)}
        </span>
      </div>

      <h3 className="font-black text-xl mb-4 line-clamp-2 text-gray-900 
        group-hover:text-[#EC008C] transition-colors">
        {article.judul}
      </h3>

      <a
        href={article.slug}
        target="_blank"
        className="text-[#EC008C] font-bold hover:gap-2 flex items-center gap-1 transition-all"
      >
        Baca Selengkapnya
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
))}

          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Hubungi <span className="text-[#EC008C]">Kami</span>
            </h2>
            <p className="text-xl text-gray-300">
              Kami siap membantu Anda dengan informasi produk, franchise, atau kerjasama
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                {
                  icon: "📍",
                  title: "Alamat",
                  content: ["Jl. Soekarno Hatta No. 123", "Malang, Jawa Timur 65141"],
                  color: "from-[#EC008C] to-[#C4007A]"
                },
                {
                  icon: "📧",
                  title: "Email",
                  content: ["info@mie-gacoan.com", "franchise@mie-gacoan.com"],
                  color: "from-[#00B4D8] to-[#0096B8]"
                },
                {
                  icon: "📱",
                  title: "Telepon",
                  content: ["+62 812-3456-7890", "+62 341-567890"],
                  color: "from-[#8B2C7E] to-[#6B1F5E]"
                },
                {
                  icon: "💬",
                  title: "Social Media",
                  content: ["Instagram: @mie.gacoan", "TikTok: @miegacoan", "Facebook: Mie Gacoan Official"],
                  color: "from-[#FF6B6B] to-[#D54D4D]"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl 
                    flex items-center justify-center text-2xl shadow-lg`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-2">{item.title}</h4>
                    {item.content.map((line, i) => (
                      <p key={i} className="text-gray-300">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-black mb-6">Kirim Pesan</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl 
                    focus:outline-none focus:ring-2 focus:ring-[#EC008C] focus:border-transparent 
                    transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl 
                    focus:outline-none focus:ring-2 focus:ring-[#EC008C] focus:border-transparent 
                    transition-all"
                />
                <input
                  type="tel"
                  placeholder="Nomor Telepon"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl 
                    focus:outline-none focus:ring-2 focus:ring-[#EC008C] focus:border-transparent 
                    transition-all"
                />
                <textarea
                  placeholder="Pesan Anda"
                  rows="5"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl 
                    focus:outline-none focus:ring-2 focus:ring-[#EC008C] focus:border-transparent 
                    transition-all resize-none"
                ></textarea>
                <button className="w-full bg-gradient-to-r from-[#EC008C] to-[#00B4D8] text-white 
                  py-4 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 
                  transition-all duration-300">
                  Kirim Pesan →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">🍜</span>
                <span className="text-3xl font-black text-white">Mie Gacoan</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Brand kuliner mie pedas terpercaya sejak 2016 dengan 500+ outlet di seluruh Indonesia.
              </p>
              <div className="flex gap-3">
                {['facebook', 'instagram', 'twitter', 'tiktok'].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
                      hover:bg-[#EC008C] transition-all duration-300"
                  >
                    <span className="text-xs">📱</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black text-white text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['About', 'Products', 'Gallery', 'Contact'].map((link, idx) => (
                  <li key={idx}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`}
                      className="hover:text-[#EC008C] transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-[#EC008C] group-hover:w-4 transition-all duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black text-white text-lg mb-6">Layanan</h4>
              <ul className="space-y-3">
                {['Franchise', 'Karir', 'Partnership', 'Investor'].map((service, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:text-[#EC008C] transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-[#EC008C] group-hover:w-4 transition-all duration-300"></span>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-black text-white text-lg mb-6">Newsletter</h4>
              <p className="text-sm mb-4 text-gray-400">
                Dapatkan update terbaru dari kami
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-[#EC008C] transition-all"
                />
                <button className="bg-gradient-to-r from-[#EC008C] to-[#00B4D8] px-6 py-3 rounded-xl 
                  font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Mie Gacoan - PT Pesta Pora Abadi. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-[#EC008C] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#EC008C] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}