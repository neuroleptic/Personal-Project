import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStrings } from '../actions';
import { Link } from 'react-router-dom';

class StringsList extends Component {
  componentDidMount() {
    this.props.getStrings();
  }

  render() {
    return (
      <div className="container text-center">
        <h1>Discover the ideal violin string today</h1>
        {this.props.authenticated && <Link to={`/strings/new`} className="btn btn-primary">
            Add a string
          </Link>}
        <div className="row " style={{display: 'flex', flexWrap: 'wrap'}}>
          {this.props.strings.map((string, i) => {
            return (
              
              <div key={i} className="thumbnail">
                <p>{string.title}</p>
                <img src={string.imageURL}  style={{padding: 15}} />
                <p>
                  <Link to={`/strings/${string._id}`}>
                    More Info
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    strings: state.strings,
    authenticated: state.auth.authenticated    
  };
};

export default connect(mapStateToProps, { getStrings })(StringsList);