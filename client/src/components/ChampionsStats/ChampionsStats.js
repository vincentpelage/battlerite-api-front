import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

// local import
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Filter from '../Filter/Filter';
import ChampionStats from './ChampionStats';
import filterStats from './utils/filterStats';

class ChampionsStats extends Component {
  static propTypes = {
    championStats: PropTypes.object,
  }

  state = {
    sortBy: 'winRate',
    role: 'overall',
    match: 'overall',
    league: 'overall',
  }

  handleChangeSortBy = (event) => {
    this.setState({ sortBy: event.target.value });
  }

  handleChangeRole = (event) => {
    this.setState({ role: event.target.value });
  }

  handleChangeMatch = (event) => {
    this.setState({ match: event.target.value });
  }

  handleChangeLeague = (event) => {
    this.setState({ league: event.target.value });
  }

  sortByStats = (a, b) => {
    const sortBy = this.state.sortBy;
    if (a[sortBy] > b[sortBy])
      return -1;
    if (a[sortBy] < b[sortBy])
      return 1;
    return 0;
  }

  filterRole = (stats) => {
    const role = this.state.role;
    if (role !== 'overall') {
      return stats.filter( champion =>  champion.role === role);
    } else {
      return stats;
    }
  }


  render() {
    const { match, league } = this.state;
    const { championStats } = this.props;
    const statsChampion = filterStats(match, league, championStats);

    return (
      <Fragment>
        <Header />
        <Nav />
        <Filter
          handleChangeSortBy={this.handleChangeSortBy}
          handleChangeRole={this.handleChangeRole}
          handleChangeMatch={this.handleChangeMatch}
          handleChangeLeague={this.handleChangeLeague}
        />
        <section className="champions-stats">
          <div className="container">
            <FlipMove duration={750} easing="ease-out" appearAnimation={true} className="row">
              {
                this.filterRole(statsChampion.stats)
                .sort(this.sortByStats)
                .map( stat => (
                  <ChampionStats key={stat.id} stat={stat} nbMatchs={statsChampion.nbMatchs}/>
                ))
              }
            </FlipMove>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default ChampionsStats;
