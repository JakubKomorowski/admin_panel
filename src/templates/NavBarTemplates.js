import React from "react";
import NavBar from "../components/nav/NavBar";
import styled from "styled-components";

const TemplateWrapper = styled.div`
  display: flex;
`;

const NavBarTemplates = ({ children }) => {
  return (
    <TemplateWrapper>
      <NavBar />
      {children}
    </TemplateWrapper>
  );
};

export default NavBarTemplates;
