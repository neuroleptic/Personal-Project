import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from '../actions';

class LogOut extends Component {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return (
      <Redirect to="/strings" />
    );
  }
}

export default connect(null, { logout })(LogOut);