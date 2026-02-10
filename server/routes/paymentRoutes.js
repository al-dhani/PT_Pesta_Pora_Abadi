  import express from "express";
  import {
    createTransaction,
    midtransWebhook,
    getAllTransactions,
    getTransactionStats,
  } from "../controllers/paymentController.js";

  const router = express.Router();

  router.post("/checkout", createTransaction);
  router.post("/midtrans", midtransWebhook);

  router.get("/transactions", getAllTransactions);
  router.get("/transactions/stats", getTransactionStats);

  export default router;