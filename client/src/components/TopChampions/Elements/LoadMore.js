import React from 'react';
import PropTypes from 'prop-types';

const LoadMore = ({ top, loadMoreChampions, isEnabled }) => (
  <button className="btn btn-outline" onClick={loadMoreChampions} disabled={!isEnabled}>Load More {top}</button>
);

LoadMore.propTypes = {
  top: PropTypes.string,
  loadMoreChampions: PropTypes.func,
  isEnabled: PropTypes.bool,
}

export default LoadMore;
