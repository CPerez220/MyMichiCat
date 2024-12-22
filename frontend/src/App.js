import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ProfileForm from './pages/ProfileForm';
import QRCodePage from './pages/QRCodePage';
import './App.css';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile/:id" element={<ProfileForm />} />
          <Route path="/qrcode/:id" element={<QRCodePage />} />
        </Routes>
      </Router>
    );
  }

export default App;