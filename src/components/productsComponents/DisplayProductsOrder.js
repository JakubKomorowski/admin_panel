import React from "react";
import { connect } from "react-redux";
import { removeProduct, selectProductKeyToEdit } from "../../actions";
import { productsKeyTypes } from "../../data";
import EditProductKeyForm from "./EditProductKeyForm";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { handleProducts } from "../../firebase/firestoreUtils";

const StyledUl = styled.ul`
  list-style: none;
  li {
    border-bottom: 1px solid black;
    padding-bottom: 1rem;
  }
`;

const StyledKey = styled.p`
  font-weight: bold;
  min-width: 100px;
`;

const StyledValue = styled.p`
  min-width: 120px;
`;

const StyledValueAndKey = styled.div`
  display: flex;
`;

const StyledProductFeature = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

const DisplayProductsOrder = ({
  selectedOrder,
  removeProduct,
  selectedProductKeyEditAndId,
  selectProductKeyEdit,
}) => {
  const { key, id } = selectedProductKeyEditAndId;

  const removeProductFromDatabase = (id) => {
    const filteredProducts = selectedOrder.products.filter((product) => {
      return product.productId !== id;
    });

    handleProducts([...filteredProducts], selectedOrder.orderId);
  };
  return (
    <>
      <h2>Products list</h2>

      <StyledUl>
        {selectedOrder.products.map(
          ({
            productName,
            productPrice,
            productCategory,
            productQuantity,
            productId,
          }) => {
            return (
              <li key={productId}>
                {key === productsKeyTypes.productName && id === productId ? (
                  <StyledProductFeature>
                    <StyledKey>Name:</StyledKey>
                    <EditProductKeyForm
                      productType={productName}
                      productId={productId}
                      productKeyType={productsKeyTypes.productName}
                    />
                  </StyledProductFeature>
                ) : (
                  <>
                    <StyledProductFeature>
                      <StyledValueAndKey>
                        <StyledKey>Name:</StyledKey>
                        <StyledValue>{productName}</StyledValue>
                      </StyledValueAndKey>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          selectProductKeyEdit(
                            productId,
                            productsKeyTypes.productName
                          )
                        }
                      >
                        edit
                      </Button>
                    </StyledProductFeature>
                  </>
                )}
                {key === productsKeyTypes.productPrice && id === productId ? (
                  <StyledProductFeature>
                    <StyledKey>Price:</StyledKey>
                    <EditProductKeyForm
                      productType={productPrice}
                      productId={productId}
                      productKeyType={productsKeyTypes.productPrice}
                    />
                  </StyledProductFeature>
                ) : (
                  <>
                    <StyledProductFeature>
                      <StyledKey>Price:</StyledKey>
                      <StyledValue>{productPrice}</StyledValue>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          selectProductKeyEdit(
                            productId,
                            productsKeyTypes.productPrice
                          )
                        }
                      >
                        Edit
                      </Button>
                    </StyledProductFeature>
                  </>
                )}

                {key === productsKeyTypes.productCategory &&
                id === productId ? (
                  <StyledProductFeature>
                    <StyledKey>Category:</StyledKey>
                    <EditProductKeyForm
                      productType={productCategory}
                      productId={productId}
                      productKeyType={productsKeyTypes.productCategory}
                    />
                  </StyledProductFeature>
                ) : (
                  <>
                    <StyledProductFeature>
                      <StyledKey>Category:</StyledKey>
                      <StyledValue>{productCategory}</StyledValue>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          selectProductKeyEdit(
                            productId,
                            productsKeyTypes.productCategory
                          )
                        }
                      >
                        edit
                      </Button>
                    </StyledProductFeature>
                  </>
                )}

                {key === productsKeyTypes.productQuantity &&
                id === productId ? (
                  <StyledProductFeature>
                    <StyledKey>Quantity:</StyledKey>
                    <EditProductKeyForm
                      productType={productQuantity}
                      productId={productId}
                      productKeyType={productsKeyTypes.productQuantity}
                    />
                  </StyledProductFeature>
                ) : (
                  <>
                    <StyledProductFeature>
                      <StyledKey>Quantity:</StyledKey>
                      <StyledValue>{productQuantity}</StyledValue>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          selectProductKeyEdit(
                            productId,
                            productsKeyTypes.productQuantity
                          )
                        }
                      >
                        edit
                      </Button>
                    </StyledProductFeature>
                  </>
                )}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    removeProductFromDatabase(productId);
                    removeProduct(productId);
                  }}
                >
                  Remove
                </Button>
              </li>
            );
          }
        )}
      </StyledUl>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedOrder: state.selectedOrder,
  isProductEditing: state.isProductEditing,
  selectedProductKeyEditAndId: state.selectedProductKeyEditAndId,
});

const mapDispatchToProps = (dispatch) => ({
  removeProduct: (productId) => dispatch(removeProduct(productId)),
  selectProductKeyEdit: (productId, productKeyType) =>
    dispatch(selectProductKeyToEdit(productId, productKeyType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayProductsOrder);
