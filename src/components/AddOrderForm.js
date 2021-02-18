import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { addOrder } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OrdersTable from "./OrdersTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddOrderForm = ({ addOrder }) => {
  const classes = useStyles();
  const [selectedPaymentDate, setSelectedPaymentDate] = useState(new Date());
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(new Date());
  const [currency, setCurrency] = useState("");
  const [priority, setPriority] = useState("");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handlePaymentDateChange = (date) => {
    setSelectedPaymentDate(date);
  };

  const handleDeliveryDateChange = (date) => {
    setSelectedDeliveryDate(date);
  };

  const handleAddOrder = (e) => {
    e.preventDefault();

    const formattedPaymentDate = moment(selectedPaymentDate).format(
      "DD/MM/yyyy"
    );
    const formattedDeliveryDate = moment(selectedDeliveryDate).format(
      "DD/MM/yyyy"
    );

    const clientName = e.target.clientName.value;
    const payment = e.target.payment.value;

    const newOrder = {
      clientName,
      payment,
      currency,
      priority,
      paymentDate: formattedPaymentDate,
      deliveryDate: formattedDeliveryDate,
      orderId: uuidv4(),
      products: [],
    };

    addOrder(newOrder);

    e.target.reset();
    setCurrency("");
    setPriority("");
    setSelectedPaymentDate(new Date());
    setSelectedDeliveryDate(new Date());
  };
  return (
    <>
      <div>
        <form onSubmit={handleAddOrder}>
          <Grid container justify="center" direction="column" spacing={3}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                name="clientName"
                label="Client Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                name="payment"
                label="Payment"
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Currency
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={currency}
                  onChange={handleCurrencyChange}
                  label="Currency"
                >
                  <MenuItem value="usd">USD</MenuItem>
                  <MenuItem value="eur">EUR</MenuItem>
                  <MenuItem value="pln">PLN</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={priority}
                  onChange={handlePriorityChange}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="mid">Mid</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Payment date"
                  format="dd/MM/yyyy"
                  value={selectedPaymentDate}
                  onChange={handlePaymentDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Delivery date"
                  format="dd/MM/yyyy"
                  value={selectedDeliveryDate}
                  onChange={handleDeliveryDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item xs={6}>
              {/* <Link to="/orders-table"> */}
              <Button type="submit" variant="outlined">
                Add
              </Button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addOrder: (newOrder) => dispatch(addOrder(newOrder)),
});

export default connect(null, mapDispatchToProps)(AddOrderForm);
