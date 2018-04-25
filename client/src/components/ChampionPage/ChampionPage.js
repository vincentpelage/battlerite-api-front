import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// local import
import actors from '../../contents/actors';
import getPathname from '../Header/utils/getPathname';
import getActor from '../Champions/utils/getActor';
import findWithAttr from './utils/findWithAttr';
import sortByStats from './utils/sortByStats';
// component import
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Intro from './Intro';
import WinRate from './WinRate';
import Performance from './Performance';

const ChampionPage = ({ championStats }) => {
  const getActorId = () => {
    const currentActor = actors.filter(actor => actor.path === getPathname());
    if (currentActor.length == 0) {

      window.location.replace('https://limitless-wave-12645.herokuapp.com/champion-not-found');
    } else {
      return currentActor[0].id;
    }
  }

  const currentActor = getActor(getActorId());

  const calcRolePlacement = (value, champion) => {
    value = [...champion].sort(sortByStats(value));
    const findRolePlacement = findWithAttr(value, 'name', currentActor[0].name);
    return `${findRolePlacement + 1}/${value.length}`;
  }

  const getRolePlacement = (stats) => {
    const copyStats = {...stats};
    const sort = Object.keys(copyStats).map( league => {
      return {
        leagueId: league,
        rolePlacementActor: {
          winRate: calcRolePlacement('winRate', copyStats[league]),
          score: calcRolePlacement('score', copyStats[league]),
          damageDone: calcRolePlacement('damageDone', copyStats[league]),
          healingDone: calcRolePlacement('healingDone', copyStats[league]),
          disablesDone: calcRolePlacement('disablesDone', copyStats[league]),
          damageReceived: calcRolePlacement('damageReceived', copyStats[league]),
        }
      }
    })
    sort.unshift(sort.pop())
    return sort;
  }

  const getWinrateActorStatByMatch = (allStats, matchType) => {
    const allStatActor = Object.entries(allStats)
    allStatActor.unshift(allStatActor.pop())

    const stats = allStatActor.map( league => {
      const data = {};
      const statActor = league[1].filter( actor => actor.id === getActorId());
      const statLeague = getRolePlacement(allStats)
      .filter( leagueRolePlacement => leagueRolePlacement.leagueId === league[0]);
      data[matchType] = {};
      data[matchType] = statActor[0];
      data[matchType]['rolePlacement'] = statLeague[0];
      data['leagueId'] = league[0];
      return data;
    });
    return stats;
  }

  const getWinrateActorStat = (duo, trio) => {
    const stats = duo;
    const leagueLength = duo.length
    for (let league = 0 ; league < leagueLength ; league ++) {
      stats[league]['3V3'] = trio[league]['3V3'];
    }
    return stats;
  }

  const getPerfActorStatPerLeague = () => {
    const { globalPerLeague } = championStats;

    const allStatActor = Object.keys(globalPerLeague).map( league => {
      const statActor = globalPerLeague[league].filter( actor => actor.id === getActorId());
      const data = {};
      data['statActor'] = statActor[0];
      data['leagueId'] = league;
      return data;
    });
    allStatActor.unshift(allStatActor.pop())
    return allStatActor;
  }

  const getPerfActorStat = () => {
    const stat = championStats.global.filter( actor => actor.id === getActorId());
    return stat[0];
  }

  const getAverageStat = () => {
    const actorsRole = championStats.global.filter( actor => actor.role === currentActor[0].role);
    const nbActors = actorsRole.length;

    const statCalc = (nbActors) => {
      const data = {'score': 0, 'damageDone': 0, 'healingDone': 0, 'disablesDone': 0, 'damageReceived': 0};
      Object.keys(data).map( value => {
        return data[value] = (actorsRole.reduce((acc, actor) => {
          return acc + actor[value];
        }, 0) / nbActors).toFixed(1);
      });
      return data;
    }
    return statCalc(nbActors);
  }

  const { league2v2PerLeague, league3v3PerLeague, globalPerLeague } = championStats;

  return (
    <Fragment>
      <Header />
      <Nav />
      <Intro actor={getActor(getActorId())}/>
      <WinRate
        actorStat={
          getWinrateActorStat(getWinrateActorStatByMatch(league2v2PerLeague, '2V2'),
          getWinrateActorStatByMatch(league3v3PerLeague, '3V3'))
        }
       />
      <Performance
        actorStatPerLeague={getPerfActorStatPerLeague()}
        actorStat={getPerfActorStat()}
        averageStat={getAverageStat()}
        currentActor={currentActor}
        rolePlacement={getRolePlacement(globalPerLeague)}
      />
    </Fragment>
  );
}

ChampionPage.propTypes = {
  championStats: PropTypes.object,
}

export default ChampionPage;
