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
      <div className="container">
        {this.props.authenticated && <Link to={`/strings/new`}>
            Add a string
          </Link>}
        <div className="row text-center" style={{display: 'flex', flexWrap: 'wrap'}}>
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