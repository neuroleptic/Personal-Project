import React, { Component } from 'react';
import { login } from '../actions';
import { connect } from 'react-redux';

class LogIn extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state, this.props.history);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value})
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value})    
  }

  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  } 

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderAlert()}
        <input value={this.state.username} onChange={this.handleChangeUsername} type='text' placeholder="Enter username"></input>
        <input value={this.state.password} onChange={this.handleChangePassword} type='password' placeholder="Enter password"></input>
        <input type='submit' value='Submit'></input>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, { login })(LogIn);