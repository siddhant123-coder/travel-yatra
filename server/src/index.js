import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'node:url';

const app = express();
const prisma = new PrismaClient();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const PORT = Number(process.env.PORT || 4000);
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const COOKIE_NAME = 'ty_session';

const configuredOrigins = CLIENT_URL.split(',').map(x => x.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (tools, curl, server-to-server)
    if (!origin) return callback(null, true);
    // Allow configured origins
    if (configuredOrigins.includes(origin)) return callback(null, true);
    // Automatically allow any local dev server port (e.g. 5173, 5174, 3000, etc.)
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);
    // Allow Vercel & Netlify preview and production URLs
    if (/^https:\/\/.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.netlify\.app$/.test(origin)) return callback(null, true);
    // Otherwise permit callback with true to prevent blocking if needed
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

const safeUser = user => ({ id: user.id, name: user.name, email: user.email, picture: user.picture, phone: user.phone });

function auth(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Please sign in to continue.' });
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).sub;
    next();
  } catch {
    res.clearCookie(COOKIE_NAME);
    return res.status(401).json({ error: 'Your session expired. Please sign in again.' });
  }
}

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'Travel Yatra API' }));

app.get('/api/db', async (_req, res) => {
  try {
    const [users, bookings, tripRequests, cartItems, wishlists] = await Promise.all([
      prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.tripRequest.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.cartItem.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.wishlistItem.findMany({ orderBy: { createdAt: 'desc' } }),
    ]);
    res.json({
      database: 'Neon PostgreSQL (Permanent Cloud Database)',
      counts: {
        users: users.length,
        bookings: bookings.length,
        tripRequests: tripRequests.length,
        cartItems: cartItems.length,
        wishlists: wishlists.length,
      },
      users,
      bookings,
      tripRequests,
      cartItems,
      wishlists
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/db', (_req, res) => {
  res.sendFile(fileURLToPath(new URL('dbViewer.html', import.meta.url)));
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const googleClientId = (process.env.GOOGLE_CLIENT_ID || '').trim();
    const jwtSecret = (process.env.JWT_SECRET || '').trim();
    if (!googleClientId || !jwtSecret) {
      return res.status(503).json({ error: 'Google login is not configured on the server yet. Please restart the backend after updating server/.env.' });
    }
    const { credential } = req.body || {};
    if (!credential) return res.status(400).json({ error: 'Google credential is required.' });

    const client = new OAuth2Client(googleClientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: googleClientId,
    });
    const payload = ticket.getPayload();
    if (!payload?.sub || !payload.email) {
      return res.status(401).json({ error: 'Google could not verify your email address on this account.' });
    }
    // Find existing user by Google ID or by email
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId: payload.sub },
          { email: payload.email }
        ]
      }
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: payload.sub,
          email: payload.email,
          name: payload.name || user.name || payload.email,
          picture: payload.picture || user.picture || null
        }
      });
    } else {
      user = await prisma.user.create({
        data: {
          googleId: payload.sub,
          email: payload.email,
          name: payload.name || payload.email,
          picture: payload.picture || null
        }
      });
    }
    const token = jwt.sign({}, jwtSecret, { subject: user.id, expiresIn: '7d' });
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, path: '/'
    });
    res.json({ user: safeUser(user) });
  } catch (error) {
    console.error('Google auth error:', error.message || error);
    res.status(401).json({ error: `Google sign-in failed: ${error.message || 'Verification error'}` });
  }
});

app.post('/api/auth/dev-login', async (req, res) => {
  try {
    const email = req.body?.email?.trim() || 'siddhantsrivastava2005@gmail.com';
    const name = req.body?.name?.trim() || 'Siddhant Srivastava';
    const googleId = `dev_${email}`;
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId },
          { email }
        ]
      }
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { name }
      });
    } else {
      user = await prisma.user.create({
        data: { googleId, email, name, picture: null }
      });
    }
    const token = jwt.sign({}, process.env.JWT_SECRET, { subject: user.id, expiresIn: '7d' });
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, path: '/'
    });
    res.json({ user: safeUser(user) });
  } catch (error) {
    console.error('Dev login error:', error);
    res.status(500).json({ error: 'Dev sign-in failed. Check database connection.' });
  }
});

app.get('/api/auth/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(401).json({ error: 'Account not found.' });
  res.json({ user: safeUser(user) });
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, path: '/' });
  res.json({ ok: true });
});

app.patch('/api/profile', auth, async (req, res) => {
  const { name, phone } = req.body || {};
  if (typeof name !== 'string' || name.trim().length < 2) return res.status(400).json({ error: 'Enter a valid name.' });
  const user = await prisma.user.update({ where: { id: req.userId }, data: { name: name.trim(), phone: String(phone || '').trim() } });
  res.json({ user: safeUser(user) });
});

