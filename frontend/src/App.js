import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignInSide from './sign-in-side/SignInSide';
import Dashboard from './dashboard/Dashboard';
import MarketingPage from './marketing-page/MarketingPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
	  <Route path="/" element={<MarketingPage />} />
          <Route path="/signin" element={<SignInSide />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

