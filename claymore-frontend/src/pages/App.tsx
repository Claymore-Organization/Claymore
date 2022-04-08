import React from 'react';
import { Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Link to="/menu">Customer Menu</Link>
        </p>
        <p>
          <Link to="/employee">Employee Payloads</Link>
        </p>
        <p>
          <Link to="/addFigure">Employee Add Shop Item</Link>
        </p>
      </header>
    </div>
  );
}

export default App;
