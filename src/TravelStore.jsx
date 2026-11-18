import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from './api';

const TravelContext = createContext(null);
export const TRAVEL_PACKAGES = [
  { id: 'himalayan-escape', title: 'Himalayan High Altitude Escape', country: 'India', duration: '6 nights', price: 32900, priceLabel: '₹32,900', category: 'Adventure', rating: '4.9', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85' },
  { id: 'swiss-grand-tour', title: 'Swiss Alpine Panoramic Grand Tour', country: 'Switzerland', duration: '8 nights', price: 112500, priceLabel: '₹1,12,500', category: 'Alpine', rating: '4.8', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=85' },
  { id: 'japan-after-dark', title: 'Japan After Dark: Tokyo to Kyoto', country: 'Japan', duration: '7 nights', price: 96400, priceLabel: '₹96,400', category: 'Culture', rating: '4.9', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85' },
];
const read = (key, fallback) => {
  try { const value = localStorage.getItem(`travel-yatra:${key}`); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};

export function TravelProvider({ children }) {
  const [profile, setProfile] = useState(() => read('profile', { name: '', email: '', phone: '', picture: '' }));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => read('wishlist', []));
  const [cart, setCart] = useState(() => read('cart', []));
  const [bookings, setBookings] = useState(() => read('bookings', []));
  const [tripRequests, setTripRequests] = useState(() => read('tripRequests', []));
  const [activePaymentBooking, setActivePaymentBooking] = useState(null);

  useEffect(() => { let alive = true; apiRequest('/api/auth/me').then(({ user }) => {
    if (!alive) return;
    setProfile({ name: user.name, email: user.email, phone: user.phone || '', picture: user.picture || '' });
    setIsAuthenticated(true);
    return apiRequest('/api/travel-data');
  }).then(data => {
    if (!alive || !data) return;
    setWishlist(data.wishlist || []); setCart(data.cart || []);
    setBookings(data.bookings || []); setTripRequests(data.tripRequests || []);
  }).catch(() => { if (alive) setIsAuthenticated(false); }).finally(() => { if (alive) setAuthLoading(false); });
  return () => { alive = false; }; }, []);

  useEffect(() => localStorage.setItem('travel-yatra:profile', JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem('travel-yatra:wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem('travel-yatra:cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('travel-yatra:bookings', JSON.stringify(bookings)), [bookings]);
  useEffect(() => localStorage.setItem('travel-yatra:tripRequests', JSON.stringify(tripRequests)), [tripRequests]);

  const acceptGoogleCredential = async credential => {
    const { user } = await apiRequest('/api/auth/google', { method: 'POST', body: JSON.stringify({ credential }) });
    setProfile({ name: user.name, email: user.email, phone: user.phone || '', picture: user.picture || '' });
    setIsAuthenticated(true);
    const data = await apiRequest('/api/travel-data');
    setWishlist(data.wishlist || []); setCart(data.cart || []);
    setBookings(data.bookings || []); setTripRequests(data.tripRequests || []);
    return user;
  };
  const devLogin = async (email = 'siddhantsrivastava2005@gmail.com', name = 'Siddhant Srivastava') => {
    const { user } = await apiRequest('/api/auth/dev-login', { method: 'POST', body: JSON.stringify({ email, name }) });
    setProfile({ name: user.name, email: user.email, phone: user.phone || '', picture: user.picture || '' });
    setIsAuthenticated(true);
    const data = await apiRequest('/api/travel-data');
    setWishlist(data.wishlist || []); setCart(data.cart || []);
    setBookings(data.bookings || []); setTripRequests(data.tripRequests || []);
    return user;
  };

  const logout = async () => {
    await apiRequest('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setProfile({ name: '', email: '', phone: '', picture: '' });
    setWishlist([]); setCart([]); setBookings([]); setTripRequests([]);
  };
  const saveProfile = async next => {
    if (isAuthenticated) {
      const { user } = await apiRequest('/api/profile', { method: 'PATCH', body: JSON.stringify(next) });
      setProfile({ name: user.name, email: user.email, phone: user.phone || '', picture: user.picture || '' });
    } else setProfile(next);
  };

  const toggleWishlist = item => {
    const exists = wishlist.some(x => x.id === item.id);
    setWishlist(current => exists ? current.filter(x => x.id !== item.id) : [...current, item]);
    if (isAuthenticated) apiRequest(`/api/wishlist/${encodeURIComponent(item.id)}`, exists
      ? { method: 'DELETE' } : { method: 'PUT', body: JSON.stringify({ item }) }).catch(console.error);
  };
  const addToCart = item => {
    const existing = cart.find(x => x.id === item.id);
    const quantity = (existing?.quantity || 0) + 1;
    setCart(current => existing ? current.map(x => x.id === item.id ? { ...x, quantity } : x) : [...current, { ...item, quantity: 1 }]);
    if (isAuthenticated) apiRequest(`/api/cart/${encodeURIComponent(item.id)}`, { method: 'PUT', body: JSON.stringify({ item, quantity }) }).catch(console.error);
  };
  const updateCartQuantity = (id, quantity) => {
    setCart(current => quantity <= 0 ? current.filter(x => x.id !== id) : current.map(x => x.id === id ? { ...x, quantity } : x));
    if (isAuthenticated) {
      const item = cart.find(x => x.id === id);
      if (quantity <= 0) apiRequest(`/api/cart/${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(console.error);
      else if (item) apiRequest(`/api/cart/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify({ item, quantity }) }).catch(console.error);
    }
  };
  const removeFromCart = id => {
    setCart(current => current.filter(x => x.id !== id));
    if (isAuthenticated) apiRequest(`/api/cart/${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(console.error);
  };
  const createBooking = async (item, travellers = 1) => {
    const booking = { id: `TY-${Date.now().toString(36).toUpperCase()}`, packageId: item.id, title: item.title, country: item.country, price: item.price, priceLabel: item.priceLabel, travellers: Number(travellers) || 1, createdAt: new Date().toISOString(), status: 'Awaiting payment', paymentStatus: 'Not paid' };
    if (isAuthenticated) {
      try {
        const { booking: saved } = await apiRequest('/api/bookings', { method: 'POST', body: JSON.stringify({ packageId: item.id, title: item.title, country: item.country, price: item.price, travellers }) });
        setBookings(current => [saved, ...current.filter(x => x.id !== booking.id)]);
        setCart(current => current.filter(x => x.id !== item.id));
        return saved;
      } catch (err) {
        console.error('Booking API error:', err);
      }
    }
    setBookings(current => [booking, ...current]);
    setCart(current => current.filter(x => x.id !== item.id));
    return booking;
  };
  const cancelBooking = id => {
    setBookings(current => current.filter(x => x.id !== id));
    if (isAuthenticated) apiRequest(`/api/bookings/${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(console.error);
  };

  const openPayment = (booking) => setActivePaymentBooking(booking);
  const closePayment = () => setActivePaymentBooking(null);

  const processPayment = async (bookingId, paymentMethod = 'UPI', details = {}) => {
    if (isAuthenticated) {
      const result = await apiRequest('/api/payment/verify', {
        method: 'POST',
        body: JSON.stringify({
          bookingId,
          paymentMethod,
          paymentId: details.paymentId || `PAY_${Date.now()}`
        })
      });
      if (result.booking) {
        setBookings(current => current.map(b => b.id === bookingId ? { ...b, ...result.booking } : b));
      }
      return result;
    } else {
      const txnId = `GUEST_TXN_${Date.now().toString(36).toUpperCase()}`;
      setBookings(current => current.map(b => b.id === bookingId ? {
        ...b,
        status: 'Confirmed',
        paymentStatus: 'Paid',
        paymentId: txnId,
        paidAt: new Date().toISOString()
      } : b));
      return {
        success: true,
        receipt: { transactionId: txnId, paymentMethod },
        message: 'Payment received! Your journey is confirmed.'
      };
    }
  };
  const submitTripRequest = async request => {
    const saved = { ...request, id: `REQ-${Date.now().toString(36).toUpperCase()}`, createdAt: new Date().toISOString(), status: 'Received' };
    const result = await apiRequest('/api/trip-requests', { method: 'POST', body: JSON.stringify({ ...request, name: profile.name || '' }) });
    setTripRequests(current => [{ ...saved, ...result.request }, ...current]);
    return result;
  };

  const value = useMemo(() => ({
    profile, setProfile, saveProfile, isAuthenticated, authLoading, acceptGoogleCredential, devLogin, logout,
    wishlist, toggleWishlist, cart, addToCart, updateCartQuantity, removeFromCart,
    bookings, createBooking, cancelBooking, tripRequests, submitTripRequest,
    activePaymentBooking, openPayment, closePayment, processPayment,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }), [profile, isAuthenticated, authLoading, wishlist, cart, bookings, tripRequests, activePaymentBooking]);
  return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>;
}
export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) throw new Error('useTravel must be used inside TravelProvider');
  return context;
}
