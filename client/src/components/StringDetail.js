import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getString } from '../actions';
import { addReview } from '../actions';
import { deleteString } from '../actions';
import { deleteReview } from '../actions';

import { Link } from 'react-router-dom';

class StringDetail extends Component {
  constructor() {
    super();

    this.state = {
      text: ''
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteString = this.handleDeleteString.bind(this);
    
  }

  componentDidMount() {
    this.props.getString(this.props.match.params.id);
  }

  componentDidUpdate() {
    this.props.getString(this.props.match.params.id);    
  }

  handleChangeText = (e) => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.addReview(this.props.match.params.id, this.state);
    this.setState({
      text: ''
    });
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
          <p>{this.props.selectedString.title}</p>
          <p>{this.props.selectedString.content}</p>
          {this.props.username === this.props.selectedString.author.username && <Link to={`/strings/${this.props.selectedString._id}/edit`}>
            Edit String
          </Link>}


          {this.props.username === this.props.selectedString.author.username &&  <form onSubmit={this.handleDeleteString}>
              <input type='submit' value='Delete'></input>
            </form> }

          <p>By: {this.props.selectedString.author.username}</p>
          <p> Reviews: </p>
          {this.props.selectedString.reviews.map((review, i) => {
            return (
              <div key={i}>
                <p> {review.text } </p>      
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
            <p> Add a review </p>
            <form onSubmit={this.handleSubmit}>
              <input value={this.state.text} onChange={this.handleChangeText} type='text' placeholder="Enter text"></input>
              <input type='submit' value='Submit'></input>
            </form>           
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

export default connect(mapStateToProps, { getString, addReview, deleteString, deleteReview })(StringDetail);