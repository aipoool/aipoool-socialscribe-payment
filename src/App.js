import React from 'react';
import './App.css';
import PayLanding from "./components/payment-landing"; 
import PayAction from "./components/payment-action";
import Success from "./components/success";
import Cancel from "./components/cancel";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
      <Route path='/success' element={<Success />} />
      <Route path='/cancel' element={<Cancel />} />
        <Route path='/choose-your-plan' element={<PayLanding />} />
        <Route path='/make-payment' element={<PayAction />} />
      </Routes>
    </>
  );
}

export default App;
