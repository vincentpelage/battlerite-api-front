import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


// local import
import ChampionDuo from '../Champions/ChampionDuo';

const RenderDuo = ({ bestSynergiesDuo }) => {

  return (
    <Fragment>
      {
        bestSynergiesDuo.map( SynergyDuo => (
          <div className="col-6" key={SynergyDuo._id.teamIds[0] + SynergyDuo._id.teamIds[1]}>
            <ChampionDuo
              data={SynergyDuo.winrate}
              actorId1={SynergyDuo._id.teamIds[0]}
              actorId2={SynergyDuo._id.teamIds[1]}
            />
          </div>
        ))
      }
    </Fragment>
  );
}

RenderDuo.propTypes = {
  bestSynergiesDuo: PropTypes.array,
}

export default RenderDuo;
