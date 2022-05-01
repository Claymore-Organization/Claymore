/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState, useEffect } from "react";
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
  image: string;
  price: number;
  classic: boolean;
}

function App() {
  const [cart, setCart] = useState<Array<CartItem>>([]);
  const [menu, setMenu] = useState<Map<string, MenuItem>>([]);

  async function fetchMenu() {
    try {
      const response = await fetch("https://us-central1-claymore-d6749.cloudfunctions.net/default/figure").then((res) => res.json());
      console.log(response)
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

  function getName(itemId: string) {
    const item = menu[itemId];
    return item.name;
  }

  function getPrice(itemId: string) {
    const item = menu[itemId];
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
      <div className="pageContent">
        <div className="menuGrid">
          <Typography variant="h4" className="menuHeader">
            Figures
          </Typography>
          {Object.keys(menu).map((key: string) => {
            const item: MenuItem = menu[key]
            if (item.present) {
              return (
                <MenuItem
                  itemId={key}
                  name={item.name}
                  price={item.price}
                  image={item.image}
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
          {Object.values(menu).map((item: MenuItem) => {
            if (!item.present) {
              return (
                <MenuItem
                  itemId={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
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
              <Typography variant="body1">Total</Typography>
              <div className="dash" />
              <Typography variant="body1">
                {formatter.format(calculateTotal())}
              </Typography>
            </div>
            {calculateTotal() > 0 && (
              <div className="checkout">
                <Link to="/order" state={{ cart: cart }} className="checkoutLink">
                  <Button sx={{backgroundColor:"black"}} variant="contained">Continue to Checkout</Button>
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
