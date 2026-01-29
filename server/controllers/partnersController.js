import db from "../db/connection.js";

/* =====================
   GET ALL PARTNERS
===================== */
export const getAllPartners = (req, res) => {
  const sql = "SELECT * FROM partners ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal ambil data partners" });
    }
    res.json(results);
  });
};

/* =====================
   CREATE PARTNER
===================== */
export const createPartner = (req, res) => {
  const { nama, logo } = req.body;

  if (!nama || !logo) {
    return res.status(400).json({ message: "Nama & logo wajib diisi" });
  }

  const sql = "INSERT INTO partners (nama, logo) VALUES (?, ?)";

  db.query(sql, [nama, logo], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal tambah partner" });
    }

    res.json({
      message: "Partner berhasil ditambahkan",
      id: result.insertId,
    });
  });
};

/* =====================
   UPDATE PARTNER
===================== */
export const updatePartner = (req, res) => {
  const { id } = req.params;
  const { nama, logo } = req.body;

  const sql =
    "UPDATE partners SET nama = ?, logo = ? WHERE id = ?";

  db.query(sql, [nama, logo, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update partner" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Partner tidak ditemukan" });
    }

    res.json({ message: "Partner berhasil diupdate" });
  });
};

/* =====================
   DELETE PARTNER
===================== */
export const deletePartner = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM partners WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal hapus partner" });
    }

    res.json({ message: "Partner berhasil dihapus" });
  });
};
