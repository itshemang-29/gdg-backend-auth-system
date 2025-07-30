const Payment = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { amount, description, status } = req.body;

    if (!amount || !description) {
      return res.status(400).json({ message: "Amount and description are required" });
    }

    const payment = new Payment({ amount, description, status, user: req.userId });
    await payment.save();

    res.status(201).json(payment);
  } catch (error) {
    console.error("❌ Payment creation error:", error.message);
    res.status(500).json({ message: "Failed to create payment", error: error.message });
  }
};

// Get all payments for the authenticated user
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.userId });
    res.status(200).json(payments);
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch payments", error: error.message });
  }
};

// Update the status of a specific payment
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const payment = await Payment.findOneAndUpdate(
      { _id: id, user: req.userId }, // ensure user owns the payment
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found or unauthorized" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("❌ Status update error:", error.message);
    res.status(500).json({ message: "Failed to update payment", error: error.message });
  }
};

// Delete a payment by ID
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findOneAndDelete({ _id: id, user: req.userId });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found or unauthorized" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("❌ Deletion error:", error.message);
    res.status(500).json({ message: "Failed to delete payment", error: error.message });
  }
};
