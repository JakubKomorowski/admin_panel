import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TableChartIcon from "@material-ui/icons/TableChart";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { loggedUserRoutes } from "../../routes";
import { auth } from "../../firebase/firebaseConfig";
import { Redirect } from "react-router-dom";
import withRedirect from "../../hoc/withRedirect";

const StyledNav = styled.nav`
  height: 100vh;

  width: 50px;
  background-color: #e5e5e5;
`;

const StyledNavUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
`;

const StyledNavLi = styled.li`
  margin-top: 1rem;
`;

const NavBar = ({ redirect, redirectFn }) => {
  return (
    <StyledNav>
      <StyledNavUl>
        <StyledNavLi>
          <Link to={loggedUserRoutes.main}>
            <Tooltip title="Add Order">
              <IconButton aria-label="Add Order">
                <AddIcon style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          </Link>
        </StyledNavLi>
        <StyledNavLi>
          <Link to={loggedUserRoutes.ordersTable}>
            <Tooltip title="Orders Table">
              <IconButton aria-label="Orders Table">
                <TableChartIcon style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          </Link>
        </StyledNavLi>
        <StyledNavLi>
          <Tooltip title="log out">
            <IconButton
              aria-label="Orders Table"
              onClick={() => {
                auth.signOut();
                redirectFn();
              }}
            >
              <ExitToAppIcon style={{ color: "black" }} />
            </IconButton>
          </Tooltip>
        </StyledNavLi>
      </StyledNavUl>
      {redirect ? <Redirect to="/" /> : null}
    </StyledNav>
  );
};

export default withRedirect(NavBar);
