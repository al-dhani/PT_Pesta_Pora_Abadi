import db from "../db/connection.js";

export const getAllProduk = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal mengambil data produk",
        error: err.message
      });
    }
    res.json(results);
  });
};

