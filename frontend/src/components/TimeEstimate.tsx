import * as React from 'react';
import Typography from '@mui/material/Typography';
import CMUMap from "../assets/CMUMap.jpg";

const addresses = ['5000 Forbes Ave', 'Pittsburgh', 'PA', '15213', 'USA'];

export default function TimeEstimate() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Estimated Time
      </Typography>
      <Typography variant="h5" gutterBottom>
        Delivery to the following address will take approximately 15-20 minutes.
      </Typography>
      <Typography gutterBottom>{addresses.join(', ')}</Typography>
      <div>
        <img src={CMUMap} /> 
      </div>
    </React.Fragment>
  );
}