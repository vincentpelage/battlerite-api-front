import React, { Component } from 'react';

class MatchFilter extends Component {
  state = {
    match: "2V2"
  }

  handleChange = (event) => {
    this.setState({ match: event.target.value });
  }

  render() {
    return (
      <div className="select-wrapper">
        <select name="match" id="match" onChange={this.handleChange}>
          <option value="2V2">2V2</option>
          <option value="3V3">3V3</option>
        </select>
      </div>
    );
  }
}

export default MatchFilter;
