import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editReview } from '../actions';
import StarRatings from 'react-star-ratings';

class EditReview extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      rating: 3
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  
  handleSubmit(event) {
    event.preventDefault();
    this.props.editReview(this.props.match.params.id, this.props.match.params.reviewId, this.state, this.props.history);    
  }

  render() {
    return (
      <div>
        <h1>Edit review</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.text} onChange={this.handleChangeText} type='text' placeholder="Enter review"></input>
            <StarRatings
              rating={this.state.rating}
              isSelectable={true}
              isAggregateRating={false}
              changeRating={this.changeRating}
              numOfStars={ 5 }
            />
            <input type='submit' value='Submit'></input>
          </form>           
        </div>
      </div>
    )
  }
}

export default connect(null, { editReview })(EditReview);