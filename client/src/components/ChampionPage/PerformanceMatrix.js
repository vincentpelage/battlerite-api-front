import React from 'react';
import PropTypes from 'prop-types';
import { Radar } from 'react-chartjs';
// local import
import { matrixData, matrixOptions } from '../../datasBDD/matrix-chart';

const PerformanceMatrix = ({ actorStat, averageStat, actorStatPerLeague, currentActor }) => {
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getMatrixDataset = (matrixData) => {
    const matrixDataCopy = matrixData;
    matrixDataCopy.datasets[1]['data'] = [averageStat.score, averageStat.damageDone, averageStat.healingDone, averageStat.disablesDone, averageStat.damageReceived];
    matrixDataCopy.datasets[0]['data'] = [actorStat.score, actorStat.damageDone, actorStat.healingDone, actorStat.disablesDone, actorStat.damageReceived];
    matrixDataCopy.datasets[0]['label'] = capitalizeFirstLetter(currentActor[0].name);
  }
  getMatrixDataset(matrixData);

  return (
    <div className="card card-matrix">
      <Radar data={matrixData} options={matrixOptions} />
    </div>
  );
}

PerformanceMatrix.propTypes = {
  actorStatPerLeague: PropTypes.array,
  actorStat: PropTypes.object,
  averageStat: PropTypes.object,
  currentActor: PropTypes.array,
}

export default PerformanceMatrix;
