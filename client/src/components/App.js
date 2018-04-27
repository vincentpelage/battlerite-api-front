import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';

// Components import
import ScrollToTop from './Scroll/ScrollToTop';
import Loader from './Loader/Loader';
import TopChampions from './TopChampions/TopChampions';
import ChampionsStats from './ChampionsStats/ChampionsStats';
import ChampionPage from './ChampionPage/ChampionPage';
import BestSynergies from './BestSynergies/BestSynergies';
import NotFound from './NotFound/NotFound';

// CSS import
import './App.css';

class App extends Component {

  state = {
    displayHeader: true,
    loaded: false,
    topChampions: {
      topSoloDatas: [],
      topDuoDatas: [],
      topTrioDatas: []
    },
    championStats: {},
    bestSynergies: {
      bestSynergiesDuo: {},
      bestSynergiesTrio: {},
    },
  };

  componentWillMount() {
    axios.get('/api/data-to-front')
      .then((response) => {
        this.setState({
          loaded: true,
          topChampions: {
            topSoloDatas: response.data.topChampions.solo,
            topDuoDatas: response.data.topChampions.duo,
            topTrioDatas: response.data.topChampions.trio
          },
          championStats: response.data.championStats,
          bestSynergies: {
            bestSynergiesDuo: response.data.topChampions['2v2synergie'],
            bestSynergiesTrio: response.data.topChampions['3v3synergie'],
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { topChampions, bestSynergies, championStats } = this.state;
    if (!this.state.loaded) {
      return (
        <div className='loader'>
          <Loader className='turquoise'/>
          <Loader className='pop-purple'/>
          <Loader className='pink'/>
        </div>
      );
    }
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" render={() => <TopChampions championStats={championStats} topChampions={topChampions}/>} />
            <Route exact path="/champions-stats" render={() => <ChampionsStats championStats={championStats} />} />
            <Route exact path="/champions-stats/:champion" render={() => <ChampionPage championStats={championStats} />} />
            <Route exact path="/best-synergies" render={() => <BestSynergies bestSynergiesDuo={bestSynergies.bestSynergiesDuo} bestSynergiesTrio={bestSynergies.bestSynergiesTrio} />} />
            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
