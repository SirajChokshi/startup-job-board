import React, { Component } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkActive } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as bookmark } from '@fortawesome/free-regular-svg-icons'

var image = "https://via.placeholder.com/200x200";

export default class Listing extends Component {
  state = {
  }

  render () {
      return (
        <div className="listing">
          <div className="image-wrapper"><img src={image}></img></div>
          <div className="inf">
            <h2>Listing Title <span className="commitment-wrapper"> &mdash; <span className="commitment">Full-time</span></span></h2>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <div className="button-wrapper">
              <a href="" className="button">Apply</a>
              <a href="" className="button-secondary">Bookmark</a>
              <a href="" className="similar-pos">Similar positions...</a>
            </div>
          </div>
          <div style={{clear: "both"}}></div>
          <div className="shadow"></div>
        </div>
      )
   }
}
