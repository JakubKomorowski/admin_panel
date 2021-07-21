import { actionTypes } from "../actions/actionTypes";

// {
//   orderId: 1,
//   clientName: "",
//   payment: 2000,
//   paid: false,
//   deliveryDate: "",
//   paymentDate: "",
//   currency: "",
//   priority: "low",
//   products: [
//     {
//       productId: 1,
//       productName: "first",
//       productPrice: 20,
//       productCategory: "PC",
//       productQuantity: 1,
//     },
//   ],
// },

const initialState = {
  orders: [],
  open: false,
  selectedOrder: null,
  isProductEditing: false,
  selectedProductKeyEditAndId: {
    id: null,
    key: "",
  },
  currentUser: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    case actionTypes.GET_ORDERS:
      return {
        ...state,
        orders: payload,
      };

    case actionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, payload],
      };
    case actionTypes.DELETE_ORDERS:
      const filteredOrders = state.orders.filter(
        (el) => !payload.includes(el.orderId)
      );
      return {
        ...state,
        orders: [...filteredOrders],
      };
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        open: payload,
      };
    case actionTypes.SELECT_ORDER:
      const selectedObject = state.orders.find((el) => el.orderId === payload);
      return {
        ...state,
        selectedOrder: { ...selectedObject },
      };

    case actionTypes.ADD_PRODUCT:
      const mappedOrders = state.orders.map((el) => {
        if (el.orderId === state.selectedOrder.orderId) {
          el.products = [...el.products, payload];
        }
        return el;
      });
      return {
        ...state,
        orders: [...mappedOrders],
      };

    case actionTypes.EDIT_ORDER:
      const ordersAfterMaping = state.orders.map((el) => {
        if (el.orderId === state.selectedOrder.orderId) {
          el = {
            orderId: el.orderId,
            products: el.products,
            ...payload,
          };
        }
        return el;
      });
      return {
        ...state,
        orders: [...ordersAfterMaping],
      };

    case actionTypes.REMOVE_PRODUCT:
      const orderAfterRemoveProduct = state.orders.map((el) => {
        if (el.orderId === state.selectedOrder.orderId) {
          el.products = el.products.filter((el) => {
            return el.productId !== payload;
          });
        }
        return el;
      });

      const selectedOrderProductsAfterRemoving = state.selectedOrder.products.filter(
        (el) => {
          return el.productId !== payload;
        }
      );

      return {
        ...state,
        orders: [...orderAfterRemoveProduct],
        selectedOrder: {
          ...state.selectedOrder,
          products: selectedOrderProductsAfterRemoving,
        },
      };

    case actionTypes.SELECT_PRODUCT_KEY_TO_EDIT:
      return {
        ...state,
        selectedProductKeyEditAndId: {
          id: payload.id,
          key: payload.key,
        },
      };

    case actionTypes.SAVE_PRODUCT_KEY_EDIT:
      const ordersAfterEditingSingleProduct = state.orders.map((order) => {
        if (order.orderId === state.selectedOrder.orderId) {
          order.products = order.products.map((product) => {
            if (product.productId === payload.productId) {
              product[payload.keyType] = payload.newKeyValue;
            }
            return product;
          });
        }
        return order;
      });

      return {
        ...state,
        orders: [...ordersAfterEditingSingleProduct],
        // Zmiana key na pustego stringa żeby nie pasował do żadnego warunku w DisplayProductsOrder,
        // zeby save zamknelo edytowanie
        selectedProductKeyEditAndId: {
          id: payload.id,
          key: "",
        },
      };

    case actionTypes.CALCULATE_PAYMENT:
      const calculatedTotalPrice = state.orders.map((el) => {
        if (el.orderId === state.selectedOrder.orderId) {
          let totalPrice = 0;
          el.products.forEach((product) => {
            totalPrice =
              totalPrice + product.productPrice * product.productQuantity;
          });
          el.payment = totalPrice;
        }
        return el;
      });
      return {
        ...state,
        orders: [...calculatedTotalPrice],
      };

    default:
      return state;
  }
};

export default reducer;
