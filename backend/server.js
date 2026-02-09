require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");
const { db } = require("./firebaseAdmin");

const app = express();
app.use(cors());
app.use(express.json());

const CASHFREE_BASE_URL = "https://sandbox.cashfree.com";

/* ---------- HELPERS ---------- */
function generateOrderId() {
  return "ORDER_" + crypto.randomBytes(6).toString("hex");
}

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("✅ Cashfree Backend Running");
});

/* ---------- PAYMENT ---------- */

app.post("/payment", async (req, res) => {
  try {
    const { amount, userId, cartItems, addressInfo } = req.body;

    if (!userId || !amount || !cartItems?.length) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const orderId = generateOrderId();

    // ✅ CREATE ORDER ONCE
    await db.collection("orders").doc(orderId).set({
      orderId,
      userId,
      cartItems,
      addressInfo,
      totalAmount: amount,
      status: "CREATED",
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      createdAt: new Date(),
    });

    // ✅ Create Cashfree order
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      {
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: userId,
          customer_phone: addressInfo.mobilenumber,
          customer_name: addressInfo.name,
          customer_email: "test@example.com",
        },
        order_meta: {
          return_url:
            `${process.env.FRONTEND_URL}/payment-success?order_id={order_id}`,
        },
      },
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2025-01-01",
        },
      }
    );

    res.json({
      orderId,
      paymentSessionId: response.data.payment_session_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment error" });
  }
});

/* ---------- VERIFY PAYMENT ---------- */

app.get("/verify", async (req, res) => {
  const { order_id } = req.query;

  try {
    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${order_id}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2025-01-01",
        },
      }
    );

    const status = response.data.order_status;

    if (status === "PAID") {
      await db.collection("orders").doc(order_id).update({
        status: "PAID",
        paidAt: new Date(),
      });
    }
    
    res.json({ order_status: status });
  } catch (error) {
    console.error("Verify error:", error.message);
    res.json({ order_status: "FAILED" });
  }
});



/* ---------- SERVER ---------- */
app.listen(process.env.PORT || 8000, () => {
  console.log("✅ Server running on http://localhost:8000");
});










