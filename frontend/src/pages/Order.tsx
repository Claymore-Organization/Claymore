/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "../components/AddressForm";
import TimeEstimate from "../components/TimeEstimate";
import PaymentForm from "../components/PaymentForm";
import Header from "../components/Header";
import Menu from "../assets/menu";
import figureMenu from "../assets/figureMenu";
import "./Order.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  classic: boolean;
}

function App() {
  const location = useLocation();
  const { cart } = location.state;

  const orderSummary = cart;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [menu, setMenu] = useState<Map<string, MenuItem>>({});
  const [firstname, setFirstname] = useState<string>("Michael")
  const [lastname, setLastname] = useState<string>("Hilton")
  const [address, setAddress] = useState<string>("5000 Forbes Ave")
  const [city, setCity] = useState<string>("Pittsburgh")
  const [state, setState] = useState<string>("PA")
  const [zip, setZip] = useState<number>(15213)
  const [country, setCountry] = useState<string>("USA")

  async function fetchMenu() {
    try {
      const response = await fetch(
        "https://us-central1-claymore-d6749.cloudfunctions.net/default/figure"
      ).then((res) => res.json());
      setMenu(response);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  function getPrice(itemId: string) {
    const item = menu[itemId];
    return item.price;
  }

  function getName(itemId: string) {
    const item = menu[itemId];
    return item.name;
  }

  function calculateTotal() {
    let total = 0;
    cart.map((item: CartItem) => {
      total += getPrice(item.itemId) * item.quantity;
    });
    return total;
  }

  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: "Michael Hilton" },
    { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date", detail: "04/2024" },
  ];

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" to="/menu">
          Claymore
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const steps = [
    "Shipping address",
    "Time Estimate",
    "Payment details",
    "Review your order",
  ];

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm
                firstname={firstname}
                setFirstname={setFirstname}
                lastname={lastname}
                setLastname={setLastname}
                address={address}
                setAddress={setAddress}
                city={city}
                setCity={setCity}
                zip={zip}
                setZip={setZip}
                state={state}
                setState={setState}
                country={country}
                setCountry={setCountry}
              />;
      case 1:
        return <TimeEstimate address={fullAddress} />;
      case 2:
        return <PaymentForm />;
      case 3:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {cart.map((item, i) => {
                if (item.quantity > 0) {
                  return (
                    <ListItem key={i} sx={{ py: 1, px: 0 }}>
                      <ListItemText primary={getName(item.itemId)} />
                      <Typography variant="body2">
                        {item.quantity} x{" "}
                        {formatter.format(getPrice(item.itemId))}
                      </Typography>
                    </ListItem>
                  );
                }
              })}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {formatter.format(calculateTotal())}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Delivery
                </Typography>
                <Typography gutterBottom>{firstname + " " + lastname}</Typography>
                <Typography gutterBottom>{fullAddress}</Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Payment details
                </Typography>
                <Grid container>
                  {payments.map((payment) => (
                    <React.Fragment key={payment.name}>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.detail}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const theme = createTheme();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    handleNext();

    const data = {
      customerId: Math.round(100 * Math.random()),
      items: cart,
      address: fullAddress,
    };

    console.log(JSON.stringify(data));
    console.log(activeStep);

    // Add the following code once DB is set up
    // try {
    //   console.log(JSON.stringify(data));
    //   const sendData = axios
    //     .post("", data)
    //   console.log(sendData);
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const fullAddress = [address, city, state, zip, country].join(", ")

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Header />
        <div className="pageContent">
          <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      {`Your order number is #54. We have emailed your order
                      confirmation, and your order should arrive to ${fullAddress} in 15-20 minutes.`}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep !== 0 && (
                        <Button
                          className="backwardButton"
                          onClick={handleBack}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        className="forwardButton"
                        variant="contained"
                        onClick={
                          activeStep === steps.length - 1
                            ? handleSubmit
                            : handleNext
                        }
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {activeStep === steps.length - 1
                          ? "Place order"
                          : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
            <Copyright />
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
