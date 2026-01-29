import { useState, useEffect } from 'react';

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


  // Data dummy untuk artikel (nanti diambil dari database)
  const articles = [
    { id: 1, title: "Tips Menikmati Mie Pedas Level 10", date: "22 Jan 2026", category: "Tips", image: "📝" },
    { id: 2, title: "Resep Rahasia Bumbu Mie Gacoan", date: "20 Jan 2026", category: "Resep", image: "📝" },
    { id: 3, title: "Franchise Mie Gacoan: Peluang Bisnis 2026", date: "18 Jan 2026", category: "Bisnis", image: "📝" }
  ];

  // Data dummy untuk event (nanti diambil dari database)
  const events = [
    { id: 1, title: "Grand Opening Cabang Baru", date: "15 Feb 2026", location: "Jakarta Selatan", image: "🎉" },
    { id: 2, title: "Workshop Barista Training", date: "20 Feb 2026", location: "Head Office", image: "☕" },
    { id: 3, title: "Mie Gacoan Festival 2026", date: "1 Mar 2026", location: "Surabaya", image: "🎪" }
  ];

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


  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* HERO SECTION - COVER DEPAN */}
      <section
  id="home"
  className="relative text-white py-36 bg-cover bg-top"
  style={{
    backgroundImage: "url('/images/hero-bg.png')",
  }}
