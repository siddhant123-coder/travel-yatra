# Travel Yatra — Full-stack setup

## Stack
- React + Vite frontend
- Express API
- PostgreSQL + Prisma
- Google Identity Services sign-in, verified by the API
- HTTP-only JWT session cookie
- Resend email notifications for custom trip requests

## 1. Create service credentials
1. Create a PostgreSQL database (Neon is a convenient hosted option).
2. In Google Cloud Console, create an OAuth 2.0 **Web application** client ID.
   - Add `http://localhost:5173` to Authorized JavaScript origins.
   - Add your production website origin when deploying.
3. Create a Resend account and verify a sender domain for production email delivery.
   - For production, use an address on a domain you control as `TRIP_NOTIFICATION_FROM`.
   - `onboarding@resend.dev` is for Resend testing and is not a production sender for arbitrary recipients.

## 2. Configure environment
Copy root `.env.example` to `server/.env` and fill in:
- `DATABASE_URL`
- `JWT_SECRET` (generate a long random secret)
- `GOOGLE_CLIENT_ID`
- `RESEND_API_KEY`
- `TRIP_NOTIFICATION_FROM`

Also create root `.env` with:
- `VITE_GOOGLE_CLIENT_ID` (same Google Web client ID)
- `VITE_API_URL=http://localhost:4000`

Never commit `.env` files. They contain secrets.

## 3. Install and initialize
From the project root:
```bash
npm install
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
cd ..
npm run dev:full
```
Frontend: http://localhost:5173
API: http://localhost:4000/api/health

## What is persisted
After Google sign-in, the API creates/updates a user in PostgreSQL. The profile, wishlist, cart, bookings and custom trip requests are associated with that user. The frontend retains local browser data for guest mode; guest data is not automatically merged into a Google account.

## Custom trip email
A submitted custom trip request is saved to PostgreSQL and the API attempts to send an email to `siddhantsrivastava2005@gmail.com`. The email is sent only after `RESEND_API_KEY` and a valid sender are configured. The form now requires the customer's email so you can reply directly.

## Production notes
- Deploy the frontend and API over HTTPS.
- Set `CLIENT_URL` to the exact frontend origin.
- For cross-site frontend/API deployments, secure cookies are configured with `SameSite=None`; HTTPS is required.
- Set `NODE_ENV=production`.
- Configure the same Google client ID on frontend and backend.
- Run `npx prisma migrate deploy` during deployment.
- Use a verified Resend sender domain.
- Payment processing is intentionally not implemented. Do not mark bookings as paid until a real payment gateway webhook verifies payment.
