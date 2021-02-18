import React from "react";
import OrderForm from "../components/OrderForm";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: calc(100vw - 50px);
`;

const OrderFormWrapper = styled.div`
  max-width: 500px;
  background-color: white;
  border-radius: 20px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.14);
  padding: 2rem;
  margin: 0 auto;
  margin-top: -15vh;
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

const AddOrder = () => {
  return (
    <Wrapper>
      <BlueStripe>
        <h1>Add Order</h1>
      </BlueStripe>
      <OrderFormWrapper>
        <OrderForm orderFormType="addOrder" />
      </OrderFormWrapper>
    </Wrapper>
  );
};

export default AddOrder;
