import express from "express";
import {
  getAllEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// READ
router.get("/", getAllEvent);

// CREATE (WAJIB)
router.post("/", upload.single("gambar"), createEvent);

// UPDATE (BOLEH GANTI GAMBAR / ENGGA)
router.put("/:id", upload.single("gambar"), updateEvent);

// DELETE
router.delete("/:id", deleteEvent);

export default router;