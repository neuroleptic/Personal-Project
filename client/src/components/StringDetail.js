import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getString, deleteString, deleteReview } from '../actions';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

export class StringDetail extends Component {
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
        <div className="container" style={{textAlign: 'center'}}>
          <div style={{textAlign: 'left', display: 'inline-block'}}>
            <h1>{this.props.selectedString.title}</h1>
            <img src={this.props.selectedString.imageURL}/>
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
                        starWidthAndHeight={'25px'}
                      />
                  </p> 
            {this.props.username === this.props.selectedString.author.username && <Link to={`/strings/${this.props.selectedString._id}/edit`} style={{display: 'inline-block'}} className="btn btn-primary">
              Edit String
            </Link>}
            {this.props.username === this.props.selectedString.author.username &&  <form style={{display: 'inline-block'}} onSubmit={this.handleDeleteString}>
                <input type='submit' value='Delete String' className="btn btn-danger"></input>
              </form> 
            }
            <p>Added By: {this.props.selectedString.author.username}</p>
            <h2 style={{marginTop: 50}} > Reviews: </h2>
            {this.props.selectedString.reviews.map((review, i) => {
              return (
                <div key={i} style={{marginTop: 40}} >
                  <p> {review.text } </p>
                  <p>Rating: <StarRatings
                      rating={ review.rating }
                      isSelectable={ false }
                      isAggregateRating={ false }
                      numOfStars={ 5 }
                      starWidthAndHeight={'25px'}
                    /> 
                  </p>      
                  <p> By: {review.author.username } </p>
                  {this.props.username === review.author.username && <div>
                      <Link to={{ pathname: `/strings/${this.props.selectedString._id}/reviews/${review._id}`, state: {text: review.text, rating: review.rating}}} style={{display: 'inline-block'}} className="btn btn-primary">
                          Edit Review
                      </Link>
                      <form onSubmit={this.handleDeleteReview.bind(this, review._id)} style={{display: 'inline-block'}}>
                        <input type='submit' value='Delete Review' className="btn btn-danger"></input>
                      </form>
                    </div>               
                    }                  
                </div>
              )
            })}
            {this.props.authenticated && <div>
              <Link to={`/strings/${this.props.selectedString._id}/reviews/new`} className="btn btn-primary" style={{marginTop: 40}}>
                  Add Review
              </Link>
            
            </div>}
          </div>
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