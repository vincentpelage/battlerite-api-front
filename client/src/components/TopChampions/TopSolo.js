import React from 'react';
// Components import
import ChampionSolo from '../Champions/ChampionSolo';

const TopSolo = ({ type, style, topBDD }) =>  (
  <section className={style}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="h3 hyphen-purple">
            <span className="top-color">{type}</span> of the week
          </h3>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <ChampionSolo data={topBDD[0]['winRate'] + ' %'} content='Best win rate' />
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <ChampionSolo data={topBDD[1]['damage']} content='Best melee damage'/>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <ChampionSolo data={topBDD[2]['damage']} content="Best ranged damage"/>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <ChampionSolo data={topBDD[3]['healing']} content="Best Healer"/>
        </div>
      </div>
    </div>
  </section>
);

export default TopSolo;
