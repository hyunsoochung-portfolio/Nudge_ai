import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import SelectionScreen from './SelectionScreen';
import ChildApp from './ChildApp';
import ParentApp from './ParentApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/select" element={<SelectionScreen />} />
        <Route path="/child" element={<ChildApp />} />
        <Route path="/parent" element={<ParentApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;