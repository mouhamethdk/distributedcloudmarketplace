import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignInSide from './sign-in-side/SignInSide';
import Dashboard from './dashboard/Dashboard';
import MarketingPage from './marketing-page/MarketingPage';
import SignUp from './sign-up/SignUp';
import AppAppBar from './marketing-page/components/AppAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './shared-theme/AppTheme';
import Providers from './providers/providers'
import CsvPreview from './client/test'

const App = () => {
  return (
    <Router>
      <AppTheme>
        <CssBaseline enableColorScheme />
{/*       <AppAppBar />  afficher la navbar*/}   
      </AppTheme>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
	  <Route path="/" element={<MarketingPage />} />
          <Route path="/signin" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/provider" element={<Providers />} />
          <Route path="/testdata" element={<CsvPreview />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

