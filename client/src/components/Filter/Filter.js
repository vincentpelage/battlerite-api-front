import React from 'react';
import PropTypes from 'prop-types';

// local import
import SortByFilter from './SortByFilter';
import RoleFilter from './RoleFilter';
import LeagueFilter from './LeagueFilter';
import MatchFilter from './MatchFilter';

const Filter = ({ handleChangeMatch, handleChangeLeague, handleChangeSortBy, handleChangeRole }) => {
  return (
    <section className="filter">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="period">Datas over the last 7 days</p>
            <div className="filter-wrapper">
              <SortByFilter handleChangeSortBy={handleChangeSortBy}/>
              <RoleFilter handleChangeRole={handleChangeRole}/>
              <MatchFilter handleChangeMatch={handleChangeMatch}/>
              <LeagueFilter handleChangeLeague={handleChangeLeague}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Filter.propTypes = {
  handleChangeMatch: PropTypes.func,
  handleChangeLeague: PropTypes.func,
  handleChangeSortBy: PropTypes.func,
  handleChangeRole: PropTypes.func,
}

export default Filter;
