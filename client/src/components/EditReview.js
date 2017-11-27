import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editReview, getReview } from '../actions';
import StarRatings from 'react-star-ratings';

class EditReview extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      rating: 0
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getReview(this.props.match.params.id, this.props.match.params.reviewId);
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
    if(this.props.selectedReview) {
      return (
        <div className="container">
          <h1 style={{textAlign: 'center'}}>Edit review</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for='content'>Review Text</label>
                <input value={this.state.text ? this.state.text: this.props.selectedReview.text} onChange={this.handleChangeText} id='content' className="form-control" type='text' placeholder="Enter review"></input>
              </div>
              <div>
                <span>Rating: </span>
                <StarRatings
                  rating={this.state.rating ? this.state.rating: this.props.selectedReview.rating}
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
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedReview: state.selectedReview
  };
};
export default connect(mapStateToProps, { editReview, getReview })(EditReview);