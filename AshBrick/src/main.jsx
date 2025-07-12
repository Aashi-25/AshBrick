// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // ✅ Needed for routing
import App from './App.jsx';
import './index.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    {/* ✅ Provide routing context here */}
      <AuthProvider>   {/* ✅ Provide auth context here */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
