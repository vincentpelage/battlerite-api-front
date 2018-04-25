import React from 'react';
import PropTypes from 'prop-types';

const LeagueFilter = ({ handleChangeLeague }) => {
  return (
  <div className="select-wrapper">
    <select name="league" id="league" onChange={handleChangeLeague}>
      <option value="overall">League</option>
      <option value="grand-champion">Grand Champion</option>
      <option value="champion">Champion</option>
      <option value="diamond">Diamond</option>
      <option value="platinum">Platinum</option>
      <option value="gold">Gold</option>
      <option value="silver">Silver</option>
      <option value="bronze">Bronze</option>
      <option value="placement">Placement</option>
    </select>
  </div>
  );
}

LeagueFilter.propTypes = {
  handleChangeLeague: PropTypes.func,
}

export default LeagueFilter;
