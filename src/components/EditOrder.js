import React from "react";
import OrderForm from "./OrderForm";
import styled from "styled-components";
import EditOrderForm from "./EditOrderForm";

const StyledH2 = styled.h2`
  margin-bottom: 1rem;

  text-align: center;
`;

const EditOrder = ({ handleClose }) => {
  return (
    <div>
      <StyledH2>Edit Order</StyledH2>
      <EditOrderForm handleClose={handleClose} />
    </div>
  );
};

export default EditOrder;
