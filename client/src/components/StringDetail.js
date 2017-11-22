import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getString, deleteString, deleteReview } from '../actions';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

class StringDetail extends Component {
  constructor() {
    super();
    this.handleDeleteString = this.handleDeleteString.bind(this);
  }

  componentDidMount() {
    this.props.getString(this.props.match.params.id);
  }

  componentDidUpdate() {
    this.props.getString(this.props.match.params.id);    
  }

  handleDeleteString(event) {
    event.preventDefault();
    this.props.deleteString(this.props.match.params.id, this.props.history);        
  }

  handleDeleteReview(reviewId, event) {
    event.preventDefault();
    this.props.deleteReview(this.props.match.params.id, reviewId, this.props.history);        
  }

  render() {
    if(this.props.selectedString && this.props.selectedString.author){
      return (
        <div>
          <p>Title: {this.props.selectedString.title}</p>
          <p>Content: {this.props.selectedString.content}</p>
          <p>Manufacturer: {this.props.selectedString.manufacturer}</p>
          <p>Core material: {this.props.selectedString.coreMaterial}</p>
          <p>Outer material: {this.props.selectedString.outerMaterial}</p>
          <p>Tonal traits: {this.props.selectedString.tonalTraits}</p>

          <p>Average rating: <StarRatings
                      rating={ this.props.selectedString.rating }
                      isSelectable={ false }
                      isAggregateRating={ true }
                      numOfStars={ 5 }
                    />
                </p> 

          {this.props.username === this.props.selectedString.author.username && <Link to={`/strings/${this.props.selectedString._id}/edit`}>
            Edit String
          </Link>}

          {this.props.username === this.props.selectedString.author.username &&  <form onSubmit={this.handleDeleteString}>
              <input type='submit' value='Delete String'></input>
            </form> }

          <p>By: {this.props.selectedString.author.username}</p>
          <p> Reviews: </p>
          {this.props.selectedString.reviews.map((review, i) => {
            return (
              <div key={i}>
                <p> {review.text } </p>
                <p>Rating: <StarRatings
                    rating={ review.rating }
                    isSelectable={ false }
                    isAggregateRating={ false }
                    numOfStars={ 5 }
                  /> 
                </p>      
                <p> By: {review.author.username } </p>
                {this.props.username === review.author.username&& <div>
                    <Link to={`/strings/${this.props.selectedString._id}/reviews/${review._id}`}>
                        Edit Review
                    </Link>
                    <form onSubmit={this.handleDeleteReview.bind(this, review._id)}>
                      <input type='submit' value='Delete Reivew'></input>
                    </form>
                  </div>               
                  }                  
              </div>
            )
          })}
          {this.props.authenticated && <div>
            <Link to={`/strings/${this.props.selectedString._id}/reviews/new`}>
                Add Review
            </Link>
          
          </div>}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedString: state.selectedString,
    authenticated: state.auth.authenticated,
    username: state.auth.username
  };
};

export default connect(mapStateToProps, { getString, deleteString, deleteReview })(StringDetail);