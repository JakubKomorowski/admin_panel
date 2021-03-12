import React from "react";
import { Component } from "react";

const withRedirect = (WrappedComponent) => {
  return class WithRedirect extends Component {
    state = {
      redirect: false,
    };

    redirectFn = () => {
      this.setState({
        redirect: true,
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          redirect={this.state.redirect}
          redirectFn={this.redirectFn}
        />
      );
    }
  };
};

export default withRedirect;
