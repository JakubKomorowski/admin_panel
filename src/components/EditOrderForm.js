import React, { useEffect, useState } from "react";
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { openModal } from "../actions";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormLabel from "@material-ui/core/FormLabel";
import { editOrderFirebase } from "../firebase/firestoreUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      minWidth: "25ch",
    },
  },

  formControl: {
    margin: theme.spacing(0),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EditOrderForm = ({ selectedOrder, closeModal }) => {
  const {
    clientName,
    currency,
    priority,
    paid,
    deliveryDate,
    paymentDate,
  } = selectedOrder;

  const classes = useStyles();

  const arrayOfDateToDisplay = paymentDate.split("/");
  arrayOfDateToDisplay.reverse();

  const paymentMonth = parseInt(arrayOfDateToDisplay[1]) - 1;

  const dateToDisplay = new Date(
    arrayOfDateToDisplay[2],
    `${paymentMonth}`,
    arrayOfDateToDisplay[0]
  );

  const arrayOfDateToDisplay2 = deliveryDate.split("/");
  arrayOfDateToDisplay2.reverse();

  const deliveryMonth = parseInt(arrayOfDateToDisplay2[1]) - 1;

  const dateToDisplay2 = new Date(
    arrayOfDateToDisplay2[2],
    `${deliveryMonth}`,
    arrayOfDateToDisplay2[0]
  );

  console.log(priority);

  const [newSelectedPaymentDate, setNewSelectedPaymentDate] = useState(
    dateToDisplay
  );
  const [newSelectedDeliveryDate, setNewSelectedDeliveryDate] = useState(
    dateToDisplay2
  );
  const [newClientName, setNewClientName] = useState(clientName);
  const [newCurrency, setNewCurrency] = useState(currency);
  const [newPriority, setNewPriority] = useState(priority);
  const [newPaid, setNewPaid] = useState(paid);
  const handlePaidChange = (e) => {
    setNewPaid(e.target.value);
    console.log(paid);
  };

  const handleCurrencyChange = (event) => {
    setNewCurrency(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setNewPriority(event.target.value);
  };

  const handleClientNameChange = (event) => {
    setNewClientName(event.target.value);
  };

  const handlePaymentDateChange = (date) => {
    setNewSelectedPaymentDate(date);
  };

  const handleDeliveryDateChange = (date) => {
    setNewSelectedDeliveryDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPaymentDate = moment(newSelectedPaymentDate).format(
      "yyyy/MM/DD"
    );
    const formattedDeliveryDate = moment(newSelectedDeliveryDate).format(
      "yyyy/MM/DD"
    );

    const order = {
      clientName: newClientName,
      currency: newCurrency,
      priority: newPriority,
      paid: newPaid,
      paymentDate: formattedPaymentDate,
      deliveryDate: formattedDeliveryDate,
    };

    editOrderFirebase(selectedOrder.orderId, order);
    closeModal(false);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            justify="center"
            direction="column"
            spacing={3}
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                name="clientName"
                label="Client Name"
                value={newClientName}
                onChange={handleClientNameChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Currency
                </InputLabel>

                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={newCurrency}
                  onChange={handleCurrencyChange}
                  label="Currency"
                >
                  <MenuItem value="usd">USD</MenuItem>
                  <MenuItem value="eur">EUR</MenuItem>
                  <MenuItem value="pln">PLN</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={newPriority}
                  onChange={handlePriorityChange}
                  label="Priority"
                >
                  <MenuItem value="a">Low</MenuItem>
                  <MenuItem value="b">Mid</MenuItem>
                  <MenuItem value="c">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Paid</FormLabel>

                <RadioGroup
                  aria-label="paid"
                  name="paid"
                  value={newPaid}
                  onChange={handlePaidChange}
                  row
                >
                  <FormControlLabel
                    value={"true"}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={"false"}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {newPaid === "true" ? (
                <>
                  <Grid item xs={12}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Payment date"
                      format="dd/MM/yyyy"
                      value={newSelectedPaymentDate}
                      onChange={handlePaymentDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Delivery date"
                      format="dd/MM/yyyy"
                      value={newSelectedDeliveryDate}
                      onChange={handleDeliveryDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Delivery date"
                    format="dd/MM/yyyy"
                    value={newSelectedDeliveryDate}
                    onChange={handleDeliveryDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              )}
            </MuiPickersUtilsProvider>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedOrder: state.selectedOrder,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: (openState) => dispatch(openModal(openState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderForm);
