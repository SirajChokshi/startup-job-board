import React, { Component } from 'react';
import { Container } from 'react-grid-system';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import * as axios from 'axios';

// Components
import Feed from '../components/Feed';
import Select from "react-select";

import { sortOptions } from '../static/constants'

class Bookmarks extends Component {
  state = {
      listings: [],
      sort: "listDeadline"
  };

  async componentDidMount() {
      this.setState({listings: []});
      try {
          const response = await axios({
              url: '/api/users/data/bookmarks?format=json&ordering=' + this.state.sort,
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Authorization': 'Token ' + localStorage.getItem("token")
              }
          });
          const bookmarks = await response.data;
          this.setState({ listings: bookmarks });
      } catch (error) {
          console.error(error);
          console.error("@ERROR: Bookmark Retrieval Error!");
      }
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
    } else if (this.props.isStartup) {
      return (
        <Redirect to="/my-listings" />
      )
    }
      return (
        <span>
          <div className="hero">
            <div className="hero-inner">
              <h1>Bookmarks</h1>
              <span className="sub-title">
                  <Link to="/jobs">My Applications</Link>&nbsp;
                  | &nbsp;<Link to="/jobs">Job Search</Link>
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
            <Feed listings={this.state.listings} />
          </Container>
        </span>
      )
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(Bookmarks);
