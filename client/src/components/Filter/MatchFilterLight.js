import React from 'react';

const MatchFilterLight = ({ handleChangeMatch }) => {
  return (
    <div className="select-wrapper">
      <select name="match" id="match" onChange={handleChangeMatch}>
        <option value="2V2">2V2</option>
        <option value="3V3">3V3</option>
      </select>
    </div>
  );
}

export default MatchFilterLight;
