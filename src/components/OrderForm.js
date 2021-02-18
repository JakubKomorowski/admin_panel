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
import { v4 as uuidv4 } from "uuid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { addOrder, editOrder } from "../actions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      minWidth: "25ch",
    },
  },
  // root: {
  //   flexGrow: 1,
  // },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const OrderForm = ({ addOrder, orderFormType, editOrder, handleClose }) => {
  const classes = useStyles();
  const [selectedPaymentDate, setSelectedPaymentDate] = useState(new Date());
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(new Date());
  const [currency, setCurrency] = useState("");
  const [priority, setPriority] = useState("");
  const [paid, setPaid] = useState("false");
  const [pamentDateVisible, setPamentDateVisible] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handlePaidChange = (e) => {
    setPaid(e.target.value);
    console.log(paid);
  };

  useEffect(() => {
    setPamentDateVisible(!pamentDateVisible);
  }, [paid]);

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

  const handleOrderForm = (e) => {
    e.preventDefault();

    const formattedPaymentDate = moment(selectedPaymentDate).format(
      "DD/MM/yyyy"
    );
    const formattedDeliveryDate = moment(selectedDeliveryDate).format(
      "DD/MM/yyyy"
    );

    const clientName = e.target.clientName.value;
    // const payment = e.target.payment.value;

    if (orderFormType === "addOrder") {
      const newOrder = {
        clientName,
        // payment,
        currency,
        paid,
        priority,
        paymentDate: formattedPaymentDate,
        deliveryDate: formattedDeliveryDate,
        orderId: uuidv4(),
        products: [],
      };

      addOrder(newOrder);
      setRedirect(true);
    } else {
      const editedOrder = {
        clientName,
        // payment,
        currency,
        paid,
        priority,
        paymentDate: formattedPaymentDate,
        deliveryDate: formattedDeliveryDate,
      };
      editOrder(editedOrder);
      handleClose();
      //miejsce na akcje
    }

    e.target.reset();
    setCurrency("");
    setPriority("");
    setSelectedPaymentDate(new Date());
    setSelectedDeliveryDate(new Date());
  };
  return (
    <>
      <div>
        <form onSubmit={handleOrderForm}>
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
                variant="outlined"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                name="payment"
                label="Payment"
                variant="outlined"
                type="number"
              />
            </Grid> */}
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Paid</FormLabel>

                <RadioGroup
                  aria-label="paid"
                  name="paid"
                  value={paid}
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
              {pamentDateVisible ? (
                <Grid item xs={12}>
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
              ) : (
                <>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                </>
              )}
            </MuiPickersUtilsProvider>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined">
                {orderFormType === "addOrder" ? "Add" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </form>
        {redirect ? <Redirect to="/orders-table" /> : null}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addOrder: (newOrder) => dispatch(addOrder(newOrder)),
  editOrder: (editedOrder) => dispatch(editOrder(editedOrder)),
});

export default connect(null, mapDispatchToProps)(OrderForm);

// export default function RadioButtonsGroup() {
//   const handlePaidChange = (event) => {
//     setValue(event.target.value);
//   };

//   return (
//     <FormControl component="fieldset">
//       <FormLabel component="legend">Gender</FormLabel>
//       <RadioGroup
//         aria-label="gender"
//         name="gender1"
//         value={value}
//         onChange={handlePaidChange}
//       >
//         <FormControlLabel value={false} control={<Radio />} label="Yes" />
//         <FormControlLabel value={true} control={<Radio />} label="No" />
//       </RadioGroup>
//     </FormControl>
//   );
// }
