import React from 'react';
import { Link } from 'react-router-dom';

export default function FinalCTASection() {
  return (
    <section className="final-cta shell" id="plan">
            <div className="cta-orbit">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="section-kicker">THE WORLD IS STILL OUT THERE</div>
            <h2>
              Somewhere is calling.
              <br />
              <em>Let's answer.</em>
            </h2>
            <Link className="primary-btn" to="/packages">
              Find your next journey 
              <span>↗</span>
            </Link>
          </section>
  );
}
