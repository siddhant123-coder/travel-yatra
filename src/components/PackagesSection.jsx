import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TRAVEL_PACKAGES, useTravel } from '../TravelStore';

export default function PackagesSection() {
  const { wishlist, toggleWishlist, addToCart, createBooking, openPayment } = useTravel();
  const [feedback, setFeedback] = useState('');

  return (
    <section className="packages shell" id="packages">
      <div className="section-head">
        <div>
          <div className="section-kicker">THE COLLECTION</div>
          <h2>Journeys, thoughtfully<br /><em>put together.</em></h2>
        </div>
        <p>Browse our signature escapes. Save the ones you love, add them to your cart or create a booking record.</p>
      </div>

      <div className="package-grid">
        {TRAVEL_PACKAGES.map(item => {
          const saved = wishlist.some(x => x.id === item.id);
          return (
            <article className="package-card" key={item.id}>
              <div className="package-photo">
                <img src={item.image} alt={item.title} />
                <span className="tag">{item.category.toUpperCase()}</span>
                <button type="button" className={`save ${saved ? 'is-saved' : ''}`} aria-label={saved ? 'Remove from saved journeys' : 'Save journey'} onClick={() => { toggleWishlist(item); setFeedback(saved ? 'Removed from saved journeys.' : 'Added to saved journeys. Open your profile to view it.'); }}>{saved ? '♥' : '♡'}</button>
              </div>
              <div className="package-info">
                <div className="meta">{item.country} <span>·</span> {item.duration.toUpperCase()} <span>·</span> ★ {item.rating}</div>
                <h3>{item.title}</h3>
                <div className="package-foot">
                  <div><small>STARTING FROM</small><b>{item.priceLabel}</b></div>
                  <span className="circle-arrow">↗</span>
                </div>
                <div className="package-actions">
                  <button type="button" className="package-secondary" onClick={() => { addToCart(item); setFeedback(`${item.title} added to your cart.`); }}>Add to cart</button>
                  <button type="button" className="package-book" onClick={async () => {
                    const booking = await createBooking(item, 1);
                    openPayment(booking);
                  }}>Book & Pay ↗</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {feedback && <p className="form-feedback package-feedback" role="status">{feedback}</p>}
      <div className="collection-bottom">
        <span>SHOWING {TRAVEL_PACKAGES.length} SIGNATURE JOURNEYS</span>
        <Link className="outline-btn" to="/#custom-trip">Plan a custom journey ↗</Link>
      </div>
    </section>
  );
}
