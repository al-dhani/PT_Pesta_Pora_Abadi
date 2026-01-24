import db from "../db/connection.js";

export const getAllKlien = (req, res) => {
    const sql = "SELECT *FROM clients";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("ERROR DB:", err);
            return res.status(500).json({
                message: "Gagal mengambil data klien",
                error: err.message
            });
        }
        res.json(results);
    });
};