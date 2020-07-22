import React from 'react';
import './App.css';
import DataLoader from '../DataLoader/DataLoader'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        {DataLoader()}  
      </header>
    </div>
  );
}

export default App;
