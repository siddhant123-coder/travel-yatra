import React, { useState } from 'react';
import { useTravel } from '../TravelStore';

const initialForm = { idea: '', month: '', travellers: '2 travellers', budget: '₹25k–₹50k', email: '' };

export default function CustomTripSection() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { submitTripRequest } = useTravel();

  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.idea.trim()) {
      setMessage('Please describe the trip you have in mind.');
      return;
    }
    if (!form.email.trim()) {
      setMessage('Please enter your email so we can contact you about your trip.');
      return;
    }
    setSubmitting(true);
    setMessage('');
    try {
      const result = await submitTripRequest(form);
      setForm(initialForm);
      setMessage(result.message || 'Your trip request has been received.');
    } catch (error) {
      setMessage(error.message || 'We could not submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="custom-trip shell" id="custom-trip">
      <div className="custom-copy">
        <div className="section-kicker">YOUR JOURNEY, YOUR WAY</div>
        <h2>Have something<br /><em>else in mind?</em></h2>
        <p>Not every great trip fits a ready-made package. Describe the journey you want — the destination, dates, pace, people or little details that matter — and make it yours.</p>
        <div className="custom-note"><span>✳</span> A more personal way to start planning.</div>
      </div>

      <form className="request-card" onSubmit={submit}>
        <div className="request-top"><b>Tell us about your dream trip</b><span>PERSONAL TRIP REQUEST · 01</span></div>
        <label htmlFor="trip-idea">WHAT DO YOU HAVE IN MIND?</label>
        <textarea id="trip-idea" required value={form.idea} onChange={e => update('idea', e.target.value)} placeholder="Example: I want a 6-day trip to the mountains in December, for two people. Somewhere peaceful, with beautiful stays, scenic drives and a little adventure..." />
        <div className="request-chips"><span>✳ Nature & slow travel</span><span>⌁ Adventure</span><span>♡ Romantic escape</span><span>◈ Family holiday</span></div>
        <div className="request-fields">
          <input aria-label="Travel month" placeholder="Travel month" value={form.month} onChange={e => update('month', e.target.value)} />
          <select aria-label="Travellers" value={form.travellers} onChange={e => update('travellers', e.target.value)}>
            <option>1 traveller</option><option>2 travellers</option><option>3–4 travellers</option><option>5+ travellers</option>
          </select>
          <select aria-label="Budget" value={form.budget} onChange={e => update('budget', e.target.value)}>
            <option>Under ₹25,000</option><option>₹25k–₹50k</option><option>₹50k–₹1 lakh</option><option>₹1 lakh+</option>
          </select>
        </div>
        <div className="request-fields request-email"><input type="email" aria-label="Email address" placeholder="Your email address" required value={form.email} onChange={e => update('email', e.target.value)} /></div>
        <div className="request-bottom">
          <small>No fixed package required.<br />Start with an idea; refine the details later.</small>
          <button className="request-send" type="submit" disabled={submitting}>{submitting ? "Sending..." : "Send trip request ↗"}</button>
        </div>
        {message && <p className="form-feedback" role="status">{message}</p>}
      </form>
    </section>
  );
}
