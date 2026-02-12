import express from "express";
import {
  getAllArtikel,
  createArtikel,
  updateArtikel,
  deleteArtikel,
  getArtikelBySlug,
} from "../controllers/artikelController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAllArtikel);

// ⬇⬇ INI WAJIB
router.post("/", upload.single("thumbnail"), createArtikel);
router.put("/:id", upload.single("thumbnail"), updateArtikel);
router.delete("/:id", deleteArtikel);
router.get("/slug/:slug", getArtikelBySlug);

export default router;