import React from 'react';
import PropTypes from 'prop-types';

// local import
import PerformanceTablePerLeague from './PerformanceTablePerLeague';

const PerformanceTable = ({ actorStatPerLeague, rolePlacement }) => {
  return (
    <div className="card card-table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Score</th>
            <th>Damage<br />done</th>
            <th>Healing<br />done</th>
            <th>Disables<br />done</th>
            <th>Damage<br />receive</th>
          </tr>
        </thead>
        <tbody>
          {
            actorStatPerLeague.map( (league, index) => (
              <PerformanceTablePerLeague
                key={index}
                actorStatPerLeague={actorStatPerLeague[index]}
                rolePlacement={rolePlacement[index]}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

PerformanceTable.propTypes = {
  actorStatPerLeague: PropTypes.array,
  rolePlacement: PropTypes.array,
}

export default PerformanceTable;
