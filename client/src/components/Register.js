import React, { Component } from 'react';
import { register } from '../actions';
import { connect } from 'react-redux';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);    
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.register(this.state, this.props.history);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value})
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value})    
  }

  handleChangeConfirmPassword(event) {
    this.setState({confirmPassword: event.target.value})    
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
        <input value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} type='password' placeholder="Confirm password"></input>
        <input type='submit' value='Submit'></input>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

export default connect(mapStateToProps, { register })(Register);