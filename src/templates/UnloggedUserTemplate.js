import React from "react";
import styled from "styled-components";
import { unloggedUserRoutes } from "../routes";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";

const TemplateWrapper = styled.div`
  display: flex;
`;

const UnLoggedUserTemplate = () => {
  return (
    <TemplateWrapper>
      <Switch>
        <Route exact path={unloggedUserRoutes.login} component={LoginPage} />
        <Route path={unloggedUserRoutes.register} component={RegisterPage} />
      </Switch>
    </TemplateWrapper>
  );
};

export default UnLoggedUserTemplate;
