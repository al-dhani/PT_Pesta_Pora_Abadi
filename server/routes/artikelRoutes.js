import express from "express";
import { getAllArtikel } from "../controllers/artikelController.js";

const router = express.Router();

router.get("/", getAllArtikel);

export default router;