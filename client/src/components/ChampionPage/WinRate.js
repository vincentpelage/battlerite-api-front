import React from 'react';
import PropTypes from 'prop-types';

// local import
import WinRatePerLeague from './WinRatePerLeague';

const WinRate = ({ actorStat }) => {
  return (
    <section className="winrate-per-league">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="period">Datas over the last 7 days</p>
            <h3 className="h3 hyphen-turquoise">
              <span className="turquoise">Win Rate</span> per league
            </h3>

            <div className="legend">
              <p className="turquoise">2V2
                <span className="role-placement">(role placement 2V2)</span>
              </p>
              <p className="pop-purple">3V3
                <span className="role-placement">(role placement 3V3)</span>
              </p>
            </div>

            <div className="card card-graph">
              {
                actorStat.map( (league, index) => (
                  <WinRatePerLeague
                    key={index}
                    actorStatPerLeague={actorStat[index]}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

WinRate.propTypes = {
  actorStat: PropTypes.array,
}

export default WinRate;
