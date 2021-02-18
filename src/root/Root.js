import React from "react";
import Router from "../routing";
import GlobalStyle from "../theme/GlobalStyle";

const Root = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default Root;
