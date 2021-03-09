import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBarTemplates from "../templates/NavBarTemplates";
import AddOrder from "../views/AddOrder";
import Orders from "../views/Orders";

const Router = () => {
  return (
    <BrowserRouter>
      <NavBarTemplates>
        <Switch>
          <Route exact path="/" component={AddOrder} />
          <Route path="/orders-table" component={Orders} />
        </Switch>
      </NavBarTemplates>
    </BrowserRouter>
  );
};

export default Router;
