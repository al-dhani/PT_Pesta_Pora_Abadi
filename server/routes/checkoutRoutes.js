import express from "express";
import midtransClient from "midtrans-client";
import db from "../db/connection.js";

const router = express.Router();

const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});
router.post("/", async (req, res) => {
  console.log("🔥 CHECKOUT ENDPOINT HIT");
  console.log("📦 Request body:", req.body);
  
  try {
    const { orderId, grossAmount, productId, quantity, customer } = req.body; // ✅ ambil quantity

    if (!orderId || !grossAmount || !customer) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ error: "Invalid request data" });
    }

    if (!productId) {
      console.error("❌ Product ID is missing");
      return res.status(400).json({ error: "Product ID is required" });
    }

    const qty = quantity || 1; // ✅ default ke 1 kalau tidak ada
    console.log("✅ Validation passed, inserting order...");

    // 1️⃣ INSERT ORDER dengan quantity
    const orderResult = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO orders (product_id, quantity, price, order_code) VALUES (?, ?, ?, ?)",
        [productId, qty, grossAmount, orderId], // ✅ tambahkan qty
        (err, result) => {
          if (err) {
            console.error("❌ INSERT ORDER ERROR:", err);
            reject(err);
          } else {
            console.log("✅ ORDER INSERTED, ID:", result.insertId);
            resolve(result);
          }
        }
      );
    });

    const orderDbId = orderResult.insertId;
    console.log("✅ Order DB ID:", orderDbId);
    console.log("📝 Inserting payment with order_code:", orderId);

    // 2️⃣ INSERT PAYMENT dengan quantity
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO payments 
        (order_id, quantity, order_code, customer_name, customer_email, gateway, method, amount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderDbId,
          qty, // ✅ tambahkan qty
          orderId,
          customer.firstName + " " + customer.lastName,
          customer.email,
          "midtrans",
          "snap",
          grossAmount,
        ],
        (err, result) => {
          if (err) {
            console.error("❌ INSERT PAYMENT ERROR:", err);
            reject(err);
          } else {
            console.log("✅ PAYMENT INSERTED, ID:", result.insertId);
            resolve(result);
          }
        }
      );
    });

    console.log("💳 Creating Midtrans transaction...");

    // 3️⃣ MIDTRANS
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    console.log("✅ Midtrans token created:", transaction.token);

    res.json({ token: transaction.token });

  } catch (err) {
    console.error("💥 ERROR CHECKOUT:", err);
    console.error("💥 Error stack:", err.stack);
    res.status(500).json({ 
      error: "Failed to create transaction",
      details: err.message
    });
  }
});

export default router;