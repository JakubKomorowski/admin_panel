import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TableChartIcon from "@material-ui/icons/TableChart";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

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

// const StyledAddIcon = styled(AddIcon)`
//   font-size: 40px;
//   color: black;
// `;

const NavBar = () => {
  return (
    <StyledNav>
      <StyledNavUl>
        <StyledNavLi>
          <Link to="/">
            <Tooltip title="Add Order">
              <IconButton aria-label="Add Order">
                <AddIcon style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          </Link>
        </StyledNavLi>
        <StyledNavLi>
          <Link to="/orders-table">
            <Tooltip title="Orders Table">
              <IconButton aria-label="Orders Table">
                <TableChartIcon style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          </Link>
        </StyledNavLi>
      </StyledNavUl>
    </StyledNav>
  );
};

export default NavBar;
