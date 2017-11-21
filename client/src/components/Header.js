import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  getLinks() {
    if (this.props.authenticated) {
      return (
        <li>
          <Link to='/logout'>Log Out</Link>
        </li>
      );
    }
    return [
      <li key={1}>
        <Link to='/login'>Log In</Link>
      </li>,
      <li key={2}>
        <Link to='/register'>Register</Link>
      </li>
    ];
  }

  render() {
    return (
      <div>
        <Link to='/strings'>Home</Link>
        <ul>{this.getLinks()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Header);