import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStrings } from '../actions';
import { Link } from 'react-router-dom';

class StringsList extends Component {
  componentDidMount() {
    this.props.getStrings();
  }

  render() {
    return (
      <div>
        <Link to={'/login'}>
          Log In 
        </Link>
        <Link to={'/logout'}>
          Log Out
        </Link>
        <Link to={'/register'}>
          Register
        </Link>
        {this.props.authenticated && <Link to={`/strings/new`}>
            Add a string
          </Link>}
        <ul>
          {this.props.strings.map((string, i) => {
            return (
              <li key={i}>
                <Link to={`/strings/${string._id}`}>
                  {string.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    strings: state.strings,
    authenticated: state.auth.authenticated    
  };
};

export default connect(mapStateToProps, { getStrings })(StringsList);