import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { productsCategories } from "../data";
import { connect } from "react-redux";
import { addProduct, openModal } from "../actions";
import styled from "styled-components";
import { handleProducts } from "../firebase/firestoreUtils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StyledH2 = styled.h2`
  margin-bottom: 1rem;

  text-align: center;
`;

const AddProductForm = ({ addProduct, selectedOrder, openModal }) => {
  const [categories, setCategories] = useState("");
  const classes = useStyles();

  const handleClose = () => {
    openModal(false);
  };

  const handleCategoryChange = (event) => {
    setCategories(event.target.value);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productName = e.target.productName.value;
    const productPrice = parseInt(e.target.productPrice.value);
    const productCategory = categories;
    const productQuantity = parseInt(e.target.productQuantity.value);
    const productId = Math.round(Math.random() * 1000);

    const product = {
      productName,
      productPrice,
      productCategory,
      productQuantity,
      productId,
    };

    handleProducts([...selectedOrder.products, product], selectedOrder.orderId);
    e.target.reset();
    setCategories("");
  };

  return (
    <>
      <StyledH2>Add product</StyledH2>

      <form
        style={{ marginTop: "20px" }}
        onSubmit={handleAddProduct}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          justify="center"
          direction="column"
          spacing={3}
          alignItems="center"
        >
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              name="productName"
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Product Price"
              variant="outlined"
              type="number"
              name="productPrice"
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Product Quantity"
              type="number"
              variant="outlined"
              name="productQuantity"
            />
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={categories}
                onChange={handleCategoryChange}
                label="Categories"
              >
                {productsCategories.map((el) => {
                  return <MenuItem value={el}>{el}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined" onClick={handleClose}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedOrder: state.selectedOrder,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product)),
  openModal: (openState) => dispatch(openModal(openState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);
