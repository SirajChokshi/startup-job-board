import React, { Component } from 'react';
import Select from 'react-select';

const sortOptions = [
  { label: "Deadline (Earliest)", value: 0 },
  { label: "Deadline (Lastest)", value: 1 },
  { label: "Popularity", value: 2 },
];

export default class Order extends Component {
  state = {
  }

  render () {
      return (
        <div>
          <Select
            style={{width: "100px !important"}}
            options={sortOptions}
            className="filter-dropdown"
            defaultValue={sortOptions[0]}
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
        )
    }
}
