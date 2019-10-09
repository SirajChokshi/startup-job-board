import React, { Component } from 'react';

// Components
import Listing from '../components/Listing';

export default class Feed extends Component {
  state = {
  }

  render () {
      return (
        <div>
           <Listing jobName="Job Title Here Internship Summer 2020" company="StartupName" logo="/foobar.png" />
           <Listing />
           <Listing />
           <Listing />
        </div>
      )
   }
}
