import React, { Component } from 'react';

class SortByFilter extends Component {
  state = {
    sortBy: "winrate"
  }

  handleChange = (event) => {
    this.setState({ sortBy: event.target.value });
  }

  render() {
    return (
      <div className="select-wrapper">
        <select name="sortBy" id="sortBy" onChange={this.handleChange}>
          <option defaultValue>Sort by</option>
          <option value="winRate">By win rate</option>
          <option value="pickRate">By pick rate</option>
          <option value="damage">By damage</option>
          <option value="healing">By healing</option>
          <option value="disable">By disable</option>
          <option value="score">By score</option>
        </select>
      </div>
    );
  }
}

export default SortByFilter;
