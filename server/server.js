import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import produkRoutes from "./routes/produkRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ROUTE PRODUK
app.use("/api/produk", produkRoutes);

// jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
