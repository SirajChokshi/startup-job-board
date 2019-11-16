import React, { Component } from 'react';
import { Container } from 'react-grid-system';

// Components
import Feed from '../components/Feed';

export default class StudentLanding extends Component {
  state = {
    listings: []
  }

  componentDidMount() {
      fetch('/api/listings/?format=json')
      .then(res => res.json())
      .then((data) => {
        this.setState({ listings: data })
      })
      .catch(console.log)
    }

  render () {
      return (
        <Container id="below">
          <h2>Welcome back {this.props.userName},<br></br>Here are some newly posted positions:</h2>
          <Feed listings={this.state.listings} feedLength={4} ></Feed>
        </Container>
      )
    }
  }
