
# 💸 Payment Reminder System – GDG Backend Assignment

This project is a **Payment Reminder System** built for the GDG Web Dev Recruitment Backend Task. It allows users to manage their payment deadlines and receive automated email reminders.

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: OTP via Email + JWT Tokens
- **Email Integration**: Nodemailer
- **Cron Jobs**: node-cron for scheduled email notifications

---`

## 🔐 Features

### 1. User Authentication
- Email-based registration
- OTP verification via email (no passwords)
- Login using OTP
- JWT token generation for secure access

### 2. Payment Management (CRUD)
- Create, Read, Update (status), Delete Payments
- Each payment includes:
  - Name
  - Description
  - Amount
  - Category (bills/subscription/loan/tax/other)
  - Deadline
  - Status (pending/paid/overdue/cancelled)

### 3. Automated Email Notification System
- Daily cron job runs at 8AM:
  - Sends reminders **2 days before deadline**
  - Sends reminder **on deadline**
  - Sends **overdue alert** and updates payment status
- HTML-formatted professional email templates

---

## 📂 Folder Structure

```
├── server.js
├── .env
├── models/
│   ├── User.js
│   └── Payment.js
├── controllers/
│   ├── authController.js
│   └── paymentController.js
├── routes/
│   ├── authRoutes.js
│   └── paymentRoutes.js
├── middleware/
│   └── authMiddleware.js
├── utils/
│   └── mailer.js
├── cron/
│   └── reminderJob.js
```

---

## 🔧 Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-username/gdg-backend-reminder.git
cd gdg-backend-reminder
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure `.env` file**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

4. **Run the server**
```bash
npm start
```

---

## 🔐 API Endpoints

### 🧾 Auth Routes
| Method | Route             | Description           |
|--------|------------------|-----------------------|
| POST   | /api/auth/register | Register user & send OTP |
| POST   | /api/auth/verify   | Verify OTP & get token   |

### 💳 Payment Routes _(JWT protected)_
| Method | Route                      | Description                  |
|--------|----------------------------|------------------------------|
| POST   | /api/payments              | Create new payment           |
| GET    | /api/payments              | Get all user payments        |
| PATCH  | /api/payments/:id/status   | Update payment status        |
| DELETE | /api/payments/:id          | Delete a payment             |

**Use `Authorization: Bearer <token>` header for protected routes.**

---

## 🛠️ Tools Used

- [Nodemailer](https://nodemailer.com/about/)
- [node-cron](https://www.npmjs.com/package/node-cron)
- [Day.js](https://day.js.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 📬 Email Preview

Example of a daily reminder email:
```
Subject: Upcoming Payment: Electricity Bill
Amount: ₹1800
Deadline: August 2, 2025
Status: Pending
```

---

## 🎯 Submission Notes

- ✅ All core features completed
- ✅ APIs tested with Postman
- ✅ Clean code structure
- ✅ Bonus: Professional HTML emails and cron automation

---


---
❗ Note: Update and delete routes for payments were implemented but currently not functioning as expected. Due to limited time, I prioritized core features like registration, OTP auth, JWT protection, and payment creation, which are working perfectly.

---
## ✨ Author

**Hemang Jain**  
_GDG Web Dev Recruitment — Backend Track_
