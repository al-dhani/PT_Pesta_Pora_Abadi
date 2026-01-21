import Profile from "./Profile";
import Produk from "./Produk";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="bg-gradient-to-r from-[#EC008C] to-[#00B4D8] text-white p-10 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">
          Selamat Datang di Mie Gacoan
        </h2>
        <p className="max-w-2xl">
          Brand kuliner di bawah naungan PT Pesta Pora Abadi yang menghadirkan
          pengalaman makan mie pedas dengan harga terjangkau dan cita rasa khas.
        </p>
      </section>

      {/* PROFILE */}
      <section>
        <Profile preview />
      </section>

      {/* VISI MISI */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-2xl font-bold text-[#EC008C] mb-4">
          Visi & Misi
        </h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Menjadi brand mie nomor satu pilihan masyarakat Indonesia</li>
          <li>Menyajikan produk berkualitas dengan harga terjangkau</li>
          <li>Menciptakan lapangan kerja bagi generasi muda</li>
        </ul>
      </section>

      {/* PRODUK */}
      <section>
        <Produk preview />
      </section>

      {/* KONTAK */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-2xl font-bold text-[#00B4D8] mb-4">
          Kontak Kami
        </h3>
        <p>Email: info@mie-gacoan.com</p>
        <p>Instagram: @mie.gacoan</p>
      </section>

      {/* ABOUT */}
      <section className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-2xl font-bold text-[#EC008C] mb-4">
          Tentang Kami
        </h3>
        <p className="text-gray-700">
          Mie Gacoan merupakan brand kuliner yang dikenal dengan konsep mie pedas
          modern, menyasar generasi muda dengan suasana outlet yang santai dan
          kekinian.
        </p>
      </section>
    </div>
  );
}
