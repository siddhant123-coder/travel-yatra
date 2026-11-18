# ✈️ Travel Yatra — Modern Travel & Journey Planning Platform

A full-stack, luxury editorial travel platform designed to explore signature destinations, curate personalized journeys, manage travel desks, and process secure payments with automated email dispatch and database persistence.

---

## 🌟 Highlights & Features

- **🎨 Modern Luxury Editorial UI**: Fluid responsive layout inspired by modern design systems, built with React and Vite.
- **🔐 Dual Authentication**:
  - **Official Google OAuth 2.0**: Secure authentication verified server-side with `google-auth-library` and HTTP-only JWT session cookies.
  - **Quick Dev / Local Sign-In**: Instant 1-click login for quick testing without requiring Google Cloud credentials.
- **💳 Complete Secure Payment System**:
  - **Interactive Checkout Modal**: 256-bit SSL encrypted dialog.
  - **Multi-Method Support**:
    - ⚡ **UPI**: Instant UPI ID entry, Quick App buttons (Google Pay, PhonePe, Paytm, BHIM), and interactive QR code scanner.
    - 💳 **Credit / Debit Cards**: Visa, Mastercard, RuPay, and Amex with dynamic card-number formatting.
    - 🏦 **Net Banking**: HDFC, SBI, ICICI, Axis, Kotak, and more.
    - 🧪 **1-Click Test Pay**: Developer simulator for immediate end-to-end verification.
  - **Order Creation & Verification**: Server endpoints (`/api/payment/create-order` & `/api/payment/verify`) with database status updates (`Confirmed` / `Paid`).
- **✉️ Automated Email Notifications**:
  - **Direct Gmail SMTP**: Sends custom trip requests and official booking receipts directly via Gmail using Nodemailer.
  - **Resend Support**: Built-in fallback support for Resend API.
- **📊 Live Database & Admin Dashboard**:
  - **Zero-Setup Database**: Powered by Prisma ORM with SQLite (`dev.db`), with PostgreSQL compatibility.
  - **Live Web DB Viewer**: Integrated visual dashboard at `http://localhost:4000/db` with auto-refreshing tables.
  - **JSON API**: Real-time endpoints at `http://localhost:4000/api/db`.
  - **Prisma Studio**: Graphical database management on port `5555`.
- **🧳 Full Travel Desk**:
  - **Saved Journeys (Wishlist)**: Save packages with heart toggles.
  - **Travel Cart**: Add journeys, adjust traveller quantities, and proceed to checkout.
  - **Bookings Manager**: Review confirmed trips, download receipts, and track payment status.
  - **Custom Trip Planner**: Submit bespoke itineraries with budget and travel month preferences.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router v7, `@react-oauth/google`, Custom CSS |
| **Backend API** | Node.js, Express, `cors`, `cookie-parser`, `jsonwebtoken` |
| **Database & ORM** | Prisma Client, SQLite (`dev.db`) / PostgreSQL compatible |
| **Email Service** | Nodemailer (Gmail SMTP) & Resend API |
| **Authentication** | Google Identity Services OAuth 2.0 Web Client |

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/siddhant123-coder/travel-yatra.git
cd travel-yatra

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment Variables
Copy `.env.example` files to `.env`:

**Frontend (`.env`)**:
```ini
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
```

**Backend (`server/.env`)**:
```ini
PORT=4000
CLIENT_URL=http://localhost:5173
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com

# Email notifications
TRIP_NOTIFICATION_TO=siddhantsrivastava2005@gmail.com

# Gmail SMTP (Recommended)
GMAIL_USER=siddhantsrivastava2005@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

### 3. Initialize Database
```bash
cd server
npx prisma db push
cd ..
```

### 4. Run Everything with One Command
```bash
npm start
```
*(or `npm run start`)*

---

## 🔗 Live Service URLs

| Service | URL | Description |
| :--- | :--- | :--- |
| **Frontend App** | [http://localhost:5173](http://localhost:5173) | Main customer-facing travel experience |
| **Backend API** | [http://localhost:4000](http://localhost:4000) | REST API & health check (`/api/health`) |
| **Database Web Dashboard** | [http://localhost:4000/db](http://localhost:4000/db) | Visual GUI for Users, Bookings & Requests |
| **Database JSON API** | [http://localhost:4000/api/db](http://localhost:4000/api/db) | Live raw database metrics & data |
| **Prisma Studio** | [http://localhost:5555](http://localhost:5555) | Run via `npm run studio` |

---

## 🌐 Complete Deployment Guide

### Option A: Deploy Backend on Render & Frontend on Vercel (Recommended)

#### 1. Backend (Render / Railway)
1. Link your GitHub repository (`siddhant123-coder/travel-yatra`).
2. Set Root Directory to `server`.
3. Set Build Command: `npm install && npx prisma db push`
4. Set Start Command: `npm start`
5. Add Environment Variables from `server/.env.example`.
6. Note down your backend URL (e.g., `https://travel-yatra-api.onrender.com`).

#### 2. Frontend (Vercel / Netlify)
1. Import repository on Vercel.
2. Root Directory: `./` (or `a` if deployed from subfolder).
3. Framework Preset: `Vite`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variables:
   - `VITE_API_URL`: Your Render backend URL
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID

---

## 📄 License
This project is private and proprietary to Travel Yatra.
