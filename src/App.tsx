import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import './styles/globals.css';

// TODO: Replace with your actual Clerk publishable key from your Clerk dashboard
const clerkPubKey = "pk_live_Y2xlcmsud2F3Y2Qub3JnJA";

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route 
              path="/dashboard" 
              element={
                <>
                  <SignedIn>
                    <DashboardPage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Layout>
      </Router>
    </ClerkProvider>
  );
}

export default App;
