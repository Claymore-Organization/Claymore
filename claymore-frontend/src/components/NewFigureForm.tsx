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
  const [id, setId] = React.useState(-1);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(-1.0);
  const [stock, setStock] = React.useState(-1);

  const handleSubmit = () => {

    const data = {'id': id,
      'name': name,
      'price': price,
      'current_stock': stock
    };

    // try {
    //   const sendData = axios.post('', data);
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Post New Shop Item (Post Button only shows up if valid info is filled)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="itemId"
            label="Item ID (Integer)"
            fullWidth
            variant="standard"
            type="number"
            onChange={(event) => {
              setId(parseInt(event.target.value));
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
        {
          id > 0 && name != '' && price > 0.0 && stock > 0 && (
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSubmit}>Post Item</Button>
            </Grid>
          )
        }
        
      </Grid>
    </React.Fragment>
  );
}