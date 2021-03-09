import { firestore } from "./firebaseConfig";

export const ordersCollection = firestore.collection("orders");

export const addOrder = (order) => {
  ordersCollection.add(order);
};

export const deleteOrderFromFirestore = (ordersToDelete) => {
  ordersToDelete.forEach((orderId) => {
    ordersCollection.doc(orderId).delete();
  });
};

export const editOrderFirebase = (orderId, order) => {
  ordersCollection.doc(orderId).update({
    ...order,
  });
};

export const handleProducts = (productArray, orderId) => {
  let tempPayment = 0;

  productArray.forEach((product) => {
    tempPayment += product.productPrice * product.productQuantity;
  });

  ordersCollection.doc(orderId).update({
    products: productArray,
    payment: tempPayment,
  });
};
