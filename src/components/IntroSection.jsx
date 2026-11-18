import React from 'react';
import { Link } from 'react-router-dom';

export default function IntroSection() {
  return (
    <section className="intro-band shell">
            <div className="section-kicker">THE TRAVEL YATRA EXPERIENCE</div>
            <div className="intro-grid">
              <h2>
                Everything for the
                <br />
                journey 
                <em>ahead.</em>
              </h2>
              <p>From the first spark of inspiration to the details of your itinerary, explore and organize your next escape with a little more clarity.</p>
            </div>
            <div className="product-frame">
              <div className="frame-top">
                <div className="frame-brand">
                  <span className="mini-mark">Y</span>
                   Travel Yatra 
                  <span className="muted">/ Your travel desk</span>
                </div>
                <div className="frame-status">
                  <span className="live-dot"></span>
                   YOUR NEXT ADVENTURE
                </div>
              </div>
              <div className="dashboard-preview">
                <aside className="preview-side">
                  <div className="side-label">WORKSPACE</div>
                  <div className="side-item active">◫   Overview</div>
                  <div className="side-item">⌖   Discover</div>
                  <div className="side-item">▤   My itineraries</div>
                  <div className="side-item">♡   Saved journeys</div>
                  <div className="side-item">♧   Bookings</div>
                  <div className="side-label side-bottom">YOUR ACCOUNT</div>
                  <div className="profile-mini">
                    <span className="avatar">S</span>
                    <span>
                      <b>Guest traveller</b>
                      <small>Personal space</small>
                    </span>
                  </div>
                </aside>
                <div className="preview-main">
                  <div className="preview-heading">
                    <div>
                      <small>MONDAY, 16 NOVEMBER</small>
                      <h3>Your next chapter awaits.</h3>
                      <p>Pick up where your wanderlust left off.</p>
                    </div>
                    <span className="round-arrow">↗</span>
                  </div>
                  <div className="preview-feature">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85" alt="Swiss Alps" />
                    <div className="feature-overlay">
                      <small>FEATURED JOURNEY · SWITZERLAND</small>
                      <h4>
                        Somewhere above
                        <br />
                        the ordinary.
                      </h4>
                      <span>Explore the alpine collection  →</span>
                    </div>
                  </div>
                  <div className="preview-stats">
                    <div>
                      <small>UPCOMING JOURNEYS</small>
                      <b>
                        02 
                        <span>trips</span>
                      </b>
                    </div>
                    <div>
                      <small>SAVED FOR LATER</small>
                      <b>
                        08 
                        <span>places</span>
                      </b>
                    </div>
                    <div>
                      <small>YOUR TRAVEL DESK</small>
                      <b>
                        All in 
                        <span>one place</span>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="floating-chat" aria-label="Illustrative travel planning conversation">
                <div className="chat-head">
                  <div>
                    ✳   Travel Yatra 
                    <small># trip-planning</small>
                  </div>
                  <span className="chat-dots">•••</span>
                </div>
                <div className="chat-body">
                  <div className="chat-msg">
                    <span className="chat-avatar">Y</span>
                    <p>
                      <b>Travel Yatra</b>
                      Hey! Tell me what kind of journey you have in mind. I'll help shape the details.
                    </p>
                  </div>
                  <div className="chat-msg">
                    <span className="chat-avatar" style={{ background: "#cbb78d" }}>S</span>
                    <p className="you">I want a quiet 5-day mountain escape, somewhere with scenic stays and easy hikes.</p>
                  </div>
                  <div className="chat-msg">
                    <span className="chat-avatar">Y</span>
                    <p>
                      <b>Travel Yatra</b>
                      Lovely choice. We can tailor the destination, pace, stay and experiences around you.
                    </p>
                  </div>
                </div>
                <div className="chat-compose">
                  I’m thinking of travelling in December, with a relaxed itinerary
                  <span className="typing-caret"></span>
                </div>
              </div>
              <div className="frame-bottom">
                <span>AN EXAMPLE OF YOUR TRAVEL WORKSPACE</span>
                <span>DESIGNED AROUND THE WAY YOU TRAVEL  ↗</span>
              </div>
            </div>
          </section>
  );
}
