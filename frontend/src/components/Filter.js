import React, { Component } from 'react';
import Select from 'react-select';

const segments = [
  { name: 'All' },
  { name: 'Internships'},
  { name: 'Full Time' }
];

const tempOptions = [
  { label: "Any", value: 0 },
  { label: "Accounting/Finance", value: 1 },
  { label: "Agriculture", value: 2 },
  { label: "Art/Design", value: 3 },
  { label: "Project Management", value: 4 },
  { label: "Software Engineering", value: 5 },
];

export default class Filter extends Component {
  state = {

  }

  render () {
      return (
        <>
           <label className="filter-label">Industry</label>
           <Select
             options={tempOptions}
             className="filter-dropdown"
             defaultValue={tempOptions[0]}
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
          <input id="paidSelector" type="checkbox" /><label htmlFor="paidSelector"> Paid</label>
        </>
      )
   }
}
