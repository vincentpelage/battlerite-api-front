import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// Component import
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import TopSolo from './TopSolo';
import TopDuo from './TopDuo';
import TopTrio from './TopTrio';
// Local import
import { topContentSolo, topContentDuo, topContentTrio } from '../../contents/home';

const TopChampions = ({ topChampions, championStats }) => (
  <Fragment>
    <Header />
    <Nav />
    <TopSolo type={topContentSolo.type} style={topContentSolo.style} topSolo={championStats.global}/>
    <TopDuo type={topContentDuo.type} style={topContentDuo.style} topDuo={topChampions.topDuoDatas}/>
    <TopTrio type={topContentTrio.type} style={topContentTrio.style} topTrio={topChampions.topTrioDatas}/>
  </Fragment>
);

TopChampions.propTypes = {
  topChampions: PropTypes.shape({
    topSoloDatas: PropTypes.array,
    topDuoDatas: PropTypes.array,
    topTrioDatas: PropTypes.array,
  }),
}

export default TopChampions;
