import React, { Component } from 'react';

class RoleFilter extends Component {
  state = {
    role: "overall"
  }

  handleChange = (event) => {
    this.setState({ role: event.target.value });
  }

  render() {
    return (
      <div className="select-wrapper">
        <select name="role" id="role" onChange={this.handleChange}>
          <option value="overall">Role</option>
          <option value="melee">Melee</option>
          <option value="ranged">Ranged</option>
          <option value="support">Support</option>
        </select>
      </div>
    );
  }
}

export default RoleFilter;
