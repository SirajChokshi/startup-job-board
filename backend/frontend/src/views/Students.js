import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch as search } from '@fortawesome/free-solid-svg-icons'

// Components
import Filter from '../components/Filter';
import Feed from '../components/StudentFeed';
import Search from '../components/Search';

const categoryList = [
    { label: "Any", value: "" },
    { label: "Accounting/Finance", value: "FIN" },
    { label: "Administrative", value: "ADM" },
    { label: "Biotechnology", value: "BIO" },
    { label: "Chemical/Materials", value: "CHEM" },
    { label: "Data/Analysis", value: "DATA"},
    { label: "Engineering", value: "ENG" },
    { label: "Health/Medicine", value: "MED" },
    { label: "Project Mangement", value: "PM" },
    { label: "Marketing/PR", value: "PR" },
    { label: "Sales/Business", value: "BUS" },
    { label: "Software Development", value: "DEV" },
    { label: "Legal", value: "LAW" },
    { label: "User Experience/Design", value: "UX" },
    { label: "Other", value: "MISC" }
];

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
    isPaid: "",
    listCategory: "",
    search: "",
    sort: "listDeadline"
  }

  componentDidMount() {
      this.setState({ listings: [] });
      fetch('/api/users/?format=json&search=' + this.state.search + '&isPaid=' + this.state.isPaid + '&listCategory=' + this.state.listCategory + '&isOpen=true' )
      .then(res => res.json())
      .then((data) => {
        this.setState({ users: data })
      })
      .catch(console.log)
    }

  handleCategoryChange = (selectedOption) => {
    this.setState({
      ...this.state,
      listCategory: selectedOption.value
    }, this.componentDidMount);
//    console.log(this.state.listCategory);
  }

  handleSortChange = (selectedOption) => {
    this.setState({
      ...this.state,
      sort: selectedOption.value
    }, this.componentDidMount);
//    console.log(this.state.listCategory);
  }

  handleIsPaidChange = (selectedOption) => {
    this.setState({
      ...this.state,
      isPaid: selectedOption.value
    }, this.componentDidMount);
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
                   <input type="search" id="jobs-search-bar" placeholder="Search for a skill, major or qualification..." className="search" onKeyPress={this.keyPressed} ></input>
                     <button id="search-icon-wrapper" onClick={this.search} >
                       <FontAwesomeIcon icon={search} style={{verticalAlign: 'middle', color: '#8e8e8e', fontSize: 18 + 'px', marginBottom: 4 + 'px'}} />
                     </button>
                </div>
              <br></br>
              <span className="sub-title">
                  <Link to="/my-listings">My Listings</Link>&nbsp;
                  | &nbsp;<Link to="/favorites">Favorited</Link>
              </span>
            </div>
          </div>
          <br></br>
          <Container>
            <Row>
              <Col xl={3} lg={4}>
                <h2>Filter</h2>
                  <>
                   <label className="filter-label">Industry</label>
                   <Select
                     options={categoryList}
                     className="filter-dropdown"
                     defaultValue={categoryList[0]}
                     onChange={this.handleCategoryChange}
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
                  <br></br>
                  <label className="filter-label">Salary</label>
                    <Select
                      options={isPaidList}
                      className="filter-dropdown"
                      defaultValue={isPaidList[0]}
                      onChange={this.handleIsPaidChange}
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
                </>
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
                <Feed listings={this.state.users} />
              </Col>
            </Row>
          </Container>
        </>
      )
   }
}
