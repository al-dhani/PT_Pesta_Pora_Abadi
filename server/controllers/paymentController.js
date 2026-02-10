import db from "../db/connection.js";
import { snap } from "../config/midtrans.js";
import crypto from "crypto";

/* ============================
   CREATE TRANSACTION
============================ */
export const createTransaction = async (req, res) => {
  console.log("🔥 ORDER CODE YANG DIINSERT:", orderCode);
  console.log("BODY:", req.body);
  try {
    const {
      product_id,
      customer_name,
      customer_email,
      gateway,
      method,
    } = req.body; 

    // 1️⃣ Ambil produk
    const [product] = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM products WHERE id = ?",
        [product_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const orderCode = "ORDER-" + Date.now();

    // 2️⃣ Insert order
    const orderResult = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO orders (product_id, price, order_code) VALUES (?, ?, ?)",
        [product_id, product.harga, orderCode],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    const orderId = orderResult.insertId;

    // 3️⃣ Insert payment
    // 🔥 2️⃣ INSERT PAYMENT - TAMBAHKAN order_code
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO payments 
    (order_id, order_code, customer_name, customer_email, gateway, method, amount)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,  // ✅ 7 kolom sekarang
        [
          orderDbId,
          orderId,  // ✅ TAMBAHKAN INI (order_code dari frontend)
          customer.firstName + " " + customer.lastName,
          customer.email,
          "midtrans",
          "snap",
          grossAmount,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    // 4️⃣ Parameter midtrans
    const parameter = {
      transaction_details: {
        order_id: orderCode,
        gross_amount: parseInt(product.harga),
      },
      customer_details: {
        first_name: customer_name,
        email: customer_email,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    res.json({
      snap_token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
};

/* ============================
   MIDTRANS WEBHOOK
============================ */
export const midtransWebhook = async (req, res) => {
  try {
    console.log("WEBHOOK MASUK 🔥");
    const notification = req.body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    const crypto = await import("crypto");

    const hash = crypto.default
      .createHash("sha512")
      .update(
        notification.order_id +
        notification.status_code +
        notification.gross_amount +
        serverKey
      )
      .digest("hex");

    if (hash !== notification.signature_key) {
      console.log("❌ Invalid signature");
      return res.status(200).json({ message: "Invalid signature ignored" });
    }

    const [order] = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM orders WHERE order_code = ?",
        [notification.order_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    if (!order) {
      console.log("Order tidak ditemukan (mungkin test notif)");
      return res.status(200).json({ message: "Order not found but OK" });
    }

    let paymentStatus = "pending";

    if (notification.transaction_status === "settlement") {
      paymentStatus = "success";
    } else if (
      notification.transaction_status === "cancel" ||
      notification.transaction_status === "deny" ||
      notification.transaction_status === "expire"
    ) {
      paymentStatus = "failed";
    }

    // update orders
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [paymentStatus, order.id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });

    // 🔥 UPDATE payments juga
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE payments SET status = ?, transaction_id = ? WHERE order_code = ?",
        [
          paymentStatus,
          notification.transaction_id,
          notification.order_id
        ],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });

    return res.status(200).json({ message: "Webhook processed" });

  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(200).json({ message: "Error handled safely" });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    let where = "WHERE 1=1";
    let params = [];

    if (status) {
      where += " AND p.status = ?";
      params.push(status);
    }

    if (search) {
      where += ` AND (
        p.customer_name LIKE ?
        OR p.customer_email LIKE ?
        OR o.order_code LIKE ?
      )`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const dataQuery = `
  SELECT 
    p.*,
    o.order_code,
    pr.nama_produk
  FROM payments p
  JOIN orders o ON o.id = p.order_id
  JOIN products pr ON pr.id = o.product_id
  ${where}
  ORDER BY p.created_at DESC
  LIMIT ? OFFSET ?
`;

    const countQuery = `
  SELECT COUNT(*) as total
  FROM payments p
  JOIN orders o ON o.id = p.order_id
  JOIN products pr ON pr.id = o.product_id
  ${where}
`;

    const data = await new Promise((resolve, reject) => {
      db.query(
        dataQuery,
        [...params, parseInt(limit), parseInt(offset)],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    const [{ total }] = await new Promise((resolve, reject) => {
      db.query(countQuery, params, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.json({
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal ambil transaksi" });
  }
};

export const getTransactionStats = async (req, res) => {
  try {
    const stats = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT
          COUNT(*) AS total,
          SUM(status = 'success') AS success,
          SUM(status = 'pending') AS pending,
          SUM(CASE WHEN status = 'success' THEN amount ELSE 0 END) AS total_revenue
        FROM payments
        `,
        (err, result) => {
          if (err) reject(err);
          resolve(result[0]);
        }
      );
    });

    res.json({ data: stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal ambil stats" });
  }
};