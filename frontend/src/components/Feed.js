import React, { Component } from 'react';

// Components
import Listing from '../components/Listing';

const Test = ({listings}) => (
  <>
    {listings.map(post => (
      <Listing
        listName={post.listName}
        listLocation={post.listLocation}
        listDesc={post.listDesc}
        company={post.listOrgID}
        logo={"/img/org/" + post.listOrgID + ".png"}
      ></Listing>
    ))}
  </>
);

var listings = [
  {
        "id": 1,
        "listName": "Django/REST Developer",
        "listDesc": "Need a developer to help Davis on the Backend",
        "isPaid": true,
        "listLocation": "Urbana, IL",
        "isOpen": true,
        "listLongDesc": "hj;lksfdkflsdafhakffhfna",
        "listOrgID": "Founders"
    },
    {
        "id": 2,
        "listName": "React.js Developer",
        "listDesc": "Need a developer to help Siraj on the Frontend",
        "isPaid": false,
        "listLocation": "Champaign, IL",
        "isOpen": true,
        "listLongDesc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "listOrgID": "Founders 2"
    }
];

export default class Feed extends Component {
  state = {

  }

  render () {
      return (
        <>
          <Test listings={listings} />
        </>
      )
   }
}
