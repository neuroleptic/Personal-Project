import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Header extends Component {
  getLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link to='/logout' className="nav-link">Log Out</Link>
        </li>
      );
    }
    return [
      <li key={1} className="nav-item" style={{display: 'inline-block', marginRight: 15}}>
        <Link to='/login' className="nav-link">Log In</Link>
      </li>,
      <li key={2} className="nav-item" style={{display: 'inline-block'}}>
        <Link to='/register' className="nav-link">Register</Link>
      </li>
    ];
  }

  render() {
    return (
      <div className="container"> 
        <nav className="navbar">
          <Link to='/strings'>Home</Link>
          <div>
            <ul className="navbar-nav" style={{display: 'inline-block'}}>
              {this.getLinks()}
            </ul>
          </div>
        </nav>
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