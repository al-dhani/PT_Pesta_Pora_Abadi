import express from "express";
import { getAllProduk } from "../controllers/produkController.js";

const router = express.Router();

router.get("/", getAllProduk);

export default router;
