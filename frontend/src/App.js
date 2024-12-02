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
import Test from './client/vis_code_data'; // MongoDB data visualization page
import ResultPage from "./client/test_pop_up"; // Page pour afficher les résultats

const App = () => {
  return (
    <Router>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppAppBar />
      </AppTheme>
      <div style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
      	  <Route path="/" element={<MarketingPage />} />
          <Route path="/signin" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/provider" element={<Providers />} />
          <Route path="/testdata" element={<CsvPreview />} />
          <Route path="/visdata" element={<Test />} /> {/* Route pour Test */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;

