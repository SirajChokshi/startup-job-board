import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {Link, withRouter} from 'react-router-dom';
import Select from 'react-select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch as search} from '@fortawesome/free-solid-svg-icons'
import { categoryList, sortOptions, isPaidList } from '../static/constants'

// Components
import Feed from '../components/Feed';
import FeedTemp from '../components/FeedTemp';

class Jobs extends Component {
    state = {
        listings: [],
        isPaid: "",
        listCategory: "",
        search: "",
        sort: "listDeadline"
    }

    UNSAFE_componentWillMount() {
        try {
            this.setState({search: this.props.location.state.search});
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.setState({listings: []});
        fetch('/api/listings/?format=json&search=' + this.state.search + '&isPaid=' + this.state.isPaid + '&listCategory=' + this.state.listCategory + '&ordering=' + this.state.sort + '&isOpen=true')
            .then(res => res.json())
            .then((data) => {
                this.setState({listings: data})
            })
            .catch(console.log)
    }

    handleCategoryChange = (selectedOption) => {
        this.setState({
            ...this.state,
            listCategory: selectedOption.value
        }, this.componentDidMount);
//    console.log(this.state.listCategory);
    };

    handleSortChange = (selectedOption) => {
        this.setState({
            ...this.state,
            sort: selectedOption.value
        }, this.componentDidMount);
//    console.log(this.state.listCategory);
    };

    handleIsPaidChange = (selectedOption) => {
        this.setState({
            ...this.state,
            isPaid: selectedOption.value
        }, this.componentDidMount);
    };

    search = () => {
        this.setState({
            ...this.state,
            search: document.getElementById('jobs-search-bar').value
        }, this.componentDidMount)
    };

    keyPressed(event) {
        if (event.key === "Enter") {
            document.getElementById("search-icon-wrapper").click();
        }
    }

    render() {
        return (
            <>
                <div className="hero" id="search-hero">
                    <div className="hero-inner">
                        <h1>Look for a job,</h1>
                        <div id="search-bar-wrapper">
                            <input type="search" id="jobs-search-bar" defaultValue={this.state.search}
                                   placeholder="Search for a job or internship..." className="search"
                                   onKeyPress={this.keyPressed}/>
                            <button id="search-icon-wrapper" onClick={this.search}>
                                <FontAwesomeIcon icon={search} style={{
                                    verticalAlign: 'middle',
                                    color: '#8e8e8e',
                                    fontSize: 18 + 'px',
                                    marginBottom: 4 + 'px'
                                }}/>
                            </button>
                        </div>
                        <br/>
                        <span className="sub-title">
                  <Link to="/bookmarks">My Bookmarks</Link>
              </span>
                    </div>
                </div>
                <br/>
                <Container style={{minHeight: "40vh"}}>
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
                            <Feed listings={this.state.listings}/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default withRouter(Jobs);