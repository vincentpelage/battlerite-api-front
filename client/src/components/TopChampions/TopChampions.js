import React, { Fragment } from 'react';
// Component import
import TopSolo from './TopSolo';
import TopDuo from './TopDuo';
import TopTrio from './TopTrio';
// Local import
import { topContentSolo, topContentDuo, topContentTrio } from '../../contents/home';


const TopChampions = ({ topBDD }) => (
  <Fragment>
    <TopSolo type={topContentSolo.type} style={topContentSolo.style} topBDD={topBDD.topSoloDatas}/>
    <TopDuo type={topContentDuo.type} style={topContentDuo.style} topBDD={topBDD.topDuoDatas}/>
    <TopTrio type={topContentTrio.type} style={topContentTrio.style} topBDD={topBDD.topTrioDatas}/>
  </Fragment>

);

export default TopChampions;