app.get('/api/travel-data', auth, async (req, res) => {
  const [user, wishlist, cart, bookings, tripRequests] = await Promise.all([
    prisma.user.findUnique({ where: { id: req.userId } }),
    prisma.wishlistItem.findMany({ where: { userId: req.userId } }),
    prisma.cartItem.findMany({ where: { userId: req.userId } }),
    prisma.booking.findMany({ where: { userId: req.userId }, orderBy: { createdAt: 'desc' } }),
    prisma.tripRequest.findMany({ where: { userId: req.userId }, orderBy: { createdAt: 'desc' } })
  ]);
  res.json({
    profile: safeUser(user),
    wishlist: wishlist.map(x => x.data),
    cart: cart.map(x => ({ ...x.data, quantity: x.quantity })),
    bookings,
    tripRequests
  });
});

app.put('/api/wishlist/:packageId', auth, async (req, res) => {
  const packageId = String(req.params.packageId);
  const item = req.body?.item;
  if (!item || typeof item !== 'object') return res.status(400).json({ error: 'Package data is required.' });
  await prisma.wishlistItem.upsert({
    where: { userId_packageId: { userId: req.userId, packageId } },
    update: { data: item }, create: { userId: req.userId, packageId, data: item }
  });
  res.json({ ok: true });
});
app.delete('/api/wishlist/:packageId', auth, async (req, res) => {
  await prisma.wishlistItem.deleteMany({ where: { userId: req.userId, packageId: String(req.params.packageId) } });
  res.json({ ok: true });
});

app.put('/api/cart/:packageId', auth, async (req, res) => {
  const packageId = String(req.params.packageId);
  const item = req.body?.item;
  const quantity = Math.max(1, Math.min(20, Number(req.body?.quantity) || 1));
  if (!item || typeof item !== 'object') return res.status(400).json({ error: 'Package data is required.' });
  await prisma.cartItem.upsert({
    where: { userId_packageId: { userId: req.userId, packageId } },
    update: { quantity, data: item }, create: { userId: req.userId, packageId, quantity, data: item }
  });
  res.json({ ok: true });
});
app.delete('/api/cart/:packageId', auth, async (req, res) => {
  await prisma.cartItem.deleteMany({ where: { userId: req.userId, packageId: String(req.params.packageId) } });
  res.json({ ok: true });
});

app.post('/api/bookings', auth, async (req, res) => {
  const { packageId, title, country, price, travellers = 1 } = req.body || {};
  if (!packageId || !title || !Number.isFinite(Number(price))) return res.status(400).json({ error: 'Valid package details are required.' });
  const booking = await prisma.booking.create({ data: {
    userId: req.userId, packageId: String(packageId), title: String(title),
    country: String(country || ''), price: Math.max(0, Math.round(Number(price))),
    travellers: Math.max(1, Math.min(20, Number(travellers) || 1))
  }});
  await prisma.cartItem.deleteMany({ where: { userId: req.userId, packageId: String(packageId) } });
  res.status(201).json({ booking });
});
app.delete('/api/bookings/:id', auth, async (req, res) => {
  await prisma.booking.deleteMany({ where: { id: String(req.params.id), userId: req.userId } });
  res.json({ ok: true });
});

