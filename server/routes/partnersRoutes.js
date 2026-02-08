import express from "express";
import {
  getAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partnersController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAllPartners);

// ⬇⬇ WAJIB, SAMA KAYAK ARTIKEL
router.post("/", upload.single("logo"), createPartner);
router.put("/:id", upload.single("logo"), updatePartner);

router.delete("/:id", deletePartner);

export default router;