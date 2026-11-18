import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTravel } from '../TravelStore';

export default function PaymentModal() {
  const { activePaymentBooking, closePayment, processPayment, profile } = useTravel();
  const [tab, setTab] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(profile?.name || '');
  const [bank, setBank] = useState('HDFC Bank');
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!activePaymentBooking) return null;

  const travellers = Number(activePaymentBooking.travellers || 1);
  const totalAmount = (Number(activePaymentBooking.price) || 0) * travellers;
  const formattedTotal = `₹${totalAmount.toLocaleString('en-IN')}`;

  const formatCardNum = (val) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  const handlePay = async (methodName) => {
    setErrorMsg('');
    setProcessing(true);
    setProcessingStep('Connecting to secure payment gateway...');

    try {
      await new Promise(r => setTimeout(r, 600));
      setProcessingStep('Authorizing transaction with bank...');
      await new Promise(r => setTimeout(r, 700));

      const res = await processPayment(activePaymentBooking.id, methodName);
      if (res.success || res.ok) {
        setReceipt(res.receipt || { transactionId: `TXN_${Date.now().toString(36).toUpperCase()}` });
      } else {
        throw new Error(res.error || 'Payment was declined by bank.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
      setProcessingStep('');
    }
  };

  return createPortal(
    <div className="payment-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget && !processing && !receipt) closePayment(); }}>
      <div className="payment-card" role="dialog" aria-modal="true" aria-label="Secure Checkout">
        
        {/* Header */}
        <div className="payment-header">
          <div className="payment-header-left">
            <span className="secure-badge">🔒 256-BIT SSL ENCRYPTED</span>
            <h3>Travel Yatra Checkout</h3>
          </div>
          <button className="payment-close-btn" disabled={processing} onClick={closePayment} aria-label="Close checkout">×</button>
        </div>

        {/* Success Screen */}
        {receipt ? (
          <div className="payment-success-screen">
            <div className="success-icon-badge">✓</div>
            <h4>Payment Successful!</h4>
            <p className="success-subtitle">Your journey is now officially booked and confirmed.</p>

            <div className="receipt-box">
              <div className="receipt-row">
                <span>Booking ID</span>
                <b>{activePaymentBooking.id}</b>
              </div>
              <div className="receipt-row">
                <span>Journey</span>
                <b>{activePaymentBooking.title}</b>
              </div>
              <div className="receipt-row">
                <span>Destination</span>
                <b>{activePaymentBooking.country || 'Global'}</b>
              </div>
              <div className="receipt-row">
                <span>Travellers</span>
                <b>{travellers} Person(s)</b>
              </div>
              <div className="receipt-row">
                <span>Transaction Ref</span>
                <span className="receipt-code">{receipt.transactionId}</span>
              </div>
              <div className="receipt-row total-row">
                <span>Total Paid</span>
                <b className="gold-text">{formattedTotal}</b>
              </div>
            </div>

            <div className="receipt-email-notice">
              <span>✉</span> An official receipt & itinerary confirmation has been emailed to your Gmail address.
            </div>

            <button className="payment-primary-btn" onClick={closePayment} style={{ marginTop: '20px' }}>
              Done / Return to Travel Desk
            </button>
          </div>
        ) : (
          /* Checkout View */
          <div className="payment-body">
            {/* Order Summary Strip */}
            <div className="order-summary-box">
              <div className="order-summary-main">
                <span className="order-item-kicker">{activePaymentBooking.country} · {travellers} TRAVELLER(S)</span>
                <b>{activePaymentBooking.title}</b>
              </div>
              <div className="order-summary-price">
                <small>TOTAL DUE</small>
                <span>{formattedTotal}</span>
              </div>
            </div>

            {errorMsg && <div className="payment-error-banner">{errorMsg}</div>}

            {/* Methods Tabs */}
            <div className="payment-tabs">
              <button type="button" className={`payment-tab-btn ${tab === 'upi' ? 'active' : ''}`} onClick={() => setTab('upi')}>
                ⚡ UPI
              </button>
              <button type="button" className={`payment-tab-btn ${tab === 'card' ? 'active' : ''}`} onClick={() => setTab('card')}>
                💳 Card
              </button>
              <button type="button" className={`payment-tab-btn ${tab === 'netbanking' ? 'active' : ''}`} onClick={() => setTab('netbanking')}>
                🏦 Net Banking
              </button>
              <button type="button" className={`payment-tab-btn ${tab === 'instant' ? 'active' : ''}`} onClick={() => setTab('instant')}>
                ⚡ Quick Pay
              </button>
            </div>

            {/* Tab 1: UPI */}
            {tab === 'upi' && (
              <div className="tab-pane">
                <label className="input-label">ENTER UPI ID / VPA</label>
                <div className="upi-input-group">
                  <input
                    type="text"
                    placeholder="e.g. mobile@upi, username@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    disabled={processing}
                  />
                  <button
                    type="button"
                    className="upi-quick-tag"
                    onClick={() => setUpiId('siddhant@okhdfcbank')}
                  >
                    Use Sample ID
                  </button>
                </div>

                <div className="upi-app-strip">
                  <small>Or pay using any installed UPI app:</small>
                  <div className="upi-badges">
                    <span onClick={() => setUpiId('gpay@okaxis')}>Google Pay</span>
                    <span onClick={() => setUpiId('phonepe@ybl')}>PhonePe</span>
                    <span onClick={() => setUpiId('paytm@paytm')}>Paytm</span>
                    <span onClick={() => setUpiId('bhim@upi')}>BHIM</span>
                  </div>
                </div>

                <div className="qr-container">
                  <div className="qr-box">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d9bd83" strokeWidth="1.5">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                      <line x1="7" y1="7" x2="7" y2="7.01"></line>
                      <line x1="17" y1="7" x2="17" y2="7.01"></line>
                      <line x1="7" y1="17" x2="7" y2="17.01"></line>
                      <line x1="17" y1="17" x2="17" y2="17.01"></line>
                    </svg>
                  </div>
                  <div>
                    <b>Scan & Pay with any UPI QR app</b>
                    <small>Real-time instant settlement</small>
                  </div>
                </div>

                <button
                  type="button"
                  className="payment-primary-btn"
                  disabled={processing}
                  onClick={() => handlePay(`UPI (${upiId || 'Direct QR'})`)}
                >
                  {processing ? processingStep || 'Processing...' : `Pay ${formattedTotal} via UPI ➔`}
                </button>
              </div>
            )}

            {/* Tab 2: Card */}
            {tab === 'card' && (
              <div className="tab-pane">
                <label className="input-label">CARD NUMBER</label>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8892"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNum(e.target.value))}
                  disabled={processing}
                />

                <div className="card-sub-grid">
                  <div>
                    <label className="input-label">VALID THRU</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength="5"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      disabled={processing}
                    />
                  </div>
                  <div>
                    <label className="input-label">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength="4"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      disabled={processing}
                    />
                  </div>
                </div>

                <label className="input-label">CARDHOLDER NAME</label>
                <input
                  type="text"
                  placeholder="Name as on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  disabled={processing}
                />

                <div className="card-brands">
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>RuPay</span>
                  <span>Amex</span>
                </div>

                <button
                  type="button"
                  className="payment-primary-btn"
                  disabled={processing}
                  onClick={() => handlePay(`Card (•••• ${cardNumber.slice(-4) || '8892'})`)}
                >
                  {processing ? processingStep || 'Authorizing...' : `Pay ${formattedTotal} by Card ➔`}
                </button>
              </div>
            )}

            {/* Tab 3: Net Banking */}
            {tab === 'netbanking' && (
              <div className="tab-pane">
                <label className="input-label">SELECT YOUR BANK</label>
                <select value={bank} onChange={(e) => setBank(e.target.value)} disabled={processing}>
                  <option>HDFC Bank</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                  <option>Punjab National Bank</option>
                  <option>Bank of Baroda</option>
                </select>

                <div className="bank-tiles">
                  {['HDFC', 'SBI', 'ICICI', 'Axis'].map(b => (
                    <button
                      type="button"
                      key={b}
                      className={`bank-tile ${bank.includes(b) ? 'selected' : ''}`}
                      onClick={() => setBank(`${b} Bank`)}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="payment-primary-btn"
                  disabled={processing}
                  onClick={() => handlePay(`Net Banking (${bank})`)}
                >
                  {processing ? processingStep || 'Connecting...' : `Pay ${formattedTotal} via ${bank} ➔`}
                </button>
              </div>
            )}

            {/* Tab 4: Quick 1-Click Test Pay */}
            {tab === 'instant' && (
              <div className="tab-pane">
                <div className="instant-pay-banner">
                  <b>⚡ Developer One-Click Simulator</b>
                  <p>Instantly verifies payment, marks booking as Confirmed/Paid in the database, empties cart, and sends receipt email to your Gmail.</p>
                </div>

                <button
                  type="button"
                  className="payment-primary-btn instant-btn"
                  disabled={processing}
                  onClick={() => handlePay('Instant One-Click Pay')}
                >
                  {processing ? processingStep || 'Verifying...' : `Simulate Instant Payment of ${formattedTotal} ➔`}
                </button>
              </div>
            )}

            <div className="payment-footer-note">
              <span>🔒 100% Secure Transaction</span>
              <span>⚡ Instant Confirmation</span>
              <span>✉ Receipt Sent to Gmail</span>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