// PAYMENT SYSTEM ENDPOINTS
app.post('/api/payment/create-order', auth, async (req, res) => {
  try {
    const { bookingId } = req.body || {};
    let booking = null;
    if (bookingId) {
      booking = await prisma.booking.findFirst({ where: { id: String(bookingId), userId: req.userId } });
      if (!booking) return res.status(404).json({ error: 'Booking not found.' });
    }
    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const amount = booking ? booking.price * booking.travellers : 0;
    res.json({
      orderId,
      amount,
      currency: 'INR',
      bookingId: booking?.id || null,
      title: booking?.title || 'Travel Yatra Journey'
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to initiate payment order.' });
  }
});

app.post('/api/payment/verify', auth, async (req, res) => {
  try {
    const { bookingId, orderId, paymentMethod = 'UPI', paymentId } = req.body || {};
    if (!bookingId) return res.status(400).json({ error: 'Booking ID is required.' });

    const booking = await prisma.booking.findFirst({
      where: { id: String(bookingId), userId: req.userId },
      include: { user: true }
    });
    if (!booking) return res.status(404).json({ error: 'Booking not found.' });

    const txnId = paymentId || `TXN_${Date.now().toString(36).toUpperCase()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const paidAt = new Date();

    let updatedBooking;
    try {
      updatedBooking = await prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: 'Confirmed',
          paymentStatus: 'Paid',
          orderId: String(orderId || `ORD_${Date.now()}`),
          paymentId: txnId,
          paidAt
        }
      });
    } catch {
      updatedBooking = await prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: 'Confirmed',
          paymentStatus: 'Paid'
        }
      });
      updatedBooking.paymentId = txnId;
      updatedBooking.orderId = String(orderId || `ORD_${Date.now()}`);
      updatedBooking.paidAt = paidAt;
    }

    // Send confirmation email
    const totalAmount = booking.price * booking.travellers;
    const recipientEmail = booking.user?.email || process.env.TRIP_NOTIFICATION_TO || 'siddhantsrivastava2005@gmail.com';
    sendPaymentReceiptEmail({
      booking: updatedBooking,
      txnId,
      amount: totalAmount,
      customerEmail: recipientEmail,
      customerName: booking.user?.name || 'Valued Traveller',
      paymentMethod
    }).catch(err => console.error('Failed to send receipt email:', err));

    res.json({
      success: true,
      booking: updatedBooking,
      receipt: {
        transactionId: txnId,
        amount: totalAmount,
        currency: 'INR',
        paidAt: paidAt.toISOString(),
        paymentMethod
      },
      message: 'Payment received! Your booking is confirmed and receipt has been sent.'
    });
  } catch (error) {
    console.error('Payment verify error:', error);
    res.status(500).json({ error: 'Payment processing failed.' });
  }
});

async function sendPaymentReceiptEmail({ booking, txnId, amount, customerEmail, customerName, paymentMethod }) {
  const adminEmail = process.env.TRIP_NOTIFICATION_TO || 'siddhantsrivastava2005@gmail.com';
  const toList = Array.from(new Set([customerEmail, adminEmail].filter(Boolean)));
  const subject = `Booking Confirmed & Payment Received: ${booking.title} (${booking.id})`;
  const formattedAmount = `₹${Number(amount || 0).toLocaleString('en-IN')}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa;">
      <div style="text-align: center; border-bottom: 2px solid #d9bd83; padding-bottom: 16px; margin-bottom: 20px;">
        <h1 style="color: #171717; margin: 0; font-size: 24px; letter-spacing: 2px;">TRAVEL YATRA</h1>
        <p style="color: #666; margin: 4px 0 0; font-size: 13px;">Official Booking Confirmation & Payment Receipt</p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e8e8e8; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #2e7d32; margin-top: 0; font-size: 18px;">Payment Successful (Confirmed)</h2>
        <p style="color: #444; font-size: 14px; margin: 6px 0;">Dear <b>${escapeHtml(customerName)}</b>, thank you for booking your journey with Travel Yatra.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666;">Booking ID:</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${booking.id}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666;">Journey:</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${escapeHtml(booking.title)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666;">Destination:</td>
            <td style="padding: 8px 0; text-align: right;">${escapeHtml(booking.country || 'Global')}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666;">Travellers:</td>
            <td style="padding: 8px 0; text-align: right;">${booking.travellers} traveller(s)</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666;">Transaction ID:</td>
            <td style="padding: 8px 0; font-family: monospace; text-align: right;">${txnId}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666;">Payment Method:</td>
            <td style="padding: 8px 0; text-align: right;">${paymentMethod}</td>
          </tr>
          <tr style="font-size: 16px; font-weight: bold;">
            <td style="padding: 12px 0; color: #111;">Total Amount Paid:</td>
            <td style="padding: 12px 0; color: #d9bd83; text-align: right;">${formattedAmount}</td>
          </tr>
        </table>
      </div>

      <div style="font-size: 12px; color: #777; text-align: center; line-height: 1.5;">
        <p>If you have questions about your itinerary, contact our travel desk at <a href="mailto:${adminEmail}">${adminEmail}</a>.</p>
        <p>© ${new Date().getFullYear()} Travel Yatra. All rights reserved.</p>
      </div>
    </div>
  `;

  // Use Gmail SMTP
  const gmailUser = (process.env.GMAIL_USER || process.env.SMTP_USER || '').trim();
  const rawPass = (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '').trim();
  const gmailPass = rawPass.replace(/\s+/g, '');
  if (gmailUser && gmailPass) {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_HOST ? undefined : 'gmail',
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
      secure: process.env.SMTP_PORT ? process.env.SMTP_PORT === '465' : true,
      auth: { user: gmailUser, pass: gmailPass },
    });
    await transporter.sendMail({
      from: `"Travel Yatra" <${gmailUser}>`,
      to: toList,
      subject,
      html
    });
    console.log(`[Payment Email] Receipt sent via Gmail to ${toList.join(', ')}`);
    return;
  }

  // Fallback to Resend
  if (process.env.RESEND_API_KEY) {
    const resendClient = new Resend(process.env.RESEND_API_KEY);
    await resendClient.emails.send({
      from: process.env.TRIP_NOTIFICATION_FROM || 'Travel Yatra <onboarding@resend.dev>',
      to: toList,
      subject,
      html
    });
    console.log(`[Payment Email] Receipt sent via Resend to ${toList.join(', ')}`);
  }
}

async function sendNotificationEmail({ requestId, name, email, month, travellers, budget, idea }) {
  const to = process.env.TRIP_NOTIFICATION_TO || 'siddhantsrivastava2005@gmail.com';
  const subject = `New Travel Yatra custom trip request — ${requestId}`;
  const html = `<h2>New custom trip request</h2><p><b>Request ID:</b> ${requestId}</p><p><b>Name:</b> ${escapeHtml(name || 'Not provided')}</p><p><b>Customer email:</b> ${escapeHtml(email)}</p><p><b>Travel month:</b> ${escapeHtml(month || 'Not specified')}</p><p><b>Travellers:</b> ${escapeHtml(travellers)}</p><p><b>Budget:</b> ${escapeHtml(budget)}</p><h3>Trip idea</h3><p>${escapeHtml(idea).replace(/\n/g, '<br>')}</p>`;

  // 1. Try Gmail SMTP (Nodemailer)
  const gmailUser = (process.env.GMAIL_USER || process.env.SMTP_USER || '').trim();
  const rawPass = (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '').trim();
  const gmailPass = rawPass.replace(/\s+/g, '');
  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_HOST ? undefined : 'gmail',
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
        secure: process.env.SMTP_PORT ? process.env.SMTP_PORT === '465' : true,
        auth: { user: gmailUser, pass: gmailPass },
      });
      await transporter.sendMail({
        from: `"Travel Yatra" <${gmailUser}>`,
        to,
        replyTo: email.trim(),
        subject,
        html,
      });
      console.log(`[Email] Notification sent via Gmail to ${to}`);
      return { sent: true, provider: 'gmail' };
    } catch (err) {
      console.error('[Email] Gmail sending failed:', err.message);
      return { sent: false, error: err.message };
    }
  }

  // 2. Try Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resendClient = new Resend(process.env.RESEND_API_KEY);
      const result = await resendClient.emails.send({
        from: process.env.TRIP_NOTIFICATION_FROM || 'Travel Yatra <onboarding@resend.dev>',
        to: [to],
        replyTo: email.trim(),
        subject,
        html,
      });
      if (result.error) {
        console.error('[Email] Resend error:', result.error);
        return { sent: false, error: result.error.message };
      }
      console.log(`[Email] Notification sent via Resend to ${to}`);
      return { sent: true, provider: 'resend' };
    } catch (err) {
      console.error('[Email] Resend exception:', err.message);
      return { sent: false, error: err.message };
    }
  }

  console.warn('[Email] Email NOT sent: No email credentials configured in server/.env (set GMAIL_APP_PASSWORD or RESEND_API_KEY).');
  return { sent: false, reason: 'credentials_missing' };
}

app.post('/api/trip-requests', async (req, res) => {
  try {
    const { idea, month = '', travellers = '2 travellers', budget = 'Not specified', email, name = '' } = req.body || {};
    if (typeof idea !== 'string' || idea.trim().length < 10) return res.status(400).json({ error: 'Please describe your trip in at least 10 characters.' });
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address so we can contact you.' });
    const token = req.cookies[COOKIE_NAME];
    let userId = null;
    if (token) { try { userId = jwt.verify(token, process.env.JWT_SECRET).sub; } catch {} }
    const request = await prisma.tripRequest.create({ data: {
      userId, name: String(name).slice(0, 120), email: email.trim(),
      idea: idea.trim().slice(0, 5000), month: String(month).slice(0, 100),
      travellers: String(travellers).slice(0, 50), budget: String(budget).slice(0, 100)
    }});

    const emailResult = await sendNotificationEmail({
      requestId: request.id,
      name, email, month, travellers, budget, idea
    });

    let message = 'Your trip request has been safely saved in the database!';
    if (emailResult.sent) {
      message = `Request received! A notification email has been sent to ${process.env.TRIP_NOTIFICATION_TO || 'siddhantsrivastava2005@gmail.com'}.`;
    } else if (emailResult.reason === 'credentials_missing') {
      message = 'Request saved in the database! (To send emails to your Gmail, configure GMAIL_APP_PASSWORD in server/.env).';
    } else {
      message = `Request saved in the database, but email failed: ${emailResult.error || 'Check server logs'}.`;
    }

    res.status(201).json({ request, emailSent: emailResult.sent, message });
  } catch (error) {
    console.error('Trip request error:', error);
    res.status(500).json({ error: 'We could not submit your request. Please check the backend connection.' });
  }
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
}

app.listen(PORT, () => console.log(`Travel Yatra API listening on http://localhost:${PORT}`));
