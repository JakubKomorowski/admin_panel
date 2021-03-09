import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getOrders } from "../actions";
import { ordersCollection } from "../firebase/firestoreUtils";
import Router from "../routing";
import GlobalStyle from "../theme/GlobalStyle";

const Root = ({ getOrders }) => {
  useEffect(() => {
    const subscribe = ordersCollection.onSnapshot((snapshot) => {
      const dateFromOrdersCollection = snapshot.docs.map((doc) => {
        console.log(doc);
        return {
          orderId: doc.id,
          ...doc.data(),
        };
      });

      getOrders(dateFromOrdersCollection);
    });
    return () => {
      subscribe();
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getOrders: (orders) => dispatch(getOrders(orders)),
});

export default connect(null, mapDispatchToProps)(Root);
