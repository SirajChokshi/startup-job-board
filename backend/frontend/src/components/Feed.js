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

export default class Feed extends Component {
  state = {

  }

  render() {
      if (this.props.feedLength > this.props.listings.length) {
        feedLength = this.props.listings.length;
      } else {
        feedLength = this.props.feedLength;
      }

      return (
        <>
          {this.props.listings.slice(0, feedLength).map(post => (
            <Listing
              listName={post.listName}
              listLocation={post.listLocation}
              listDesc={post.listDesc}
              listDeadline={formatDateString(post.listDeadline)}
              company={post.listOrgID}
              logo={"/img/org/" + post.listOrgID + ".png"}
              jobPage={"/listing/" + post.id}
              id={post.id}
            />
          ))}

          <p style={{fontSize: "22px", color: "#8e8e8e"}}>{errorMessage}</p>
        </>
      )
    }
}
