import { actionTypes } from "./actionTypes";

export const addOrder = (newOrder) => ({
  type: actionTypes.ADD_ORDER,
  payload: newOrder,
});

export const deleteOrders = (selectedOrders) => ({
  type: actionTypes.DELETE_ORDERS,
  payload: selectedOrders,
});

export const openAddProductModal = (openState) => ({
  type: actionTypes.OPEN_ADD_PRODUCT,
  payload: openState,
});

export const selectOrder = (orderId) => ({
  type: actionTypes.SELECT_ORDER,
  payload: orderId,
});

export const addProduct = (product) => ({
  type: actionTypes.ADD_PRODUCT,
  payload: product,
});

export const editOrder = (editedOrder) => ({
  type: actionTypes.EDIT_ORDER,
  payload: editedOrder,
});

export const removeProduct = (productId) => ({
  type: actionTypes.REMOVE_PRODUCT,
  payload: productId,
});

export const editProduct = (productId) => ({
  type: actionTypes.EDIT_PRODUCT,
  payload: productId,
});

export const selectProductKeyToEdit = (productId, productKeyType) => ({
  type: actionTypes.SELECT_PRODUCT_KEY_TO_EDIT,
  payload: {
    id: productId,
    key: productKeyType,
  },
});

export const saveEditProductKey = (productId, keyType, newKeyValue) => ({
  type: actionTypes.SAVE_PRODUCT_KEY_EDIT,
  payload: {
    productId,
    keyType,
    newKeyValue,
  },
});

export const calculatePayment = () => ({
  type: "CALCULATE_PAYMENT",
});
