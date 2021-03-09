import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import { saveEditProductKey } from "../../actions";
import { productsCategories, productsKeyTypes } from "../../data";
import styled from "styled-components";
import { handleProducts } from "../../firebase/firestoreUtils";

const StyledTextInput = styled(TextField)`
  width: 120px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    display: "flex",
    justifyContent: "space-between",
    "& > *": {
      marginRight: "10px",
    },
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150,
    "& > *": {
      marginRight: "10px",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EditProductKeyForm = ({
  productType,
  productKeyType,
  productId,
  saveEditProductKey,
  selectedOrder,
}) => {
  const classes = useStyles();

  const [category, setCategory] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (productKeyType === productsKeyTypes.productCategory) {
      saveEditProductKey(productId, productKeyType, category);

      const productsAfterEdit = selectedOrder.products.map((product) => {
        if (product.productId === productId) {
          product.productCategory = category;
        }
        return product;
      });

      handleProducts(productsAfterEdit, selectedOrder.orderId);
    } else {
      let newKeyValue;

      if (e.target.value.type === "number") {
        newKeyValue = parseInt(e.target.value.value);
      } else {
        newKeyValue = e.target.value.value;
      }

      saveEditProductKey(productId, productKeyType, newKeyValue);

      const productsAfterEdit = selectedOrder.products.map((product) => {
        if (product.productId === productId) {
          product[productKeyType] = newKeyValue;
        }
        return product;
      });

      handleProducts(productsAfterEdit, selectedOrder.orderId);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={classes.root}>
      {productKeyType === productsKeyTypes.productCategory ? (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Categories
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Categories"
          >
            {productsCategories.map((el) => {
              return <MenuItem value={el}>{el}</MenuItem>;
            })}
          </Select>
        </FormControl>
      ) : (
        <StyledTextInput
          variant="outlined"
          label={productType}
          name="value"
          type={typeof productType}
          size="small"
        />
      )}

      <Button variant="outlined" type="submit" color="primary">
        save
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  selectedOrder: state.selectedOrder,
});

const mapDispatchToProps = (dispatch) => ({
  saveEditProductKey: (productId, keyType, newKeyValue) =>
    dispatch(saveEditProductKey(productId, keyType, newKeyValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductKeyForm);
