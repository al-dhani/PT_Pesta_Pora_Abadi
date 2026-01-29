import db from "../db/connection.js";

/* =====================
   GET ALL PRODUK
===================== */
export const getAllProduk = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal mengambil data produk",
      });
    }
    res.json(results);
  });
};

/* =====================
   CREATE PRODUK
===================== */
export const createProduk = (req, res) => {
  const { nama_produk, tipe, harga } = req.body;

  if (!nama_produk || !tipe || !harga) {
    return res.status(400).json({
      message: "Data produk tidak lengkap",
    });
  }

  const sql =
    "INSERT INTO products (nama_produk, tipe, harga) VALUES (?, ?, ?)";

  db.query(sql, [nama_produk, tipe, harga], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menambah produk",
      });
    }

    res.json({
      message: "Produk berhasil ditambahkan",
      id: result.insertId,
    });
  });
};

/* =====================
   UPDATE PRODUK
===================== */
export const updateProduk = (req, res) => {
  const { id } = req.params;
  const { nama_produk, tipe, harga, image } = req.body;

  const sql =
    "UPDATE products SET nama_produk=?, tipe=?, harga=?, image=? WHERE id=?";

  db.query(sql, [nama_produk, tipe, harga, image, id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal update produk",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    res.json({ message: "Produk berhasil diupdate" });
  });
};

/* =====================
   DELETE PRODUK
===================== */
export const deleteProduk = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menghapus produk",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    res.json({ message: "Produk berhasil dihapus" });
  });
};
