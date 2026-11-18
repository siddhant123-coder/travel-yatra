import React from 'react';
import { Link } from 'react-router-dom';
import { useTravel } from '../TravelStore';

export default function ItinerarySection() {
  const { bookings } = useTravel();
  const latest = bookings[0];
  return (
    <section className="itinerary shell" id="itinerary">
            <div className="itinerary-copy">
              <div className="section-kicker">YOUR TRAVEL DESK</div>
              <h2>
                The whole journey.
                <br />
                <em>One clear view.</em>
              </h2>
              <p>From the first booking to the final day, your trip details stay together. Review plans, keep track of dates and know what's next.</p>
              <Link className="text-link" to="/bookings">See how it comes together  →</Link>
            </div>
            <div className="itinerary-card">
              <div className="itinerary-top">
                <span>YOUR TRAVEL OVERVIEW</span>
                <span className="confirmed">● {latest ? latest.status.toUpperCase() : 'READY TO PLAN'}</span>
              </div>
              <div className="trip-title">
                <div>
                  <small>{latest ? latest.id : 'NO BOOKING SELECTED'}</small>
                  <h3>{latest ? latest.title : 'Your next journey starts here'}</h3>
                  <p>{latest ? `${latest.country} · ${latest.travellers} traveller(s)` : 'Choose a package to see your trip details here'}</p>
                </div>
                <div className="trip-icon">⌁</div>
              </div>
              <div className="trip-line">
                <span className="trip-dot"></span>
                <div>
                  <small>DAY 01 · ARRIVAL</small>
                  <b>Arrival in Manali Valley</b>
                  <p>Private transfer · Alpine chalet check-in</p>
                </div>
              </div>
              <div className="trip-line">
                <span className="trip-dot"></span>
                <div>
                  <small>DAY 02 · EXPLORATION</small>
                  <b>Solang Valley & Rohtang Pass</b>
                  <p>Snowline exploration · Glacier viewpoint</p>
                </div>
              </div>
              <div className="trip-line last">
                <span className="trip-dot"></span>
                <div>
                  <small>DAY 03 · SCENIC ROUTE</small>
                  <b>Spiti Border Exploration</b>
                  <p>Mountain crossing · Ancient monasteries</p>
                </div>
              </div>
              <div className="itinerary-bottom">
                <span>{latest ? `${latest.travellers} TRAVELLER(S)` : 'YOUR TRAVEL DESK'}</span>
                <Link to="/#bookings">VIEW BOOKINGS ↗</Link>
              </div>
            </div>
          </section>
  );
}
