import React, { Component } from 'react';

// Components
import LandingHero from '../components/LandingHero';
import GuestLanding from '../components/GuestLanding';
import StudentLanding from '../components/StudentLanding';

var userAuth = false;

export default class Home extends Component {
  state = {
  }

  render () {
    if (userAuth) {
        // LOGGED IN STUDENT LANDING
        return (
          <span>
            <LandingHero />
            <StudentLanding />
          </span>
        )
      } else {
      // GUEST LANDING
      return (
        <span>
          <LandingHero />
          <GuestLanding />
        </span>
      )
    }
   }
}
