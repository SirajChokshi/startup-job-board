import React, { Component } from 'react';

// Components
import Listing from '../components/Listing';

export default class Feed extends Component {
  state = {
  }

  render () {
      return (
        <div>
           <h1> Feed </h1>
           <Listing />
        </div>
      )
   }
}
