import { Typography } from "@mui/material";
import "./Employee.css";
import Payload from "../components/Payload";
import { useEffect, useState } from "react"; 
import figureMenu from "../assets/figureMenu"

interface Order {
  customerId: number;
  items: { itemId: string; quantity: number }[];
  address: string;
  status: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  classic: boolean;
}

function App() {
  const [orders, setOrders] = useState<Record<string, Order>>({});
  const [menu, setMenu] = useState<Record<string, MenuItem>>({});

  const testOrders = [
    {
      id: 1, 
      customerId: 1, 
      items: [{itemId: 1, quantity: 2}],
      address: "5032 Forbes Ave"
    },
    {
      id: 2, 
      customerId: 2, 
      items: [{itemId: 1, quantity: 2}, {itemId: 2, quantity: 1}, {itemId: 4, quantity:1}],
      address: "410 Terry Ave N"
    },
    {
      id: 3, 
      customerId: 3, 
      items: [{itemId: 2, quantity: 3}, {itemId: 4, quantity:1}],
      address: "1 Hacker Way"
    },
  ]

  async function fetchMenu() {
    try {
      const response = await fetch("https://us-central1-claymore-d6749.cloudfunctions.net/default/figure").then((res) => res.json());
      setMenu(response);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchOrders() {
    try {
      const response = await fetch('https://us-central1-claymore-d6749.cloudfunctions.net/default/order').then((res) => (res.json()));
      console.log(response)
      setOrders(response);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, []);

  function getName(itemId: string) {
    if (itemId in menu) {
      return menu[itemId].name;
    } else {
      return "";
    }
  }

  function getItems(ids: { itemId: string; quantity: number }[]) {
    return ids.map((object) => {
      return {
        name: getName(object.itemId),
        quantity: object.quantity,
      };
    });
  }

  return (
    <div className="App">
      <div className="pageContent">
        <div className="payloadList">
          <Typography variant="h4" className="payloadHeader">
            Orders
          </Typography>
          {Object.keys(orders).map((key: string) => {
            const order = orders[key];
            const status = order.status;
            return (
              <Payload
                id={key}
                status={status}
                items={getItems(order.items)}
                address={order.address}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
