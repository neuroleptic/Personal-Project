import React, { Component } from 'react';
import { login } from '../actions';
import { connect } from 'react-redux';

export class LogIn extends Component {

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
      <div className="container"> 
        <h1 style={{textAlign: 'center'}}>Log In</h1>
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
          <input type='submit' value='Submit' className="btn btn-primary"></input>
        </form>
      </div>
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