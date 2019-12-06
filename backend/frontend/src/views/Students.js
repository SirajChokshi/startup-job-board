import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch as search } from '@fortawesome/free-solid-svg-icons'

// Components
import Feed from '../components/StudentFeed';

const sortOptions = [
  { label: "Graduating (Earliest)", value: "userGradYear" },
  { label: "Graduating (Lastest)", value: "-userGradYear" },
  { label: "Name (A - Z)", value: "firstname" },
  { label: "Name (Z - A)", value: "-firstName" }
];

const isPaidList = [
  { label: "Any", value: "" },
  { label: "Paid Only", value: "true" },
  { label: "Unpaid Only", value: "false" },
];

export default class Jobs extends Component {
  state = {
    users: [],
    minGPA: 0,
    search: "",
    sort: "id"
  }

  componentDidMount() {
      this.setState({ users: [] });
      fetch('/api/users/?format=json&search=' + this.state.search + '&ordering=' + this.state.sort + '&userGPA__gte=' + this.state.minGPA + '&isOpen=true' )
      .then(res => res.json())
      .then((data) => {
        this.setState({ users: data })
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

  handleGPAFilterChange = () => {
        this.setState({
            ...this.state,
            minGPA: parseFloat(document.getElementById('gpa-filter').value).toFixed(2) - 0.00
        }, this.componentDidMount);
//    console.log(this.state.listCategory);
    }

  search = () => {
    this.setState({
      ...this.state,
      search: document.getElementById('jobs-search-bar').value
    }, this.componentDidMount)
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      document.getElementById("search-icon-wrapper").click();
    }
  }

  render () {
      return (
        <>
          <div className="hero" id="search-hero">
            <div className="hero-inner">
              <h1>Find the perfect candidate,</h1>
                <div id="search-bar-wrapper">
                   <input type="search" id="jobs-search-bar" placeholder="Search for a skill, major or qualification..." className="search" onKeyPress={this.keyPressed} />
                     <button id="search-icon-wrapper" onClick={this.search} >
                       <FontAwesomeIcon icon={search} style={{verticalAlign: 'middle', color: '#8e8e8e', fontSize: 18 + 'px', marginBottom: 4 + 'px'}} />
                     </button>
                </div>
              <br />
              <span className="sub-title">
                  <Link to="/dashboard">Dashboard</Link> &nbsp;|&nbsp; <Link to="/my-listings">My Listings</Link>
              </span>
            </div>
          </div>
          <br />
          <Container>
            <Row>
              <Col xl={3} lg={4}>
                <h2>Filter</h2>
                   <label className="filter-label" htmlFor="gpa-filter" >Minimum GPA</label>
                   <input className="filter-input" id="gpa-filter" defaultValue={parseFloat(0.00).toFixed(2)} type="number" step="0.01" min="0" max="4" onChange={this.handleGPAFilterChange} />
              </Col>
              <Col xl={9} lg={8}>
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
                <Feed listings={this.state.users} /> {/* FIND CAUSE OF USER REPLACEMENT HERE */}
              </Col>
            </Row>
          </Container>
        </>
      )
   }
}
