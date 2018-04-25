import React from 'react';
import PropTypes from 'prop-types';

// local import
import getLeagueName from './utils/getLeagueName';

const PerformanceTablePerLeague = ({ actorStatPerLeague, rolePlacement }) => {
  return (
    <tr>
      <td>{getLeagueName(actorStatPerLeague.leagueId)}</td>
      <td className="data-stat">{actorStatPerLeague.statActor.score} <span className="role-placement">{rolePlacement.rolePlacementActor.score}</span></td>
      <td className="data-stat">{actorStatPerLeague.statActor.damageDone} <span className="role-placement">{rolePlacement.rolePlacementActor.damageDone}</span></td>
      <td className="data-stat">{actorStatPerLeague.statActor.healingDone} <span className="role-placement">{rolePlacement.rolePlacementActor.healingDone}</span></td>
      <td className="data-stat">{actorStatPerLeague.statActor.disablesDone} <span className="role-placement">{rolePlacement.rolePlacementActor.disablesDone}</span></td>
      <td className="data-stat">{actorStatPerLeague.statActor.damageReceived} <span className="role-placement">{rolePlacement.rolePlacementActor.damageReceived}</span></td>
    </tr>
  );
}

PerformanceTablePerLeague.propTypes = {
  actorStatPerLeague: PropTypes.object,
  rolePlacement: PropTypes.object,
}

export default PerformanceTablePerLeague;
