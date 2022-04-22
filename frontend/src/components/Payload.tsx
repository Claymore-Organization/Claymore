import React, {useState} from "react";
import "./Payload.css";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface PayloadProps {
  id: string;
  items: { name: string; quantity: number }[];
  address: string;
  status: string;
}

function Payload(props: PayloadProps) {
  const { id, items, status, address } = props;

  return (
    <div className="Payload">
      <Card variant="outlined">
        <CardContent className="cardContent">
          <div className="info">
            <Typography variant="h6">
              {id} - {status}
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
          </div>
          <div className="assignedDrone">
            <Typography variant="body1">Ship To</Typography>
            <Typography variant="body1">{address}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Payload;
