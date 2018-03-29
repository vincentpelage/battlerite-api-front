import React from 'react';
// local import
import Destiny from '../../assets/images/champions/Destiny.jpg';

const ChampionStats = () => {
  return (
    <div className="card-details">
      <div className="card-image">
        <img src={Destiny} alt="Destiny"/>
        <p>Destiny</p>
      </div>
      <div className="card-data">
        <div className="win-rate">
          <p className="data">52 %</p>
          <progress value="22" max="100">
          </progress>
          <p className="label">Win rate</p>
        </div>
        <div className="pick-rate">
          <p className="data">58 %</p>
          <progress value="22" max="100">
          </progress>
          <p className="label">Pick rate</p>
        </div>
        <ul className="average-stats">
          <li>Average damage
            <span className="data">250</span>
          </li>
          <li>Average healing
            <span className="data">150</span>
          </li>
          <li>Average disable
            <span className="data">400</span>
          </li>
          <li>Average score
            <span className="data">800</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ChampionStats;
