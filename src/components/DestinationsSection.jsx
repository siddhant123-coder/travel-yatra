import React from 'react';
import { Link } from 'react-router-dom';

export default function DestinationsSection() {
  return (
    <section className="destinations shell" id="destinations">
            <div className="section-head">
              <div>
                <div className="section-kicker">GO WHERE YOU FEEL MOST ALIVE</div>
                <h2>
                  Places with a
                  <br />
                  <em>pull of their own.</em>
                </h2>
              </div>
              <Link className="text-link" to="/packages">All destinations  →</Link>
            </div>
            <div className="destination-grid">
              <Link className="destination large" to="/packages">
                <img src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85" alt="Iceland mountains" />
                <div>
                  <small>01 · THE NORTH</small>
                  <h3>Iceland</h3>
                  <span>Wild landscapes & quiet wonders ↗</span>
                </div>
              </Link>
              <Link className="destination" to="/packages">
                <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85" alt="Kyoto Japan" />
                <div>
                  <small>02 · EAST ASIA</small>
                  <h3>Japan</h3>
                  <span>Tradition meets tomorrow ↗</span>
                </div>
              </Link>
              <Link className="destination" to="/packages">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=85" alt="Swiss Alps" />
                <div>
                  <small>03 · EUROPE</small>
                  <h3>Switzerland</h3>
                  <span>Alpine air & open horizons ↗</span>
                </div>
              </Link>
            </div>
          </section>
  );
}
