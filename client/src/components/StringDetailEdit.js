import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editString } from '../actions';

class StringDetailEdit extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      content: ''
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  handleChangeContent = (e) => {
    this.setState({
      content: e.target.value
    });
  };
  
  handleSubmit(event) {
    event.preventDefault();
    this.props.editString(this.props.match.params.id, this.state, this.props.history);    
  }

  render() {
    return (
      <div>
        <h1>Edit string</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.title} onChange={this.handleChangeTitle} type='text' placeholder="Enter a tile"></input>
            <input value={this.state.content} onChange={this.handleChangeContent} type='text' placeholder="Enter details"></input>
            <input type='submit' value='Submit'></input>
          </form>           
        </div>
      </div>
    )
  }
}

export default connect(null, { editString })(StringDetailEdit);