import React from 'react';
import { AuthProvider } from './components/AuthContext';
import App from './App';

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
