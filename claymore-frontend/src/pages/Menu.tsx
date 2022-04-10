/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import { Typography, Button } from "@mui/material";
import getMenuImage from "../assets/menu";
import { Link } from "react-router-dom";
import Menu from "../assets/figureMenu";
import "./Menu.css";

interface CartItem {
  itemId: number;
  quantity: number;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  classic: boolean;
}

function App() {
  const [cart, setCart] = useState<Array<CartItem>>([]);
  const [menu, setMenu] = useState<Array<MenuItem>>([]);

  async function fetchMenu() {
    try {
      const response = Menu;
      // await fetch("").then((res) => res.json());
      setMenu(response);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function getName(itemId: number) {
    const item = menu.filter((item) => item.id == itemId)[0];
    return item.name;
  }

  function getPrice(itemId: number) {
    const item = menu.filter((item) => item.id == itemId)[0];
    return item.price;
  }

  function calculateTotal() {
    let total = 0;
    cart.map((item: CartItem) => {
      total += getPrice(item.itemId) * item.quantity;
    });
    return total;
  }

  return (
    <div className="App">
      <Header />
      <div className="pageContent">
        <div className="menuGrid">
          <Typography variant="h4" className="menuHeader">
            Figures
          </Typography>
          {menu.map((item: MenuItem) => {
            if (item.classic) {
              return (
                <MenuItem
                  itemId={item.id}
                  name={item.name}
                  price={item.price}
                  image={getMenuImage(item.name)}
                  cart={cart}
                  setCart={setCart}
                  key={item.name}
                />
              );
            }
          })}
          <Typography variant="h4" className="menuHeader">
            Pre-orders
          </Typography>
          {menu.map((item: MenuItem) => {
            if (!item.classic) {
              return (
                <MenuItem
                  itemId={item.id}
                  name={item.name}
                  price={item.price}
                  image={getMenuImage(item.name)}
                  cart={cart}
                  setCart={setCart}
                  key={item.name}
                />
              );
            }
          })}
        </div>
        <div className="sidebar">
          <div>
            <Typography variant="h5">Shopping Cart</Typography>
            <div className="cartContainer" id="cartContainer">
              {cart.map((item: CartItem) => {
                if (item.quantity > 0) {
                  return (
                    <div className="cartRow" key={item.itemId}>
                      <Typography variant="body1">
                        {getName(item.itemId)}
                      </Typography>
                      <div className="dash" />
                      <Typography variant="body1">
                        {item.quantity} x{" "}
                        {formatter.format(getPrice(item.itemId))}
                      </Typography>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="cartFooter">
            <div className="cartRow">
              <Typography variant="body1">Delivery</Typography>
              <div className="dash" />
              <Typography variant="body1">{formatter.format(1.5)}</Typography>
            </div>
            <div className="cartRow">
              <Typography variant="body1">Total</Typography>
              <div className="dash" />
              <Typography variant="body1">
                {formatter.format(calculateTotal() + 1.5)}
              </Typography>
            </div>
            {cart.length > 0 && (
              <div className="checkout">
                <Link to="/order" state={{ cart: cart }}>
                  <Button variant="contained">Continue to Checkout</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
