import React, { Fragment } from 'react';
// local import
import Filter from '../Filter/Filter';
import ChampionStats from './ChampionStats';

const ChampionsStats = () => {
  return (
    <Fragment>
      <Filter />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3">
            <ChampionStats />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ChampionsStats;
