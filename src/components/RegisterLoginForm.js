import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import withRedirect from "../hoc/withRedirect";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const RegisterLoginForm = ({ formType, redirect, redirectFn }) => {
  const handleRegisterLoginForm = (e) => {
    e.preventDefault();

    const userEmail = e.target.userEmail.value;
    const userPassword = e.target.userPassword.value;

    if (formType === "login") {
      auth
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => alert("You are log in"))
        .catch((err) => alert(err));
    } else {
      auth
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then(() => alert("Your account has been created"))
        .then(() => redirectFn())
        .catch((err) => alert(`${err}`));
    }

    e.target.reset();
  };
  const classes = useStyles();
  return (
    <FormWrapper className={classes.root} onSubmit={handleRegisterLoginForm}>
      <TextField
        name="userEmail"
        type="email"
        label="Your email"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="Your password"
        variant="outlined"
        name="userPassword"
        type="password"
      />
      <Button variant="outlined" type="submit">
        {formType === "login" ? "Sign In" : "Sign Up"}
      </Button>
      {redirect ? <Redirect to="/" /> : null}
    </FormWrapper>
  );
};

export default withRedirect(RegisterLoginForm);
