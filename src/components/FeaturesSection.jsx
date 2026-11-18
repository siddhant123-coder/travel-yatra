import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturesSection() {
  return (
    <section className="features shell">
            <div className="section-head">
              <div>
                <div className="section-kicker">A BETTER WAY TO GET THERE</div>
                <h2>
                  Less planning friction.
                  <br />
                  <em>More room to wander.</em>
                </h2>
              </div>
              <p>Every detail has its place, so the best part of travel can take centre stage.</p>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <div className="wire globe">
                  <svg viewBox="0 0 220 180">
                    <g fill="none" stroke="currentColor" strokeWidth=".8">
                      <circle cx="110" cy="90" r="65"></circle>
                      <ellipse cx="110" cy="90" rx="28" ry="65"></ellipse>
                      <ellipse cx="110" cy="90" rx="52" ry="65"></ellipse>
                      <path d="M45 90h130M53 62h114M53 118h114M110 25v130"></path>
                      <path d="M64 46l92 88M156 46L64 134" opacity=".45"></path>
                    </g>
                    <circle cx="153" cy="61" r="3" fill="#d7bd83"></circle>
                  </svg>
                </div>
                <span className="feature-num">01 / DISCOVER</span>
                <h3>
                  Find a place
                  <br />
                  that moves you.
                </h3>
                <p>Explore destinations and experiences worth putting on the map.</p>
              </article>
              <article className="feature-card">
                <div className="wire mountain">
                  <svg viewBox="0 0 220 180">
                    <g fill="none" stroke="currentColor" strokeWidth=".8">
                      <path d="M18 142L80 50l28 38 27-55 68 109H18Z"></path>
                      <path d="M38 142l43-65 26 36 28-47 51 76M58 142l24-36 25 29 28-43 33 50M80 50l10 15 18 23M135 33l10 22 18 25"></path>
                      <path d="M20 153q90-18 180 0M33 163q77-14 154 0" opacity=".5"></path>
                    </g>
                  </svg>
                </div>
                <span className="feature-num">02 / EXPLORE</span>
                <h3>
                  Make the route
                  <br />
                  your own.
                </h3>
                <p>Compare curated packages, inclusions and day-by-day plans.</p>
              </article>
              <article className="feature-card">
                <div className="wire route">
                  <svg viewBox="0 0 220 180">
                    <g fill="none" stroke="currentColor" strokeWidth=".8">
                      <path d="M32 130C56 36 88 153 113 78s50-49 76-19" strokeDasharray="3 5"></path>
                      <circle cx="32" cy="130" r="7"></circle>
                      <circle cx="113" cy="78" r="7"></circle>
                      <circle cx="189" cy="59" r="7"></circle>
                      <path d="M32 130l-8 14h16zM113 78l-8 14h16zM189 59l-8 14h16z"></path>
                      <path d="M30 153q75 16 158-8" opacity=".45"></path>
                    </g>
                  </svg>
                </div>
                <span className="feature-num">03 / ORGANIZE</span>
                <h3>
                  Every detail,
                  <br />
                  in its place.
                </h3>
                <p>Keep your bookings, saved journeys and itinerary together.</p>
              </article>
            </div>
          </section>
  );
}
