import db from "../db/connection.js";

export const getAllGaleri = (req, res) => {
    const sql = "SELECT * FROM gallery";

    db.query(sql, (err, results) => {
        if(err) {
            console.error("ERROR DB:", err);
            return res.status(500).json({
                message: "Gagal mengambil data galeri",
                error: err.message
            });
        };
        res.json(results);
    });
};