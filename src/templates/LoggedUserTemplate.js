import React from "react";
import NavBar from "../components/nav/NavBar";
import styled from "styled-components";
import { loggedUserRoutes } from "../routes";
import AddOrder from "../views/AddOrder";
import Orders from "../views/Orders";
import { Route, Switch } from "react-router-dom";

const TemplateWrapper = styled.div`
  display: flex;
`;

const LoggedUserTemplate = () => {
  return (
    <TemplateWrapper>
      <NavBar />
      <Switch>
        <Route exact path={loggedUserRoutes.main} component={AddOrder} />
        <Route path={loggedUserRoutes.ordersTable} component={Orders} />
      </Switch>
    </TemplateWrapper>
  );
};

export default LoggedUserTemplate;
