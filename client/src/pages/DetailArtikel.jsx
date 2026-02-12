import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailArtikel() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/artikel/slug/${slug}`)
      .then(res => res.json())
      .then(data => {
        setArtikel(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return <h1 className="text-center mt-40 text-xl">Loading...</h1>;

  if (!artikel || artikel.message)
    return (
      <h1 className="text-center mt-40 text-xl">
        Artikel tidak ditemukan
      </h1>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* 🔥 BUTTON BACK */}
        <button
          onClick={() => navigate("/#artikel")}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
        >
          ← Kembali ke Artikel
        </button>

        {artikel.thumbnail && (
          <img
            src={`http://localhost:5000/images/artikel/${artikel.thumbnail}`}
            alt={artikel.judul}
            className="w-full h-72 object-cover rounded-xl mb-6"
          />
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {artikel.judul}
        </h1>

        <p className="text-gray-500 text-sm mb-8">
          By <span className="font-medium">{artikel.penulis}</span> •{" "}
          {artikel.created_at?.slice(0, 10)}
        </p>

        <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {artikel.isi}
        </div>
      </div>
    </div>
  );
}