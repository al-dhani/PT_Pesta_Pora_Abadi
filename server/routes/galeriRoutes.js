import express from "express";
import { getAllGaleri } from "../controllers/galeriController.js";

const router = express.Router();

router.get("/", getAllGaleri);

export default router;