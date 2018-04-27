import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// local import
import ChampionTrio from '../Champions/ChampionTrio';

const RenderTrio = ({ bestSynergiesTrio }) => {

  return (
    <Fragment>
      {
        bestSynergiesTrio.map( SynergyTrio => (
          <div className="col-sm-6" key={SynergyTrio._id.teamIds[0] + SynergyTrio._id.teamIds[1] + SynergyTrio._id.teamIds[2]}>
            <ChampionTrio
              data={SynergyTrio.winrate}
              actorId1={SynergyTrio._id.teamIds[0]}
              actorId2={SynergyTrio._id.teamIds[1]}
              actorId3={SynergyTrio._id.teamIds[2]}
            />
          </div>
        ))
      }
    </Fragment>
  );
}

RenderTrio.propTypes = {
  bestSynergiesTrio: PropTypes.array,
}

export default RenderTrio;
