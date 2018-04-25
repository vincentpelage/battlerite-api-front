import React from 'react';
import PropTypes from 'prop-types';

const RoleFilter = ({ handleChangeRole }) => {
  return (
    <div className="select-wrapper">
      <select name="role" id="role" onChange={handleChangeRole}>
        <option value="overall">Role</option>
        <option value="melee">Melee</option>
        <option value="ranged">Ranged</option>
        <option value="support">Support</option>
      </select>
    </div>
  );
}

RoleFilter.propTypes = {
  handleChangeRole: PropTypes.func,
}

export default RoleFilter;
