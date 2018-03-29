import React, { Component } from 'react';

class RegionFilter extends Component {
  state = {
    region: "overall"
  }

  handleChange = (event) => {
    this.setState({ region: event.target.value });
  }

  render() {
    return (
      <div className="select-wrapper">
        <select name="region" id="region" onChange={this.handleChange}>
          <option defaultValue="overall">Region</option>
          <option value="blackstone-arena">Australia</option>
          <option value="dragon-garden">Asia</option>
          <option value="mount-araz">Hong Kong</option>
          <option value="orman-temple">East India</option>
          <option value="sky-ring">Japan</option>
          <option value="sky-ring">South West United States</option>
          <option value="sky-ring">West United States</option>
          <option value="sky-ring">South East United States</option>
          <option value="sky-ring">East United States</option>
          <option value="sky-ring">India</option>
          <option value="sky-ring">North Europe</option>
          <option value="sky-ring">East Europe</option>
          <option value="sky-ring">West Europe</option>
          <option value="sky-ring">Poland</option>
          <option value="sky-ring">Spain</option>
          <option value="sky-ring">South Africa</option>
          <option value="sky-ring">Chili</option>
          <option value="sky-ring">South America</option>
          <option value="sky-ring">Peru</option>
        </select>
      </div>
    );
  }
}

export default RegionFilter;
