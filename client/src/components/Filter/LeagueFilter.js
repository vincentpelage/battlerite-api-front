import React, { Component } from 'react';

class LeagueFilter extends Component {
  state = {
    league: "overall"
  }

  handleChange = (event) => {
    this.setState({ league: event.target.value });
  }

  render() {

    return (
    <div className="select-wrapper">
      <select name="league" id="league" onChange={this.handleChange}>
        <option value="overall">League</option>
        <option value="grand-champion">Grand Champion</option>
        <option value="champion">Champion</option>
        <option value="diamond">Diamond</option>
        <option value="platinum">Platinum</option>
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="bronze">Bronze</option>
      </select>
    </div>
    );
  }
}

export default LeagueFilter;
