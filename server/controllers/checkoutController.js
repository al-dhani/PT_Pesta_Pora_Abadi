import express from "express";
import midtransClient from "midtrans-client";
import db from "../db/connection.js";

const router = express.Router();

const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { orderId, grossAmount, productId, quantity, customer } = req.body;

    if (!orderId || !grossAmount || !customer || !quantity) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Hitung total price
    const totalPrice = grossAmount * quantity;

    // INSERT ORDER
    const orderResult = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO orders (product_id, price, quantity, order_code, status) VALUES (?, ?, ?, ?, ?)",
        [productId, totalPrice, quantity, orderId, "pending"], // status default pending
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    const orderDbId = orderResult.insertId;

    // INSERT PAYMENT
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO payments 
        (order_id, order_code, customer_name, customer_email, gateway, method, amount)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderDbId,
          orderId,
          customer.firstName + " " + customer.lastName,
          customer.email,
          "midtrans",
          "snap",
          totalPrice, // total price sesuai quantity
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    // MIDTRANS
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: productPrice * quantity// kirim total price ke Midtrans
      },
      customer_details: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    res.json({ token: transaction.token });
  } catch (err) {
    console.error("ERROR CHECKOUT:", err);
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

export default router;