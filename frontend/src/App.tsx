import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routers from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routers/>
    </BrowserRouter>
  );
}

export default App;
