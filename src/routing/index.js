import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setCurrentUser } from "../actions";
import { auth } from "../firebase/firebaseConfig";
import LoggedUserTemplate from "../templates/LoggedUserTemplate";
import UnLoggedUserTemplate from "../templates/UnloggedUserTemplate";

const Router = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  return (
    <BrowserRouter>
      {currentUser ? <LoggedUserTemplate /> : <UnLoggedUserTemplate />}
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
