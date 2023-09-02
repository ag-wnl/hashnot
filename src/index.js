import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthContextProvider } from "./context/authContext";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  
);


// <Auth0Provider
// domain="dev-04wzgolmui7x1o88.us.auth0.com"
// clientId="nB9iSelCY6IsFiw2Lb0bbz4fWS9ZzWWN"
// authorizationParams={{
//   redirect_uri: window.location.origin
// }}
// >
// <App />
// </Auth0Provider>
