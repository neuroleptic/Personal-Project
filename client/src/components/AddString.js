import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addString } from '../actions';

class AddString extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      content: '',
      imageURL: '',
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

  handleChangeImageURL = (e) => {
    this.setState({
      imageURL: e.target.value
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
      <div className="container">
        <h1 style={{textAlign: 'center'}}>Add a new string</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for='title'>Title</label>
              <input value={this.state.title} onChange={this.handleChangeTitle} id='title' className="form-control" type='text' placeholder="Enter a tile"></input>
            </div>
            <div className="form-group">
              <label for='content'>Description</label>
              <input value={this.state.content} onChange={this.handleChangeContent} id='content' className="form-control" type='text' placeholder="Enter description"></input>
            </div>
            <div className="form-group">
              <label for='imageURL'>Image URL</label>
              <input value={this.state.imageURL} onChange={this.handleChangeImageURL} id='imageURL' className="form-control" type='text' placeholder="Enter image url"></input>  
            </div>
            <div className="form-group">
              <label for='manufacturer'>Manufacturer</label>
              <input value={this.state.manufacturer} onChange={this.handleChangeManufacturer} id='manufacturer' className="form-control" type='text' placeholder="Enter manufacturer"></input>
            </div>
            <div className="form-group">
              <label for='coreMaterial'>Core Material</label>
              <input value={this.state.coreMaterial} onChange={this.handleChangeCoreMaterial} id='coreMaterial' className="form-control" type='text' placeholder="Enter core material"></input>
            </div>
            <div className="form-group">
              <label for='outerMaterial'>Outer Material</label>
              <input value={this.state.outerMaterial} onChange={this.handleChangeOuterMaterial} id='outerMaterial' className="form-control" type='text' placeholder="Enter outer material"></input>
            </div>
            <div className="form-group">
              <label for='tonalTraits'>Tonal Traits</label>
              <input value={this.state.tonalTraits} onChange={this.handleChangeTonalTraits} id='tonalTraits' className="form-control" type='text' placeholder="Enter tonal traits"></input>
            </div>
            <input type='submit' value='Submit' className="btn btn-primary"></input>
          </form>           
        </div>
      </div>
    )
  }
}

export default connect(null, { addString })(AddString);