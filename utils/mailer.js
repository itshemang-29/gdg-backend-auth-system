const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendMail = async (to, subject, message) => {
  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #333;">${subject}</h2>
        <p style="font-size: 16px;">${message}</p>
        <br>
        <p style="font-size: 14px; color: gray;">This is an automated reminder from your Payment Reminder System.</p>
      </div>
    `
  });
};

module.exports = sendMail;
