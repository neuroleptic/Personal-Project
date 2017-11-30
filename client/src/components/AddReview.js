import React, { Component } from 'react';
import { addReview } from '../actions';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';

export class AddReview extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      rating: 3
    };
    
  }

  handleChangeText = (e) => {
    this.setState({
      text: e.target.value
    });
  };

  changeRating = ( newRating ) => { 
    this.setState({
      rating: newRating
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addReview(this.props.match.params.id, this.state, this.props.history);
    this.setState({
      text: ''
    });
  };

  render() {
    return (
      <div className="container">
        <h1 style={{textAlign: 'center'}}>Add a review</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for='content'>Review Text</label>
            <input value={this.state.text} onChange={this.handleChangeText} id='content' className="form-control" type='text' placeholder="Enter text"></input>
          </div>
          <div>
            <span>Rating: </span>
            <StarRatings
              rating={this.state.rating}
              isSelectable={true}
              isAggregateRating={false}
              changeRating={this.changeRating}
              numOfStars={ 5 }
              starWidthAndHeight={'25px'}
            />
          </div>
          <input type='submit' value='Submit' className="btn btn-primary"></input>
        </form>  
      </div>
    );
  }
}
 
export default connect(null, { addReview })(AddReview);

