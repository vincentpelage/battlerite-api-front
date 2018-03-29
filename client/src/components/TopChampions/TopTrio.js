import React from 'react';
// Components import
import LoadMore from './Elements/LoadMore';
import ChampionTrio from '../Champions/ChampionTrio';

const TopTrio = ({ type, style, topBDD }) =>  (
  <section className={style}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="h3 hyphen-pink">
            <span className="top-color">{type}</span> of the week
          </h3>
          <LoadMore top={type}/>
        </div>
        <div className="col-6 col-md-4">
          <ChampionTrio data={topBDD[0]['winRate'] + ' %'} content='Best win rate' />
        </div>
        <div className="col-6 col-md-4">
          <ChampionTrio data={topBDD[1]['winRate'] + ' %'} content='Best win rate' />
        </div>
        <div className="col-6 col-md-4">
          <ChampionTrio data={topBDD[2]['winRate'] + ' %'} content='Best win rate' />
        </div>
      </div>
    </div>
  </section>
);

export default TopTrio;
