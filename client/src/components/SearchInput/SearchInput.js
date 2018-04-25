import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ placeholder, storeSearchInput, getInputActor }) => {

  return (
    <input
      type="text"
      placeholder={placeholder}
      ref={storeSearchInput}
      onChange={getInputActor}
    />
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  storeSearchInput: PropTypes.object,
  getInputActor: PropTypes.func,
}

export default SearchInput;
