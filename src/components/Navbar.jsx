
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useTravel } from '../TravelStore';

export default function Navbar() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('overview');
  const [profileDraft, setProfileDraft] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState('');
  const {
    profile, saveProfile, isAuthenticated, authLoading, acceptGoogleCredential, devLogin, logout,
    wishlist, toggleWishlist, cart, addToCart, updateCartQuantity, removeFromCart,
    bookings, createBooking, cancelBooking, tripRequests, cartCount, cartTotal, openPayment
  } = useTravel();

  const openPanel = (panel) => {
    setActivePanel(panel);
    setAccountOpen(true);
    setProfileDraft(profile);
  };

  const formatMoney = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

  return (
    <header className="nav-wrap">
      <nav className="nav shell">

        <Link className="brand" to="/">
          <span className="brand-mark">Y</span>
          <span>TRAVEL <b>YATRA</b></span>
        </Link>

        <div className="nav-links">

          {/* DESTINATIONS */}
          <div className="nav-item">
            <Link className="nav-trigger" to="/#destinations">
              Destinations <span className="chev">⌄</span>
            </Link>

            <div className="mega-menu" role="region" aria-label="Destinations menu">
              <div className="mega-grid">
                <div className="mega-column">
                  <small className="mega-label">EXPLORE BY REGION</small>
                  <Link className="mega-feature" to="/#destinations">
                    <b>Europe</b>
                    <span>Alpine escapes, coastal towns and timeless cities</span>
                  </Link>
                  <Link className="mega-feature" to="/#destinations">
                    <b>Asia</b>
                    <span>Culture, food and journeys closer to home</span>
                  </Link>
                </div>

                <div className="mega-column">
                  <small className="mega-label">FEATURED PLACES</small>
                  <Link className="mega-link" to="/#destinations">
                    <span className="menu-thumb thumb-iceland"></span>
                    <span><b>Iceland</b><small>Wild landscapes & quiet wonders</small></span>
                    <i>↗</i>
                  </Link>
                  <Link className="mega-link" to="/#destinations">
                    <span className="menu-thumb thumb-japan"></span>
                    <span><b>Japan</b><small>Tradition meets tomorrow</small></span>
                    <i>↗</i>
                  </Link>
                  <Link className="mega-link" to="/#destinations">
                    <span className="menu-thumb thumb-swiss"></span>
                    <span><b>Switzerland</b><small>Alpine air & open horizons</small></span>
                    <i>↗</i>
                  </Link>
                </div>

                <div className="mega-column mega-aside">
                  <small className="mega-label">A LITTLE INSPIRATION</small>
                  <b className="mega-aside-title">Not sure where to go?</b>
                  <p>Start with the feeling you want from your next journey. We'll help with the rest.</p>
                  <Link className="mega-cta" to="/#custom-trip">
                    Find your kind of escape <span>↗</span>
                  </Link>
                </div>
              </div>
              <div className="mega-bottom">
                <span><b>New collection</b> · Slow travel, thoughtfully curated</span>
                <Link to="/#destinations">Explore all destinations →</Link>
              </div>
            </div>
          </div>

          {/* PACKAGES */}
          <div className="nav-item">
            <Link className="nav-trigger" to="/#packages">
              Packages <span className="chev">⌄</span>
            </Link>

            <div className="mega-menu" role="region" aria-label="Packages menu">
              <div className="mega-grid">
                <div className="mega-column">
                  <small className="mega-label">FIND YOUR JOURNEY</small>
                  <Link className="mega-feature" to="/#packages">
                    <b>Adventure escapes</b>
                    <span>For the paths less travelled</span>
                  </Link>
                  <Link className="mega-feature" to="/#packages">
                    <b>Slow & scenic</b>
                    <span>Take the long way, at your pace</span>
                  </Link>
                </div>

                <div className="mega-column">
                  <small className="mega-label">POPULAR COLLECTIONS</small>
                  <Link className="mega-text-link" to="/#packages">
                    <b>Mountain retreats</b>
                    <span>Himalayas, Alps and beyond</span>
                  </Link>
                  <Link className="mega-text-link" to="/#packages">
                    <b>Culture & city</b>
                    <span>Local stories, food and design</span>
                  </Link>
                  <Link className="mega-text-link" to="/#packages">
                    <b>Romantic escapes</b>
                    <span>Time away, made memorable</span>
                  </Link>
                </div>

                <div className="mega-column mega-aside">
                  <small className="mega-label">THE TRAVEL YATRA EDIT</small>
                  <b className="mega-aside-title">A good trip starts with a good plan.</b>
                  <p>Compare stays, inclusions and trip lengths before you choose.</p>
                  <Link className="mega-cta" to="/#packages">
                    Browse the collection <span>↗</span>
                  </Link>
                </div>
              </div>
              <div className="mega-bottom">
                <span><b>Curated, not crowded</b> · Explore journeys selected with care</span>
                <Link to="/#packages">View all packages →</Link>
              </div>
            </div>
          </div>

          {/* ITINERARY */}
          <div className="nav-item">
            <Link className="nav-trigger" to="/#itinerary">
              Itinerary <span className="chev">⌄</span>
            </Link>

            <div className="mega-menu" role="region" aria-label="Itinerary menu">
              <div className="mega-grid">
                <div className="mega-column">
                  <small className="mega-label">YOUR TRIP, AT A GLANCE</small>
                  <Link className="mega-feature" to="/#itinerary">
                    <b>Day-by-day plans</b>
                    <span>Every stop, stay and experience in order</span>
                  </Link>
                  <Link className="mega-feature" to="/#bookings">
                    <b>Travel documents</b>
                    <span>Keep the important details together</span>
                  </Link>
                </div>

                <div className="mega-column">
                  <small className="mega-label">PLAN WITH CONFIDENCE</small>
                  <Link className="mega-text-link" to="/#itinerary">
                    <b>Route overview</b>
                    <span>See how each destination connects</span>
                  </Link>
                  <Link className="mega-text-link" to="/#itinerary">
                    <b>Stay & transfers</b>
                    <span>Know what's included along the way</span>
                  </Link>
                  <Link className="mega-text-link" to="/#bookings">
                    <b>Upcoming departures</b>
                    <span>Dates and trip status in one view</span>
                  </Link>
                </div>

                <div className="mega-column mega-aside">
                  <small className="mega-label">A CLEARER WAY TO TRAVEL</small>
                  <b className="mega-aside-title">Less juggling. More enjoying.</b>
                  <p>Your plans stay organized from the first idea to the journey home.</p>
                  <Link className="mega-cta" to="/#itinerary">
                    See an itinerary <span>↗</span>
                  </Link>
                </div>
              </div>
              <div className="mega-bottom">
                <span><b>Your travel desk</b> · One clear view of the whole journey</span>
                <Link to="/#bookings">Manage your journeys →</Link>
              </div>
            </div>
          </div>

          {/* CUSTOM TRIP */}
          <div className="nav-item">
            <Link className="nav-trigger" to="/#custom-trip">
              Custom trip <span className="chev">⌄</span>
            </Link>

            <div className="mega-menu" role="region" aria-label="Custom trip menu">
              <div className="mega-grid">
                <div className="mega-column">
                  <small className="mega-label">MAKE IT YOURS</small>
                  <Link className="mega-feature" to="/#custom-trip">
                    <b>Tell us your idea</b>
                    <span>Start with a place, a feeling or a rough plan</span>
                  </Link>
                  <Link className="mega-feature" to="/#custom-trip">
                    <b>Set your own pace</b>
                    <span>Easy days, big adventures or a little of both</span>
                  </Link>
                </div>

                <div className="mega-column">
                  <small className="mega-label">WHAT YOU CAN SHAPE</small>
                  <Link className="mega-text-link" to="/#custom-trip">
                    <b>Dates & duration</b>
                    <span>Choose the time that works for you</span>
                  </Link>
                  <Link className="mega-text-link" to="/#custom-trip">
                    <b>Stays & experiences</b>
                    <span>Tell us what matters most</span>
                  </Link>
                  <Link className="mega-text-link" to="/#custom-trip">
                    <b>Budget & travellers</b>
                    <span>Build around your group and comfort</span>
                  </Link>
                </div>

                <div className="mega-column mega-aside">
                  <small className="mega-label">NO FIXED PACKAGE REQUIRED</small>
                  <b className="mega-aside-title">Your trip doesn't have to fit a template.</b>
                  <p>Share your wish list and let the planning begin around you.</p>
                  <Link className="mega-cta" to="/#custom-trip">
                    Create a custom trip <span>↗</span>
                  </Link>
                </div>
              </div>
              <div className="mega-bottom">
                <span><b>Personal trip request</b> · Your journey, your way</span>
                <Link to="/#custom-trip">Start from an idea →</Link>
              </div>
            </div>
          </div>

          {/* MY JOURNEYS */}
          <div className="nav-item">
            <Link className="nav-trigger" to="/#bookings">
              My journeys <span className="chev">⌄</span>
            </Link>

            <div className="mega-menu mega-menu-right" role="region" aria-label="My journeys menu">
              <div className="mega-grid">
                <div className="mega-column">
                  <small className="mega-label">YOUR ACCOUNT</small>
                  <Link className="mega-feature" to="/#bookings">
                    <b>Travel desk</b>
                    <span>Your upcoming and past journeys together</span>
                  </Link>
                  <Link className="mega-feature" to="/#bookings">
                    <b>Saved journeys</b>
                    <span>Places and packages you've bookmarked</span>
                  </Link>
                </div>

                <div className="mega-column">
                  <small className="mega-label">BOOKING OVERVIEW</small>
                  <Link className="mega-text-link" to="/#bookings">
                    <b>Upcoming trips</b>
                    <span>Dates, travellers and confirmations</span>
                  </Link>
                  <Link className="mega-text-link" to="/#bookings">
                    <b>Booking details</b>
                    <span>Review the essentials of each trip</span>
                  </Link>
                  <Link className="mega-text-link" to="/#bookings">
                    <b>Need a hand?</b>
                    <span>Get help with your journey</span>
                  </Link>
                </div>

                <div className="mega-column mega-aside">
                  <small className="mega-label">PICK UP WHERE YOU LEFT OFF</small>
                  <b className="mega-aside-title">Your next chapter awaits.</b>
                  <p>Keep your plans close and the details easy to find.</p>
                  <Link className="mega-cta" to="/#bookings">
                    Open travel desk <span>↗</span>
                  </Link>
                </div>
              </div>
              <div className="mega-bottom">
                <span><b>Your journeys</b> · Saved, upcoming and confirmed</span>
                <Link to="/#bookings">View bookings →</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          <Link className="primary-btn nav-plan-link" to="/#custom-trip">
            Plan a journey <span>↗</span>
          </Link>
          <button className="icon-btn profile-trigger" type="button" onClick={() => openPanel('overview')} aria-label="Open profile and travel desk" title="My account">
            {profile.name ? profile.name.trim().charAt(0).toUpperCase() : '♙'}
          </button>
        </div>


        {accountOpen && createPortal((
          <div className="account-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setAccountOpen(false); }}>
            <aside className="account-drawer" role="dialog" aria-modal="true" aria-label="Your travel account">
              <div className="account-head">
                <div>
                  <span className="section-kicker">TRAVEL YATRA · YOUR ACCOUNT</span>
                  <h2>Your travel desk.</h2>
                  <p>Keep your plans, saved journeys and bookings together.</p>
                </div>
                <button className="account-close" onClick={() => setAccountOpen(false)} aria-label="Close account">×</button>
              </div>

              <div className="account-profile-card">
                <div className="account-avatar">{profile.picture ? <img src={profile.picture} alt="" /> : (profile.name ? profile.name.trim().charAt(0).toUpperCase() : '♙')}</div>
                <div><b>{profile.name || 'Guest traveller'}</b><small>{profile.email || 'Add your details to personalise your travel desk'}</small></div>
              </div>

              <div className="account-tabs">
                {[
                  ['overview', 'Overview'], ['profile', 'Profile'], ['saved', `Saved (${wishlist.length})`],
                  ['cart', `Cart (${cartCount})`], ['bookings', `Bookings (${bookings.length})`], ['requests', 'Trip requests']
                ].map(([key, label]) => (
                  <button key={key} className={activePanel === key ? 'active' : ''} onClick={() => { setActivePanel(key); if (key === 'profile') setProfileDraft(profile); }}>{label}</button>
                ))}
              </div>

              <div className="account-content">
                {activePanel === 'overview' && (
                  <>
                    <h3>Welcome{profile.name ? `, ${profile.name.split(' ')[0]}` : ' aboard'}.</h3>
                    <p className="account-muted">Your personal space for everything connected to your next journey.</p>
                    {!isAuthenticated && (
                      <div className="account-login-box">
                        <p>Sign in to sync your profile, saved journeys, cart and bookings across devices.</p>
                        {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
                          <div style={{ marginBottom: '12px' }}>
                            <GoogleLogin onSuccess={async credentialResponse => {
                              try { await acceptGoogleCredential(credentialResponse.credential); setPaymentMessage('Signed in successfully.'); }
                              catch (error) { setPaymentMessage(error.message); }
                            }} onError={() => setPaymentMessage('Google sign-in was not completed.')} />
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.82rem', color: '#666', marginBottom: '12px', background: 'rgba(0,0,0,0.03)', padding: '10px', borderRadius: '6px', textAlign: 'left' }}>
                            Google Client ID is not configured in <code>.env</code> yet. You can sign in using Quick Dev Sign-In below or configure Google OAuth credentials.
                          </div>
                        )}
                        <button 
                          type="button" 
                          className="account-primary" 
                          style={{ marginTop: '4px', width: '100%' }}
                          onClick={async () => {
                            try {
                              await devLogin('siddhantsrivastava2005@gmail.com', 'Siddhant Srivastava');
                              setPaymentMessage('Signed in successfully as Siddhant.');
                            } catch (e) {
                              setPaymentMessage(e.message || 'Login failed.');
                            }
                          }}
                        >
                          Sign in as Siddhant (Dev Mode)
                        </button>
                        {paymentMessage && <p className="form-feedback" role="status">{paymentMessage}</p>}
                      </div>
                    )}
                    {isAuthenticated && (
                      <div className="account-login-box">
                        <p>Signed in as <b>{profile.email}</b>. Your travel data is syncing with your account.</p>
                        <button className="account-secondary-action" onClick={async () => { await logout(); setPaymentMessage('You have been signed out.'); }}>Sign out</button>
                      </div>
                    )}
                    <div className="account-stat-grid">
                      <button onClick={() => setActivePanel('saved')}><b>{wishlist.length}</b><span>Saved journeys</span></button>
                      <button onClick={() => setActivePanel('cart')}><b>{cartCount}</b><span>Cart items</span></button>
                      <button onClick={() => setActivePanel('bookings')}><b>{bookings.length}</b><span>Bookings</span></button>
                    </div>
                    <div className="account-shortcuts">
                      <button onClick={() => setActivePanel('profile')}>Edit profile <span>↗</span></button>
                      <button onClick={() => setActivePanel('saved')}>View saved journeys <span>↗</span></button>
                      <button onClick={() => setActivePanel('bookings')}>Manage bookings <span>↗</span></button>
                    </div>
                    <p className="account-note">This prototype stores your information in this browser. Account sign-in and cloud sync can be connected in the backend phase.</p>
                  </>
                )}

                {activePanel === 'profile' && (
                  <form className="account-form" onSubmit={async (event) => { event.preventDefault(); try { await saveProfile(profileDraft || { name: '', email: '', phone: '' }); setActivePanel('overview'); } catch (error) { setPaymentMessage(error.message); } }}>
                    <h3>Profile & preferences</h3>
                    <label>Full name<input value={profileDraft?.name || ''} onChange={(e) => setProfileDraft(v => ({ ...v, name: e.target.value }))} placeholder="Your name" /></label>
                    <label>Email address<input type="email" value={profileDraft?.email || ''} readOnly={isAuthenticated} onChange={(e) => setProfileDraft(v => ({ ...v, email: e.target.value }))} placeholder="you@example.com" /></label>
                    <label>Phone number<input value={profileDraft?.phone || ''} onChange={(e) => setProfileDraft(v => ({ ...v, phone: e.target.value }))} placeholder="Phone number" /></label>
                    <button className="account-primary" type="submit">Save profile</button>
                    {paymentMessage && <p className="form-feedback" role="status">{paymentMessage}</p>}
                  </form>
                )}

                {activePanel === 'saved' && (
                  <>
                    <h3>Saved journeys</h3>
                    {wishlist.length === 0 ? <div className="account-empty">No saved journeys yet. Tap the heart on a package to keep it here.</div> :
                      wishlist.map(item => <div className="account-item" key={item.id}>
                        <img src={item.image} alt="" /><div><b>{item.title}</b><small>{item.country} · {item.priceLabel}</small><button onClick={() => addToCart(item)}>Add to cart</button></div>
                        <button className="account-remove" onClick={() => toggleWishlist(item)} aria-label={`Remove ${item.title}`}>×</button>
                      </div>)}
                  </>
                )}

                {activePanel === 'cart' && (
                  <>
                    <h3>Your travel cart</h3>
                    {cart.length === 0 ? <div className="account-empty">Your cart is empty. Explore packages and add a journey to get started.</div> :
                      <>
                        {cart.map(item => <div className="account-item" key={item.id}>
                          <img src={item.image} alt="" /><div><b>{item.title}</b><small>{item.priceLabel} · Qty {item.quantity}</small>
                            <div className="quantity-controls"><button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button><span>{item.quantity}</span><button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button></div>
                          </div><button className="account-remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.title}`}>×</button>
                        </div>)}
                        <div className="account-total"><span>Estimated total</span><b>{formatMoney(cartTotal)}</b></div>
                        <button className="account-primary" onClick={async () => {
                          if (cart.length > 0) {
                            const first = cart[0];
                            const newBooking = await createBooking(first, first.quantity || 1);
                            setAccountOpen(false);
                            openPayment(newBooking);
                          }
                        }}>
                          Checkout & Pay Now <span>↗</span>
                        </button>
                        <small className="account-note">🔒 256-bit SSL encrypted secure checkout via UPI, Card & Net Banking.</small>
                      </>
                    }
                  </>
                )}

                {activePanel === 'bookings' && (
                  <>
                    <h3>My bookings</h3>
                    {bookings.length === 0 ? <div className="account-empty">You don't have any bookings yet. Choose a package and select Book this journey to create a booking record.</div> :
                      bookings.map(booking => {
                        const isPaid = booking.paymentStatus === 'Paid' || booking.status === 'Confirmed';
                        const total = booking.price * booking.travellers;
                        return (
                          <div className="booking-account-card" key={booking.id}>
                            <div>
                              <span className={`booking-state ${isPaid ? 'paid-state' : ''}`}>
                                {isPaid ? 'CONFIRMED · PAID' : booking.status}
                              </span>
                              <small>{booking.id}</small>
                            </div>
                            <b>{booking.title}</b>
                            <p>{booking.country} · {booking.travellers} traveller(s)</p>
                            <div className="account-total">
                              <span>Status: <b>{isPaid ? 'Paid' : 'Unpaid'}</b></span>
                              <b>{formatMoney(total)}</b>
                            </div>
                            
                            {!isPaid && (
                              <button
                                type="button"
                                className="account-primary"
                                style={{ marginTop: '10px', width: '100%', padding: '10px', fontSize: '12px' }}
                                onClick={() => {
                                  setAccountOpen(false);
                                  openPayment(booking);
                                }}
                              >
                                Pay Now {formatMoney(total)} 💳
                              </button>
                            )}

                            {isPaid && (
                              <div style={{ color: '#48bb78', fontSize: '11px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>✓</span> <b>Payment Confirmed</b>
                                {booking.paymentId && <small style={{ color: '#888', marginLeft: 'auto' }}>Ref: {booking.paymentId}</small>}
                              </div>
                            )}

                            <button className="account-cancel-booking" onClick={() => cancelBooking(booking.id)} style={{ marginTop: '8px' }}>
                              Remove booking record
                            </button>
                          </div>
                        );
                      })}
                  </>
                )}

                {activePanel === 'requests' && (
                  <>
                    <h3>Custom trip requests</h3>
                    {tripRequests.length === 0 ? <div className="account-empty">No custom trip requests yet. Submit the custom trip form and your request will appear here.</div> :
                      tripRequests.map(request => <div className="booking-account-card" key={request.id}>
                        <div><span className="booking-state">{request.status}</span><small>{request.id}</small></div>
                        <b>{request.idea}</b><p>{request.month || 'Flexible month'} · {request.travellers} · {request.budget}</p>
                      </div>)}
                  </>
                )}
              </div>

              <div className="account-footer"><span>✳</span> Thoughtful journeys, all in one place.</div>
            </aside>
          </div>
        ), document.body)}

      </nav>
    </header>
  );
}
