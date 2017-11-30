import React, { Component } from 'react';
import { register } from '../actions';
import { connect } from 'react-redux';

export class Register extends Component {
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
      <div className="container">  
        <h1 style={{textAlign: 'center'}}>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderAlert()}
          <div className="form-group">
            <label for='username'>Username</label>
            <input value={this.state.username} onChange={this.handleChangeUsername} id='username' className="form-control" type='text' placeholder="Enter username"></input>
          </div>
          <div className="form-group">
            <label for='password'>Password</label>
            <input value={this.state.password} onChange={this.handleChangePassword} id='password' className="form-control" type='password' placeholder="Enter password"></input>
          </div>
          <div className="form-group">
            <label for='confirmPassword'>Confirm Password</label>
            <input value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} id='confirmPassword' className="form-control" type='password' placeholder="Confirm password"></input>
          </div>
          <input type='submit' value='Submit' className="btn btn-primary"></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

export default connect(mapStateToProps, { register })(Register);