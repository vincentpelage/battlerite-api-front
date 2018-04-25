import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

// local import
import getActor from './utils/getActor';



const ChampionDuo = ({ data, actorId1, actorId2 }) => {
  const actor1 = getActor(actorId1);
  const actor2 = getActor(actorId2);

  return (
    <div className="card card-champion">
      <div className="card-image">
        <LazyLoad height={200}>
          <img src={actor1[0].image} alt={actor1[0].name}/>
          <img src={actor2[0].image} alt={actor2[0].name}/>
        </LazyLoad>
      </div>
      <p className="content">{actor1[0].name} - {actor2[0].name}</p>
      <p className="data">{data} %</p>
    </div>
  );
}

ChampionDuo.propTypes = {
  data: PropTypes.number,
  actorId1: PropTypes.number,
  actorId2: PropTypes.number,
}

export default ChampionDuo;
