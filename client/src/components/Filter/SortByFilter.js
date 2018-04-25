import React from 'react';
import PropTypes from 'prop-types';

const SortByFilter = ({ handleChangeSortBy }) => {
  return (
    <div className="select-wrapper">
      <select name="sortBy" id="sortBy" onChange={handleChangeSortBy}>
        <option value="winRate">Sort by Win rate</option>
        <option value="damageDone">Sort by Damage</option>
        <option value="healingDone">Sort by Healing</option>
        <option value="disablesDone">Sort by Disable</option>
        <option value="score">Sort by Score</option>
      </select>
    </div>
  );
}

SortByFilter.propTypes = {
  handleChangeSortBy: PropTypes.func,
}

export default SortByFilter;
