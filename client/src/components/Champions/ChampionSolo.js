import React from 'react';
import Destiny from '../../assets/images/minis/Destiny.jpg';
// Image import
// fichier dans content avec un array d'objets contenant les noms en clef et les emplacements des images en valeur


const ChampionSolo = ({ data, content }) => {
  return (
    <div className="card card-champion">
      <div className="card-image">
        <img src={Destiny} alt="Destiny"/>
      </div>
      <p className="content">{content}</p>
      <p className="data">{data}</p>
    </div>
  );
}

export default ChampionSolo;
