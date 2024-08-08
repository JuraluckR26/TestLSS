import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './App';
import Main from './Page/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme();
root.render(
  <Router>
      <Routes>
          <Route path="/" element={<ThemeProvider theme={theme}> <App /></ThemeProvider>} />
          <Route path="/Main" element={<ThemeProvider theme={theme}> <Main /></ThemeProvider>} />    
      </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
