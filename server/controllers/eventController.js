import db from "../db/connection.js";

export const getAllEvent = (req, res) => {
    const sql = "SELECT * FROM events";

db.query(sql, (err, results) => {
    if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({
            message: "Gagal mengambil data event",
            error: err.message
        });
    }
    res.json(results);
});
};