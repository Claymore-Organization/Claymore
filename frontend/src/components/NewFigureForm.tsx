/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Button} from "@mui/material";
import axios from 'axios';

export default function NewFigureForm() {
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(-1.0);
  const [stock, setStock] = React.useState(-1);
  const [present, setPresent] = React.useState(true);

  const handleSubmit = () => {

    const data = {'id': id,
      'name': name,
      'price': price,
      'current_stock': stock,
      'present': present
    };

    console.log(data)

    // try {
    //   const sendData = axios.post('', data);
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add New Shop Item
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="itemId"
            label="Item ID (String)"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="itemName"
            label="Item Name"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="price"
            label="Item Price (Float)"
            fullWidth
            variant="standard"
            type="number"
            onChange={(event) => {
              setPrice(parseFloat(event.target.value));
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="stock"
            label="Item Stock"
            fullWidth
            variant="standard"
            type="number"
            onChange={(event) => {
              setStock(parseInt(event.target.value));
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          Is this a pre-order item?
          <Checkbox
            id = "present"
            onChange={(event) => {
              setPresent(!(event.target.checked));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button disabled={!(id != '' && name != '' && price > 0.0 && stock > 0)} variant="contained" onClick={handleSubmit}>Add Item</Button>
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}