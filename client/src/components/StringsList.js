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
      <div>
        {this.props.authenticated && <Link to={`/strings/new`}>
            Add a string
          </Link>}
        <div>
          {this.props.strings.map((string, i) => {
            return (
              <div key={i}>
                {string.title}
                <img src={string.imageURL} />
                <Link to={`/strings/${string._id}`}>
                  More Info
                </Link>
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