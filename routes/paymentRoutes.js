const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createPayment,
  getPayments,
  updateStatus,
  deletePayment,
} = require("../controllers/paymentController");

router.post("/", auth, createPayment);
router.get("/", auth, getPayments);
router.patch("/:id/status", auth, updateStatus);
router.delete("/:id", auth, deletePayment);

module.exports = router;
