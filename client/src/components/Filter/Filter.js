import React from 'react';
// local import
import SortByFilter from './SortByFilter';
import RoleFilter from './RoleFilter';
import LeagueFilter from './LeagueFilter';
import MatchFilter from './MatchFilter';
import MapFilter from './MapFilter';
import RegionFilter from './RegionFilter';

const Filter = () => {
  return (
    <section className="filter">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SortByFilter />
            <RoleFilter />
            <LeagueFilter />
            <MatchFilter />
            <MapFilter />
            <RegionFilter />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filter;
