import express from "express";
import { getAllEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvent);

export default router;