import React from 'react';
import StocksContainer from '../containers/StocksContainer';
import Info from '../containers/Info';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1 className="center">Live Collaborative Stock Comparison</h1>
      <StocksContainer />
      <Info />
    </div>
  );
};

export default App;
