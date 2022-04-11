import React, {useState} from "react";
import "./Payload.css";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface OrderStatus {
  orderId: number;
  drontId: number;
  status: string;
}

interface PayloadProps {
  id: number;
  droneId: number;
  items: { name: string; quantity: number }[];
  status: string;
  statuses: Array<OrderStatus>;
  setStatuses: any;
}

function Payload(props: PayloadProps) {
  const { id, droneId, items, status, statuses, setStatuses } = props;

  const item = statuses.filter((item) => item.orderId == id)[0];
  let inDatabase = true;
  if (!item) {
    inDatabase = false;
  }

  const [curStatus, setCurStatus] = useState("Pending");


  return (
    <div className="Payload">
      <Card variant="outlined">
        <CardContent className="cardContent">
          <div className="info">
            <Typography variant="h6">
              Order #{id} - {inDatabase ? status : curStatus}
            </Typography>
            {items.map((item, index) => {
              return (
                <div className="cartRow" key={index}>
                  <Typography variant="body1">{item.name}</Typography>
                  <div className="dash" />
                  <Typography variant="body1">x {item.quantity}</Typography>
                </div>
              );
            })}
            {(inDatabase ? status : curStatus) == "Pending" && (
              <div>
                <Button
                  variant="contained"
                  className="sendButton"
                  onClick={() => {
                    if (inDatabase) {
                      const filtered = statuses.filter((item) => item.orderId != id);
                      const item = statuses.filter((item) => item.orderId == id)[0];
                      item.status = "Sent";
                        setStatuses([...filtered, item]);
                    } else {
                      setCurStatus("Sent");
                    }
                  }}
                >
                  Send Drone
                </Button>
              </div>
            )}
          </div>
          <div className="assignedDrone">
            <Typography variant="body1">Load To</Typography>
            <Typography variant="h3">D{droneId}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Payload;
