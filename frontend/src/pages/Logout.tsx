
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
function Logout() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    console.log(user)
    if (user == null) navigate("/");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <button className="login__btn login__google" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Logout;