import React, { Component } from 'react';
import { addReview } from '../actions';
import { connect } from 'react-redux';

class AddReview extends Component {
  constructor() {
    super();

    this.state = {
      text: ''
    };
  }

  handleChangeText = (e) => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addReview(this.props.match.params.id, this.state, this.props.history);
    this.setState({
      text: ''
    });
  };

  render() {
    return (
      <div>
        <h1>Add a review</h1>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.text} onChange={this.handleChangeText} type='text' placeholder="Enter text"></input>
          <input type='submit' value='Submit'></input>
        </form>  
      </div>
    );
  }
}
 
export default connect(null, { addReview })(AddReview);

