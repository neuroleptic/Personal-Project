import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addString } from '../actions';

class AddString extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      content: '',
      manufacturer: '',
      coreMaterial: '',
      outerMaterial: '',
      tonalTraits: ''
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

  handleChangeManufacturer = (e) => {
    this.setState({
      manufacturer: e.target.value
    });
  };

  handleChangeCoreMaterial = (e) => {
    this.setState({
      coreMaterial: e.target.value
    });
  };

  handleChangeOuterMaterial = (e) => {
    this.setState({
      outerMaterial: e.target.value
    });
  };

  handleChangeTonalTraits = (e) => {
    this.setState({
      tonalTraits: e.target.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.addString(this.state, this.props.history);    
  }

  render() {
    return (
      <div>
        <h1>Add a new string</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.title} onChange={this.handleChangeTitle} type='text' placeholder="Enter a tile"></input>
            <input value={this.state.content} onChange={this.handleChangeContent} type='text' placeholder="Enter description"></input>
            <input value={this.state.manufacturer} onChange={this.handleChangeManufacturer} type='text' placeholder="Enter manufacturer"></input>
            <input value={this.state.coreMaterial} onChange={this.handleChangeCoreMaterial} type='text' placeholder="Enter core material"></input>
            <input value={this.state.outerMaterial} onChange={this.handleChangeOuterMaterial} type='text' placeholder="Enter outer material"></input>
            <input value={this.state.tonalTraits} onChange={this.handleChangeTonalTraits} type='text' placeholder="Enter tonal traits"></input>
            <input type='submit' value='Submit'></input>
          </form>           
        </div>
      </div>
    )
  }
}

export default connect(null, { addString })(AddString);