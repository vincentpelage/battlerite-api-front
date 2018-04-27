import React from 'react';
import PropTypes from 'prop-types';

const LoadMore = ({ top, loadMoreChampions, isEnabled }) => {
  const message = isEnabled ? `Show More ${top}` : `Enough is enough !`;

  return (
    <button className="btn btn-outline" onClick={loadMoreChampions} disabled={!isEnabled}>{message}</button>

  );
}

LoadMore.propTypes = {
  top: PropTypes.string,
  loadMoreChampions: PropTypes.func,
  isEnabled: PropTypes.bool,
}

export default LoadMore;
