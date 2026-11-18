import React from 'react';
import { Link } from 'react-router-dom';
import { useTravel } from '../TravelStore';

export default function BookingsSection() {
  const { bookings, openPayment } = useTravel();

  return (
    <section className="booking-strip shell" id="bookings">
      <div>
        <div className="section-kicker">A LITTLE MORE PEACE OF MIND</div>
        <h2>Your journeys,<br /><em>all in one place.</em></h2>
        <p>Your bookings and trip details stay together. New bookings created from a package will appear here.</p>
        <Link className="text-link" to="/#packages">Explore journeys →</Link>
      </div>
      <div className="booking-preview">
        {bookings.length === 0 ? (
          <div className="booking-empty">
            <span className="booking-icon">✈</span>
            <b>Your travel desk is ready.</b>
            <small>No bookings yet. Choose a journey to create your first booking record.</small>
            <Link className="booking-link" to="/#packages">EXPLORE PACKAGES <span>↗</span></Link>
          </div>
        ) : bookings.slice(0, 3).map(booking => {
          const isPaid = booking.paymentStatus === 'Paid' || booking.status === 'Confirmed';
          return (
            <div className="booking-row" key={booking.id}>
              <span className="booking-icon">✈</span>
              <div><b>{booking.title}</b><small>{booking.country} · {booking.travellers} traveller(s) · {booking.id}</small></div>
              <span className={`status ${isPaid ? 'confirmed' : 'pending'}`}>{isPaid ? 'CONFIRMED' : 'AWAITING PAYMENT'}</span>
              {!isPaid && (
                <button type="button" className="pay-chip-btn" onClick={() => openPayment(booking)}>Pay 💳</button>
              )}
            </div>
          );
        })}
        {bookings.length > 0 && <Link className="booking-link" to="/#top">OPEN YOUR TRAVEL DESK <span>↗</span></Link>}
      </div>
    </section>
  );
}
