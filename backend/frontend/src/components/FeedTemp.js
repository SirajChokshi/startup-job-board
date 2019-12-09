import React, { Component } from 'react';

// Components
import Pagination from '../components/Pagination';
import Listing from '../components/Listing';

let errorMessage = "End of results";
let feedLength = -1;

function formatDateString(str) {
  const year = str.substring(0, 4);
  let month = str.substring(5, 7);
  const day = str.substring(8, 10);
  switch (month) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
    default:
      break;
  }
  return day + " " + month + ", " + year;
}

class FeedTemp extends Component {

  state = { allListings: [], currentListings: [], currentPage: null, totalPages: null };

  componentDidMount() {
    fetch('/api/listings/?format=json&isOpen=true')
        .then(res => res.json())
        .then((data) => {
          this.setState({allListings: data})
        })
        .catch(console.log)
  }

  onPageChanged = data => {
    const { allListings } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentListings = allListings.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentListings, totalPages });
  };

  render() {
    const { allListings, currentListings, currentPage, totalPages } = this.state;
    const totalListings = allListings.length;

    if (totalListings === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
        <div className="container mb-5">
          <div className="row d-flex flex-row py-5">

            <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
              <div className="d-flex flex-row align-items-center">

                <h2 className={headerClass}>
                  <strong className="text-secondary">{totalListings}</strong> Listings Found
                </h2>

                { currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
                ) }

              </div>

              <div className="d-flex flex-row py-4 align-items-center">
                <Pagination totalRecords={totalListings} pageLimit={6} pageNeighbours={1} onPageChanged={this.onPageChanged} />
              </div>
            </div>

            { currentListings.map(post => <Listing
                listName={post.listName}
                listLocation={post.listLocation}
                listDesc={post.listDesc}
                listDeadline={formatDateString(post.listDeadline)}
                company={post.listOrgID}
                logo={"/img/org/" + post.listOrgID + ".png"}
                jobPage={"/listing/" + post.id}
                id={post.id}
            />) }

          </div>
        </div>
    );
  }

}

export default FeedTemp;
