import React from 'react';
import './Header.css'
import logo from '../assets/claymore.png';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  let loginElement = <></>
  if (user == null) {
    loginElement = <li className="Header-item"><a className="Header-link" href="/login">Login</a></li>
  } else{
    loginElement = <li className="Header-item"><a className="Header-link" href="/logout">Logout</a></li>
  }
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
          {loginElement}
        </ul>
      </div>
    </div>
  );
}

export default Header;
