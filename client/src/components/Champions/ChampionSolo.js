import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

// local import
import getActor from './utils/getActor';


const ChampionSolo = ({ data, actorId }) => {
  const actor = getActor(actorId);

  return (
    <div className="card card-champion">
      <div className="card-image">
        <LazyLoad height={200}>
          <img src={actor[0].image} alt={actor[0].name}/>
        </LazyLoad>
      </div>
      <p className="content">{actor[0].name}</p>
      <p className="data">{data} %</p>
    </div>
  );
}

ChampionSolo.propTypes = {
  data: PropTypes.number,
  actorId: PropTypes.number,
}

export default ChampionSolo;
