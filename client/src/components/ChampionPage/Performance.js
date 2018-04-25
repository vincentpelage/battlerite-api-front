import React from 'react';
import PropTypes from 'prop-types';

// local import
import PerformanceMatrix from './PerformanceMatrix';
import PerformanceTable from './PerformanceTable';

const Performance = ({ actorStatPerLeague, actorStat, averageStat, currentActor, rolePlacement }) => {
  return (
    <section className="performance-per-league">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="h3 hyphen-purple">
              <span className="pop-purple">Performance</span> per league
            </h3>
          </div>
          <div className="col-lg-5">
            <div className="legend-wrapper legend-matrice">
              <div className="legend">
                <p className="turquoise">average by {currentActor[0].role}</p>
              </div>
              <div className="legend">
                <p className="pop-purple">{currentActor[0].name}</p>
              </div>
            </div>
            <PerformanceMatrix
              actorStat={actorStat}
              averageStat={averageStat}
              actorStatPerLeague={actorStatPerLeague}
              currentActor={currentActor}
            />
          </div>
          <div className="col-lg-7">
            <div className="legend-wrapper legend-table">
              <p className="unit">Absolute value</p>
              <p className="role-placement">(role placement)</p>
            </div>
            <PerformanceTable actorStatPerLeague={actorStatPerLeague} rolePlacement={rolePlacement}/>
          </div>
        </div>
      </div>
    </section>
  );
}

Performance.propTypes = {
  actorStatPerLeague: PropTypes.array,
  actorStat: PropTypes.object,
  averageStat: PropTypes.object,
  currentActor: PropTypes.array,
  rolePlacement: PropTypes.array,
}

export default Performance;