>
        {/* overlay */}
        <div className="absolute inset-0 bg-black opacity-25"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            
            {/* Nama Perusahaan */}
            <span className="inline-block mb-4 px-5 py-2 rounded-full bg-white/20 text-sm tracking-wide">
              Company Profile • PT Pesta Pora Abadi
            </span>

            {/* Judul Utama */}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Mie Gacoan <br />
              <span className="text-pink-200">
                Pedasnya Juara, Harganya Bersahabat
              </span>
            </h1>

            {/* Deskripsi */}
            <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-xl">
              PT Pesta Pora Abadi menghadirkan Mie Gacoan sebagai brand kuliner
              mie pedas modern dengan cita rasa khas, harga terjangkau,
              dan pengalaman bersantap yang berkesan di seluruh Indonesia.
            </p>

            {/* CTA */}
            <div 
            className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  document.getElementById("products")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="bg-white text-[#EC008C] px-8 py-3 rounded-full 
                font-semibold hover:bg-gray-100 transition"
              >
                Lihat Produk
              </button>
              <button
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="border-2 border-white text-white px-8 py-3 rounded-full 
                font-semibold hover:bg-white hover:text-[#EC008C] transition"
              >
                Tentang Kami
              </button>
            </div>
          </div>
        </div>

  {/* Wave bawah */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z"
        fill="#F9FAFB"
      />
    </svg>
  </div>
</section>


      {/* ABOUT US / TENTANG KAMI */}
      <section id="about" className="py-16 bg-gradient-to-b from-white to-[#FDEAF3]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">We Can Create With The Acme Solution</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mengenal lebih dekat tentang perjalanan kami dalam menghadirkan kelezatan mie pedas untuk Indonesia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-[#EC008C]">Tentang Kami</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Mie Gacoan</strong> merupakan brand kuliner di bawah naungan <strong>PT Pesta Pora Abadi</strong> yang 
                didirikan pada tahun 2016 di Malang, Jawa Timur. Kami menghadirkan konsep mie pedas modern dengan 
                harga terjangkau yang menyasar generasi muda Indonesia.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Berawal dari satu outlet kecil di Malang, kini Mie Gacoan telah berkembang menjadi salah satu brand 
                kuliner terbesar di Indonesia dengan lebih dari 500+ outlet yang tersebar di berbagai kota.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Kami bergerak di <strong>bidang kuliner</strong>, khususnya menyediakan berbagai varian mie pedas, 
                dimsum, minuman, dan menu pendamping lainnya dengan konsep casual dining yang kekinian.
              </p>
              <div className="flex space-x-4 pt-4">
                <div className="bg-[#EC008C] text-white p-4 rounded-lg text-center flex-1">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm">Outlets</div>
                </div>
                <div className="bg-[#00B4D8] text-white p-4 rounded-lg text-center flex-1">
                  <div className="text-3xl font-bold">8</div>
                  <div className="text-sm">Years</div>
                </div>
                <div className="bg-[#8B2C7E] text-white p-4 rounded-lg text-center flex-1">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm">Employees</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#EC008C] to-[#00B4D8] p-8 rounded-2xl text-white">
              <h4 className="text-2xl font-bold mb-6">Sejarah Singkat</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-white text-[#EC008C] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-semibold">2016</div>
                    <div className="text-sm text-gray-100">Pembukaan outlet pertama di Malang</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white text-[#EC008C] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-semibold">2018</div>
                    <div className="text-sm text-gray-100">Ekspansi ke kota-kota besar Jawa Timur</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white text-[#EC008C] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-semibold">2020</div>
                    <div className="text-sm text-gray-100">Mencapai 100+ outlet se-Indonesia</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white text-[#EC008C] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-semibold">2024</div>
                    <div className="text-sm text-gray-100">Meraih 500+ outlet dan terus berkembang</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section id="visimisi" className="py-16 bg-[#F1F8FC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Visi & Misi</h2>
            <p className="text-gray-600">Target dan arah pengembangan Mie Gacoan</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#EC008C]">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-[#EC008C] mb-4">Visi</h3>
              <p className="text-gray-700 leading-relaxed">
                Menjadi brand mie pedas nomor satu pilihan masyarakat Indonesia yang dikenal dengan 
                kualitas terbaik, harga terjangkau, dan pelayanan yang memuaskan di setiap outlet kami.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#00B4D8]">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-[#00B4D8] mb-4">Misi</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  <span>Menyajikan produk mie berkualitas tinggi dengan harga yang terjangkau untuk semua kalangan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  <span>Menciptakan lapangan kerja dan memberdayakan generasi muda Indonesia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  <span>Mengembangkan inovasi menu yang sesuai dengan selera pasar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  <span>Memberikan pengalaman dining yang menyenangkan dan berkesan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE, PENGALAMAN & KELEBIHAN */}
      <section id="profile" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">We Solve IT Problems With Technology</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Keunggulan dan pengalaman kami dalam melayani pelanggan
            </p>
          </div>

          {/* Kelebihan Perusahaan */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-[#EC008C] to-[#d0007a] text-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="font-bold text-lg mb-2">Harga Terjangkau</h4>
              <p className="text-sm text-gray-100">Mulai dari Rp 5.000 hingga Rp 20.000</p>
            </div>
            <div className="bg-gradient-to-br from-[#00B4D8] to-[#0096b8] text-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-bold text-lg mb-2">Pelayanan Cepat</h4>
              <p className="text-sm text-gray-100">Pesanan siap dalam 5-10 menit</p>
            </div>
            <div className="bg-gradient-to-br from-[#8B2C7E] to-[#6b1f5e] text-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h4 className="font-bold text-lg mb-2">Kualitas Terjamin</h4>
              <p className="text-sm text-gray-100">Bahan baku pilihan & higienis</p>
            </div>
            <div className="bg-gradient-to-br from-[#FF6B6B] to-[#d54d4d] text-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🏪</div>
              <h4 className="font-bold text-lg mb-2">Outlet Nyaman</h4>
              <p className="text-sm text-gray-100">Suasana kekinian & instagramable</p>
            </div>
          </div>

          {/* Standard Work Process */}
          <div className="bg-gray-50 p-10 rounded-2xl">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Standard Work Process</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">📋</span>
                </div>
                <h4 className="font-bold mb-2">Project Planning</h4>
                <p className="text-sm text-gray-600">Perencanaan menu & strategi outlet</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
                <h4 className="font-bold mb-2">Research Analysis</h4>
                <p className="text-sm text-gray-600">Riset bahan baku & resep terbaik</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-bold mb-2">Creative Design</h4>
                <p className="text-sm text-gray-600">Desain outlet & branding menarik</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <h4 className="font-bold mb-2">Approved System</h4>
                <p className="text-sm text-gray-600">Quality control & pelayanan prima</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STATS SECTION */}
<section className="py-16 bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Mie Gacoan dalam Angka</h2>
      <p className="text-gray-300">
        Merek mie pedas favorit dengan ribuan pelanggan di seluruh Indonesia
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      <div className="text-center">
        <div className="text-4xl font-bold text-[#00B4D8]">300+</div>
        <div className="text-sm text-gray-300 mt-2">Outlet di Indonesia</div>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold text-[#EC008C]">50+</div>
        <div className="text-sm text-gray-300 mt-2">Kota Tersedia</div>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold text-[#FFD700]">2016</div>
        <div className="text-sm text-gray-300 mt-2">Tahun Berdiri</div>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold text-[#4CAF50]">10M+</div>
        <div className="text-sm text-gray-300 mt-2">Pelanggan Puas</div>
      </div>
    </div>

   {/* Menu Highlight */}
<div className="text-center mb-8">
  <h3 className="text-3xl font-bold mb-4">Menu Favorit Pelanggan</h3>
  <p className="text-gray-300">
    Beberapa menu andalan yang paling sering dipesan pelanggan
  </p>
</div>

<div className="grid md:grid-cols-4 gap-6">
  {menuFavorites.map((menu, index) => (
    <div
      key={index}
      className="bg-gradient-to-br from-[#1a2332] to-[#2d3e50] p-6 rounded-xl text-center hover:transform hover:scale-105 transition"
    >
      <img
        src={menu.image}
        alt={menu.name}
        className="w-24 h-24 mx-auto mb-4 object-contain"
      />
      <h4 className="font-bold text-lg mb-1">{menu.name}</h4>
      <p className="text-gray-300 text-sm">{menu.description}</p>
    </div>
  ))}
</div>
  </div>
</section>

      {/* PRODUK/JASA - dari database */}
      <section
        id="products"
        className="py-16 bg-gradient-to-br from-[#FDEAF3] via-white to-[#E6F7FB]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Produk Kami
            </h2>
            <p className="text-gray-600">
              Menu unggulan yang kami tawarkan
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {displayedProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition group"
              >
                {/* IMAGE */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.nama_produk}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div className="text-xs text-[#00B4D8] font-semibold mb-2 capitalize">
                    {product.tipe}
                  </div>

                  <h3 className="font-bold text-lg mb-2">
                    {product.nama_produk}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span className="text-[#EC008C] font-bold text-xl">
                      Rp {product.harga}
                    </span>

                    <button className="bg-[#EC008C] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#d0007a] transition">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LIHAT SEMUA */}
          {products.length > 4 && (
        <div className="text-center mt-10">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="bg-[#00B4D8] text-white px-8 py-3 rounded-full hover:bg-[#0096b8] transition"
            >
              Lihat Semua Produk
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-300 transition"
            >
              Tampilkan Lebih Sedikit
            </button>
          )}
        </div>
          )}
        </div>
      </section>

      {/* DON'T WAIT CTA */}
<section className="py-16 bg-gradient-to-r from-[#00B4D8] to-[#0096b8] text-white">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="mb-6 md:mb-0">
        <h3 className="text-3xl font-bold mb-2">
          Rasakan Sensasi Pedas Favoritmu
        </h3>
        <p className="text-gray-100">
          Mie Gacoan siap menemani momen makanmu bersama teman dan keluarga.
        </p>
            </div>
              <div className="flex space-x-4">
                <a
                href="https://www.antaranews.com/berita/4195941/lokasi-mie-gacoan-di-berbagai-daerah-ini-daftar-dan-jam-operasinya"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#00B4D8] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Lihat Lokasi Outlet
              </a>


                <a
                  href="#products"
                  className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#00B4D8] transition"
                >
                  Lihat Menu
                </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* GALLERY FOTO */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">

          {/* HEADER */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Galeri Outlet Mie Gacoan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dokumentasi suasana outlet, menu favorit, dan momen kebersamaan pelanggan
              di berbagai cabang Mie Gacoan di Indonesia.
            </p>
          </div>

          {/* GRID FOTO */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galeri.map(item => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg bg-white"
              >
                <img
                  src={item.file_gambar}
                  alt={item.judul}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 group-hover:opacity-100 transition">
                  <h4 className="font-bold text-lg">{item.judul}</h4>
                  {item.deskripsi && (
                    <p className="text-sm text-gray-200 mt-1">
                      {item.deskripsi}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="text-center mt-14">
            <button className="bg-[#EC008C] text-white px-8 py-3 rounded-full hover:bg-[#d0007a] transition">
                    Lihat Lebih Banyak
                  </button>
          </div>

        </div>
      </section>

      {/* DAFTAR Partners - dari database */}
      <section id="partners" className="py-16 bg-[#F7F2FA]">
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Partner Kami
            </h2>
            <p className="text-gray-600">
              Dipercaya oleh berbagai brand
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
  {partners.map(partner => (
    <div
      key={partner.id}
      className="bg-white px-10 py-12 rounded-3xl 
                 shadow-xl flex flex-col items-center justify-center
                 hover:shadow-2xl hover:-translate-y-3 
                 transition duration-300"
    >
      <div className="w-full h-36 flex items-center justify-center mb-6">
        <img
          src={partner.logo}
          alt={partner.nama}
          className="max-h-32 object-contain"
        />
      </div>

      <p className="font-bold text-xl text-gray-800 text-center">
        {partner.nama}
      </p>
    </div>
  ))}
</div>
  </div>
</section>


      {/* TESTIMONIAL */}
      <section className="py-16 bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">People Who Already Love Us</h2>
            <p className="text-gray-300">Apa kata pelanggan tentang kami</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">👨‍💼</div>
                <div>
                  <h4 className="font-bold">Andi Setiawan</h4>
                  <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Mie Gacoan adalah tempat favorit saya! Harga terjangkau, rasa enak, 
                dan pelayanannya cepat. Level 7 adalah pilihan terbaik!"
              </p>
            </div>

            <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">👩</div>
                <div>
                  <h4 className="font-bold">Sinta Dewi</h4>
                  <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Outlet nya nyaman banget, cocok buat nongkrong sama teman. 
                Dimsum nya juga enak, jadi selalu pesan paket komplit!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARTIKEL - dari database */}
      <section id="artikel" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Checkout Our Latest</h2>
              <h3 className="text-3xl font-bold text-[#EC008C]">News & Articles</h3>
            </div>
            <button className="bg-[#00B4D8] text-white px-6 py-2 rounded-full hover:bg-[#0096b8] transition">
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map(article => (
              <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
                <div className="bg-gradient-to-br from-[#EC008C] to-[#8B2C7E] h-48 flex items-center justify-center text-9xl group-hover:scale-110 transition">
                  {article.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span className="bg-[#00B4D8] text-white px-3 py-1 rounded-full text-xs">
                      {article.category}
                    </span>
                    <span>📅 {article.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 line-clamp-2">{article.title}</h3>
                  <button className="text-[#EC008C] font-semibold hover:underline">
                    Baca Selengkapnya →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT - dari database */}
      <section id="event" className="py-16 bg-gradient-to-b from-[#E6F7FB] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Event & Kegiatan</h2>
            <p className="text-gray-600">Ikuti berbagai event menarik dari Mie Gacoan</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition">
                <div className="bg-gradient-to-br from-[#00B4D8] to-[#0096b8] h-40 flex items-center justify-center text-8xl">
                  {event.image}
                </div>
                <div className="p-6">
                  <div className="bg-[#EC008C] text-white inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {event.date}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">📍 {event.location}</p>
                  <button className="w-full bg-gradient-to-r from-[#EC008C] to-[#00B4D8] text-white py-2 rounded-lg hover:opacity-90 transition">
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAK KAMI */}
      <section id="contact" className="py-16 bg-gradient-to-br from-[#2C3E50] to-[#34495E] text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Kontak Kami</h2>
              <p className="text-gray-300 mb-8">
                Hubungi kami untuk informasi lebih lanjut tentang produk, 
                franchise, atau kerjasama bisnis.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#EC008C] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Alamat</h4>
                    <p className="text-gray-300">
                      Jl. Soekarno Hatta No. 123<br />
                      Malang, Jawa Timur 65141
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#00B4D8] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    📧
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-gray-300">info@mie-gacoan.com</p>
                    <p className="text-gray-300">franchise@mie-gacoan.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#8B2C7E] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    📱
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Telepon</h4>
                    <p className="text-gray-300">+62 812-3456-7890</p>
                    <p className="text-gray-300">+62 341-567890</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#FF6B6B] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Social Media</h4>
                    <p className="text-gray-300">Instagram: @mie.gacoan</p>
                    <p className="text-gray-300">TikTok: @miegacoan</p>
                    <p className="text-gray-300">Facebook: Mie Gacoan Official</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Nama Lengkap" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC008C]"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC008C]"
                />
                <input 
                  type="tel" 
                  placeholder="Nomor Telepon" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC008C]"
                />
                <textarea 
                  placeholder="Pesan Anda" 
                  rows="4" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC008C]"
                ></textarea>
                <button className="w-full bg-gradient-to-r from-[#EC008C] to-[#00B4D8] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-4xl">🍜</span>
                <span className="text-2xl font-bold text-white">Mie Gacoan</span>
              </div>
              <p className="text-sm text-gray-400">
                Brand kuliner mie pedas terpercaya sejak 2016 dengan 500+ outlet di seluruh Indonesia.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-[#EC008C] transition">Tentang Kami</a></li>
                <li><a href="#products" className="hover:text-[#EC008C] transition">Produk</a></li>
                <li><a href="#gallery" className="hover:text-[#EC008C] transition">Gallery</a></li>
                <li><a href="#contact" className="hover:text-[#EC008C] transition">Kontak</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#EC008C] transition">Franchise</a></li>
                <li><a href="#" className="hover:text-[#EC008C] transition">Karir</a></li>
                <li><a href="#" className="hover:text-[#EC008C] transition">Partnership</a></li>
                <li><a href="#" className="hover:text-[#EC008C] transition">Investor</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Newsletter</h4>
              <p className="text-sm mb-4">Dapatkan update terbaru dari kami</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email Anda" 
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                />
                <button className="bg-[#EC008C] px-4 py-2 rounded-r-lg hover:bg-[#d0007a] transition">
                  ➤
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2026 Mie Gacoan - PT Pesta Pora Abadi. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#EC008C] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[#EC008C] transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}