import express from "express";
import { getAllKlien } from "../controllers/klienController.js";

const router = express.Router();

router.get("/", getAllKlien);

export default router;