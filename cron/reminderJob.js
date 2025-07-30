const cron = require("node-cron");
const Payment = require("../models/Payment");
const User = require("../models/User");
const dayjs = require("dayjs");
const sendMail = require("../utils/mailer");

const reminderJob = cron.schedule("0 8 * * *", async () => {
  console.log("📬 Running daily reminder job...");
  const payments = await Payment.find({ status: "pending" }).populate("user");
  const today = dayjs().startOf("day");

  for (let payment of payments) {
    const deadline = dayjs(payment.deadline).startOf("day");
    const diff = deadline.diff(today, "day");

    if (diff === 2 || diff === 0 || diff < 0) {
      let message;
      if (diff === 2)
        message = `Upcoming Payment: ${payment.name} is due in 2 days.`;
      else if (diff === 0) message = `Reminder: ${payment.name} is due today!`;
      else {
        message = `Alert: ${payment.name} is overdue!`;
        payment.status = "overdue";
        await payment.save();
      }

      await sendMail(payment.user.email, "Payment Reminder", message);
    }
  }
});

module.exports = reminderJob;
