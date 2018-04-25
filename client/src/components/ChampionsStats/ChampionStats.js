import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
// local import
import getActor from '../Champions/utils/getActor';

class ChampionStats extends Component {
  static propTypes = {
    stat: PropTypes.object,
    nbMatchs: PropTypes.number,
  }

  render() {
    const { stat, nbMatchs } = this.props;
    const actor = getActor(stat.id);
    const pickRate = (stat.nbMatchs / nbMatchs * 100).toFixed(1);

    return (
      <div className="col-12 col-md-4 col-lg-3">
        <Link to={actor[0].path} >
          <div className="card-details">
            <div className="card-image">
              <img src={actor[0].banner} alt={actor[0].name} />
              <p>{actor[0].name}</p>
            </div>
            <div className="card-data">
              <div className="win-rate">
                <p className="data">{stat.winRate} %</p>
                <div className="progress progress-horizontal">
                  <div className="progress-bar" role="progressbar" style={{width: stat.winRate + '%'}} aria-valuenow={stat.winRate} aria-valuemin="0" aria-valuemax="100">
                  </div>
                </div>
                <p className="label">Win rate</p>
              </div>
              <div className="pick-rate">
                <p className="data">{pickRate} %</p>
                <div className="progress progress-horizontal">
                  <div className="progress-bar" role="progressbar" style={{width: (pickRate * 5) + '%'}} aria-valuenow={pickRate} aria-valuemin="0" aria-valuemax="100">
                  </div>
                </div>
                <p className="label">Pick rate</p>
              </div>
              <ul className="average-stats">
                <li className="average-damage">
                  <p>Average damage</p>
                  <span className="data">{stat.damageDone}</span>
                </li>
                <li className="average-healing">
                  <p>Average healing</p>
                  <span className="data">{stat.healingDone}</span>
                </li>
                <li className="average-disable">
                  <p>Average disable</p>
                  <span className="data">{stat.disablesDone}</span>
                </li>
                <li className="average-score">
                  <p>Average score</p>
                  <span className="data">{stat.score}</span>
                </li>
              </ul>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ChampionStats;
