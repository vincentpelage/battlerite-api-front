import React, { Component } from 'react';

class MapFilter extends Component {
  state = {
    map: "overall"
  }

  handleChange = (event) => {
    this.setState({ map: event.target.value });
  }

  render() {
    return (
      <div className="select-wrapper">
        <select name="map" id="map" onChange={this.handleChange}>
          <option value="overall">Map</option>
          <option value="blackstone-arena">Blackstone Arena</option>
          <option value="dragon-garden">Dragon Garden</option>
          <option value="mount-araz">Mount Araz</option>
          <option value="orman-temple">Orman Temple</option>
          <option value="sky-ring">Sky Ring</option>
        </select>
      </div>
    );
  }
}

export default MapFilter;
