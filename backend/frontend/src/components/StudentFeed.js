import React, { Component } from 'react';

// Components
import Listing from '../components/StudentCard';

var errorMessage = "End of results";
var feedLength = -1;

export default class Feed extends Component {
  state = {

  }

  render() {
      if (this.props.feedLength > this.props.listings.length) {
        feedLength = this.props.listings.length;
      } else {
        feedLength = this.props.feedLength;
      }

      return (
        <>
          {this.props.listings.slice(0, feedLength).map(post => (
            <Listing
              userName={post.firstName + " " + post.lastName}
              userMajor={post.userMajor}
              bio={post.userPitch}
              gradYear={post.userGradYear}
              logo={"/img/usr/" + post.id + ".png"}
              jobPage={"/user-profile/" + post.id}
              id={post.id}
            />
          )
          )
          }

          <p style={{fontSize: "22px", color: "#8e8e8e"}}>{errorMessage}</p>
        </>
      )
    }
}
