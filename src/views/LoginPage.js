import React from "react";
import { Link } from "react-router-dom";
import RegisterLoginForm from "../components/RegisterLoginForm";
import { unloggedUserRoutes } from "../routes";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

const SignInWrapper = styled.div`
  max-width: 500px;
  background-color: white;
  border-radius: 20px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.14);
  padding: 2rem;
  margin: 0 auto;
  margin-top: -15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const LoginPage = () => {
  return (
    <Wrapper>
      <BlueStripe>
        <h1>Login Page</h1>
      </BlueStripe>
      <SignInWrapper>
        <RegisterLoginForm formType="login" />
        <p>You don't have account?</p>
        <Link to={unloggedUserRoutes.register}>Sign Up</Link>
      </SignInWrapper>
    </Wrapper>
  );
};

export default LoginPage;
