import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './pages/App';
import CartPage from './pages/Cart';
import MenuPage from './pages/Menu';
import OrderPage from './pages/Order';
import EmployeePage from './pages/Employee'
import AddFigurePage from './pages/AddFigure'
import NewPostPage from './pages/NewPost'

import reportWebVitals from './reportWebVitals';
import Forum from './pages/Forum';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="menu" element={<MenuPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="order" element={<OrderPage />} />
      <Route path="employee" element={<EmployeePage />} />
      <Route path="addFigure" element={<AddFigurePage />} />
      <Route path="newPost" element={<NewPostPage />} />
      <Route path="forum" element={<Forum />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
