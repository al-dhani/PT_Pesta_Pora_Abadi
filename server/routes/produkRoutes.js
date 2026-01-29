import express from "express";
import {
  getAllProduk,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controllers/produkController.js";

const router = express.Router();

// READ
router.get("/", getAllProduk);

// CREATE
router.post("/", createProduk);

// UPDATE
router.put("/:id", updateProduk);

// DELETE
router.delete("/:id", deleteProduk);

export default router;
