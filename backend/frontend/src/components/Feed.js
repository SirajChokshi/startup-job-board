import React, { Component } from 'react';

// Components
import Listing from '../components/Listing';

// const ListGen = ({listings}) => (
//
// );

// function Get(yourUrl){
//     var Httpreq = new XMLHttpRequest(); // a new request
//     Httpreq.open("GET",yourUrl,false);
//     Httpreq.send(null);
//     return Httpreq.responseText;
// }
//
// var listings = JSON.parse(Get("http://417c2179.ngrok.io/api/listings/?format=json"));

    // var request = new Request('http://417c2179.ngrok.io/api/listings/?format=json', {
    //     method: 'GET',
    //     headers: new Headers({
    //        'Token': '129eb953940072fb5908b11ae1d8fba0667d3c00b0ef155dd45c7ec6b2eaeca2',
    //     })
    // });
    //
    // const response = fetch(request)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.log(responseJson);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // const myJson = await response.json();
    // var listings = JSON.parse(myJson);

// var listings = [
//   {
//         "id": 1,
//         "listName": "Django/REST Developer",
//         "listDesc": "Need a developer to help Davis on the Backend",
//         "isPaid": true,
//         "listLocation": "Urbana, IL",
//         "isOpen": true,
//         "listLongDesc": "hj;lksfdkflsdafhakffhfna",
//         "listOrgID": "Founders"
//     },
//     {
//         "id": 2,
//         "listName": "React.js Developer",
//         "listDesc": "Need a developer to help Siraj on the Frontend",
//         "isPaid": false,
//         "listLocation": "Champaign, IL",
//         "isOpen": true,
//         "listLongDesc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         "listOrgID": "Founders 2"
//     }
// ];

var errorMessage = "End of results";
var feedLength = -1;

function formatDateString(str) {
  var year = str.substring(0, 4);
  var month = str.substring(5, 7);
  var day = str.substring(8, 10);
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
      month = "Novebmer";
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
            ></Listing>
          ))}

          <p style={{fontSize: "22px", color: "#8e8e8e"}}>{errorMessage}</p>
        </>
      )
    }
}
