import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TravelProvider } from './TravelStore';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID_NOT_CONFIGURED'}>
      <BrowserRouter>
        <TravelProvider>
          <App />
        </TravelProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
