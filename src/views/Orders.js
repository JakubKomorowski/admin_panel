import React from "react";
import OrdersTable from "../components/OrdersTable";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: calc(100vw - 50px);
`;

const BlueStripe = styled.div`
  height: 30vh;

  width: 100%;
  height: 30vh;
  background: #219ebc;
  h1 {
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    padding: 2.5vw;
  }
`;

const OrdersTableWrapper = styled.div`
  margin-top: -15vh;
`;

const Orders = () => {
  return (
    <Wrapper>
      <BlueStripe>
        <h1>Orders Table</h1>
      </BlueStripe>
      <OrdersTableWrapper>
        <OrdersTable />
      </OrdersTableWrapper>
    </Wrapper>
  );
};

export default Orders;
