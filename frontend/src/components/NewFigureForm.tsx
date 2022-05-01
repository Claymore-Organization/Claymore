/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {Button} from "@mui/material";
import axios from 'axios';
import { figure_path } from '../config';

export default function NewFigureForm() {
  const [name, setName] = React.useState('');
  const [img, setImg] = React.useState('');
  const [price, setPrice] = React.useState(-1.0);
  const [stock, setStock] = React.useState(-1);
  const [present, setPresent] = React.useState(true);
  const [postSuccess, setPostSuccess] = React.useState(false);
  const [postFail, setPostFail] = React.useState(false); 

  const handleSubmit = () => {

    const data = {
      'name': name,
      'image': img,
      'price': price,
      'stock': stock,
      'present': present
    };

    try {
      const sendData = axios.post(figure_path, data);
    } catch (e) {
      console.error(e);
      setPostFail(true);
      return;
    }

    setPostSuccess(true);
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
            id="imageURL"
            label="Image URL"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setImg(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="price"
            label="Item Price"
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
          <Button disabled={!(name != '' && price > 0.0 && stock > 0)} variant="contained" onClick={handleSubmit}>Add Item</Button>
        </Grid>
        {
          postFail && 
          <Typography color='red'>Failed to add item, check console</Typography>
        }
        {
          postSuccess && 
          <Typography color='green'>Item added! Check menu for update</Typography>
        }
        
      </Grid>
    </React.Fragment>
  );
}