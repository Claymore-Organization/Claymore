import React, { useState } from "react";
import "./MenuItem.css";
import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface CartItem {
  itemId: number;
  quantity: number;
}

interface MenuItemProps {
  itemId: number;
  name: string;
  price: number;
  setCart: React.Dispatch<React.SetStateAction<any>>;
  cart: CartItem[];
  image: any;
}

function MenuItem(props: MenuItemProps) {
  const { itemId, name, price, cart, setCart, image } = props;

  const [quantity, setQuantity] = useState(0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function handleChange(n: number) {
    setQuantity(Math.max(0, n));
    const filtered = cart.filter((item: CartItem) => item.itemId !== itemId);
    setCart([
      ...filtered,
      {
        itemId: itemId,
        quantity: Math.max(0, n),
      },
    ]);
  }

  return (
    <div className="MenuItem">
      <Card variant="outlined">
        <CardContent className="cardContent">
          <div className="info">
            <Typography variant="body1">{name}</Typography>
            <Typography variant="body2">
              {formatter.format(price)} each
            </Typography>
            <div className="quantityRow">
              <IconButton
                className="iconButton"
                id={`add${name.replace(/\s/g, "")}`}
                onClick={() => handleChange(quantity + 1)}
              >
                <AddCircleIcon className="icon" />
              </IconButton>
              <IconButton
                className="iconButton"
                id={`sub${name.replace(/\s/g, "")}`}
                onClick={() => handleChange(quantity - 1)}
              >
                <RemoveCircleIcon className="icon" />
              </IconButton>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="number"
                className="text"
                value={quantity}
                onChange={(event) => {
                  handleChange(parseInt(event.target.value));
                }}
              />
            </div>
          </div>
          <div className="pic">
            <img src={image} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MenuItem;
