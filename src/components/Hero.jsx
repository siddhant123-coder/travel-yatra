
import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero shell">
      <div className="hero-copy">
        <div className="eyebrow">
          <span></span>
          A MORE THOUGHTFUL WAY TO TRAVEL
        </div>

        <h1>
          Your journey,
          <br />
          <em>beautifully</em>
          <br />
          considered
        </h1>

        <p>
          Discover extraordinary places, compare thoughtfully curated
          journeys and keep every detail in one place.
        </p>

        <div className="hero-ctas">
          <Link className="primary-btn" to="/packages">
            Explore journeys
            <span>↗</span>
          </Link>

          <Link className="text-link" to="/destinations">
            Discover destinations
            <span>→</span>
          </Link>
        </div>

        <div className="trust-row">
          <span>✳ Carefully curated stays</span>
          <span>◈ Local experiences</span>
          <span>◎ 40+ destinations</span>
        </div>
      </div>

      <div className="hero-art">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=88"
          alt="Dramatic mountain range"
        />

        <div className="hero-shade"></div>

        <div className="hero-image-label">
          <span>01 / THE HIMALAYAS</span>
          <b>Find your somewhere.</b>
        </div>

        <div className="image-index">
          TRAVEL NOTES / 01
        </div>
      </div>
    </section>
  );
}
