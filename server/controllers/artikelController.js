import db from "../db.connection.js";

export const getAllArtikel = (req, res) => {
    const sql = "SELECT * FROM articles";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("ERROR DB:", err);
            return res.status(500).json({
                message: "Gagal mengambil data artikel",
                error: err.message
            });
        };
        res.json(results);
    });
};