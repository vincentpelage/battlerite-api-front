import React from 'react';
import Destiny from '../../assets/images/minis/Destiny.jpg';
import Pestilus from '../../assets/images/minis/Destiny.jpg';
import Poloma from '../../assets/images/minis/Destiny.jpg';
// Image import
// fichier dans content avec un array d'objets contenant les noms en clef et les emplacements des images en valeur


const ChampionTrio = ({ data, content }) => {
  return (
    <div className="card card-champion">
      <div className="card-image">
        <img src={Destiny} alt="Destiny"/>
        <img src={Pestilus} alt="Pestilus"/>
        <img src={Poloma} alt="Poloma"/>
      </div>
      <p className="content">{content}</p>
      <p className="data">{data}</p>
    </div>
  );
}

export default ChampionTrio;
