import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import './styles/globals.css';

// For development - replace with your actual Clerk publishable key
// Get it from: https://dashboard.clerk.com/
const clerkPubKey = "pk_test_placeholder";

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={
              <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 via-blue-50 to-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Clerk Not Configured</h2>
                  <p className="text-gray-600 mb-4">
                    Please set up your Clerk publishable key to enable authentication.
                  </p>
                  <a 
                    href="https://dashboard.clerk.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Get Your Key →
                  </a>
                </div>
              </div>
            } />
            <Route path="/signup" element={
              <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 via-blue-50 to-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Clerk Not Configured</h2>
                  <p className="text-gray-600 mb-4">
                    Please set up your Clerk publishable key to enable authentication.
                  </p>
                  <a 
                    href="https://dashboard.clerk.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Get Your Key →
                  </a>
                </div>
              </div>
            } />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Layout>
      </Router>
    </ClerkProvider>
  );
}

export default App;
