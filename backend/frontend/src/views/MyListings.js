import React, { Component } from 'react';

// Components
import { Container } from 'react-grid-system';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Feed from '../components/Feed';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle as successIcon, faPlusCircle as addIcon} from '@fortawesome/free-solid-svg-icons'
import Select from "react-select";

const addListingStyles = {
    width: "100%",
    backgroundColor: "#FFFFFF",
    position: "relative",
    padding: "20px",
    display: "block",
    borderRadius: "12px",
    height: "auto",
    boxSizing: "border-box",
    color: "#3d5afe",
    textDecoration: 'none',
    fontSize: "20px",
    marginBottom: "20px"
};

const sortOptions = [
    { label: "Deadline (Earliest)", value: "listDeadline" },
    { label: "Deadline (Lastest)", value: "-listDeadline" },
    { label: "Name (A - Z)", value: "listName" },
    { label: "Name (Z - A)", value: "-listName" }
];

class MyListings extends Component {
  state = {
      listings: [],
      sort: "listDeadline"
  }

  componentDidMount() {
      try {
          if (this.props.location.state.newListing) {
              document.getElementById('new-signup-error').style.display = 'block';
          }
      } catch (error) {

      }
    fetch('/api/listings/?format=json&listOrgID=' + this.props.user.id + '&ordering=' + this.state.sort)
    .then(res => res.json())
    .then((data) => {
      this.setState({ listings: data })
    })
    .catch(console.log)
  }

    handleSortChange = (selectedOption) => {
        this.setState({
            ...this.state,
            sort: selectedOption.value
        }, this.componentDidMount);
//    console.log(this.state.listCategory);
    }

  render () {
    if (!this.props.isAuthenticated) {
      return (
        <Redirect to="/login" />
      )
    } else if (!this.props.isStartup) {
      return (
        <Redirect to="/" />
      )
    } else {
      return (
        <>
          <div className="hero" style={{paddingBottom: 12 + "vh"}}>
            <div className="hero-inner">
              <h1>My Listings</h1>
              <span className="sub-title">
                  <Link to="/dashboard">Dashboard</Link>&nbsp;
                  | &nbsp;<Link to="/students">Recruit a student</Link>
              </span>
            </div>
          </div>
          <br />
          <Container>
                <div className="result-header-wrapper">
                  <h2>Results</h2>
                  <div className="order-wrapper">
                      <Select
                          style={{width: "100px !important"}}
                          options={sortOptions}
                          className="filter-dropdown results-sort"
                          defaultValue={sortOptions[0]}
                          onChange={this.handleSortChange}
                          theme={theme => ({
                              ...theme,
                              borderRadius: "8px",
                              colors: {
                                  ...theme.colors,
                                  primary25: '#eeeeee',
                                  primary: '#3d5afe',
                                  primary50: '#e8e8e8',
                              },
                          })}>
                      </Select>
                  </div>
                </div>
              <span id="new-signup-error" className="error" style={{ backgroundColor: '#00C851' }}><FontAwesomeIcon icon={successIcon} /> &nbsp; Account created! Login below </span>
              <Link id="new-listing-button" style={addListingStyles} to="/my-listings/new">
                  <FontAwesomeIcon icon={addIcon} />
                   &nbsp; Create a new listing
                   <div className="shadow" />
                </Link>
                <Feed listings={this.state.listings} />
          </Container>
        </>
      )
     }
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isStartup: state.isStartup
});

export default connect(mapStateToProps)(MyListings);
