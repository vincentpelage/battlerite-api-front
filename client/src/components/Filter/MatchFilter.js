import React from 'react';
import PropTypes from 'prop-types';

const MatchFilter = ({ handleChangeMatch }) => {
  return (
    <div className="select-wrapper">
      <select name="match" id="match" onChange={handleChangeMatch}>
        <option value="overall">Overall</option>
        <option value="2V2">2V2</option>
        <option value="3V3">3V3</option>
      </select>
    </div>
  );
}

MatchFilter.propTypes = {
  handleChangeMatch: PropTypes.func,
}

export default MatchFilter;
