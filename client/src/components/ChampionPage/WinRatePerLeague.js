import React from 'react';
import PropTypes from 'prop-types';

// local import
import getLeagueName from './utils/getLeagueName';

const WinRatePerLeague = ({ actorStatPerLeague }) => {
  return (
    <div className="league">
      <div className="deux-v-deux">
        <p className="data-stat">{actorStatPerLeague['2V2'].winRate}%</p>
        <p className="role-placement">({actorStatPerLeague['2V2'].rolePlacement.rolePlacementActor.winRate})</p>
        <div className="progress progress-vertical">
          <div className="progress-bar" role="progressbar" aria-valuenow="52" aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
      <div className="trois-v-trois">
        <p className="data-stat">{actorStatPerLeague['3V3'].winRate}%</p>
        <p className="role-placement">({actorStatPerLeague['3V3'].rolePlacement.rolePlacementActor.winRate})</p>
        <div className="progress progress-vertical">
          <div className="progress-bar" role="progressbar" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
      <p className="label">{getLeagueName(actorStatPerLeague['leagueId'])}</p>
    </div>
  );
}

WinRatePerLeague.propTypes = {
  actorStatPerLeague: PropTypes.object,
}

export default WinRatePerLeague;
