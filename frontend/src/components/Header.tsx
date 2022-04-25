import React from 'react';
import './Header.css'
import logo from '../assets/claymore.png';

function Header() {
  return (
    <div className="Header">
      <div className="Header-img">
        <a href="/"><img className="logo" src={logo} /></a>
      </div>
      <div className="Header-items">
        <ul className="Header-list">
          <li className="Header-item"><a className="Header-link" href="/menu">Shop</a></li>
          <li className="Header-item"><a className="Header-link" href="/forum">Forum</a></li>
          <li className="Header-item"><a className="Header-link" href="/employee">Employee</a></li>
          <li className="Header-item"><a className="Header-link" href="/addFigure">Owner</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
