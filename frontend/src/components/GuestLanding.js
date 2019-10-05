import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

export default class GuestLanding extends Component {
  state = {
  }

  render () {
      return (
        <Container id="below">
          <Row>
            <Col md={4}>
              <h3>Title 1</h3>
              <p>Since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </Col>
            <Col md={4}>
              <h3>Title 2</h3>
              <p>Printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
            </Col>
            <Col md={4}>
              <h3>Title 3</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
            </Col>
          </Row>
        </Container>
      )
    }
  }
