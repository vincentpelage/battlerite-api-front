import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ className }) => (
  <svg viewBox="0 0 508.928 508.928" className={className}>
    <g> <polygon points="403.712,201.04 256.288,201.04 329.792,0 105.216,307.888 252.64,307.888 179.136,508.928" /> </g>
  </svg>
);

Loader.propTypes = {
  className: PropTypes.string,
}

export default Loader;
