import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components import
import Header from './Header/Header';
import Nav from './Nav/Nav';
import TopChampions from './TopChampions/TopChampions';
import ChampionsStats from './ChampionsStats/ChampionsStats';
import ChampionPage from './ChampionPage/ChampionPage';

// Data import
import { topSoloDatas, topDuoDatas, topTrioDatas } from '../datasBDD/topBDD'

// CSS import
import './App.css';

class App extends Component {
  state = {
    topBDD: {
      topSoloDatas: [],
      topDuoDatas: [],
      topTrioDatas: []
    }
  };

  componentWillMount() {
    this.setState({
      topBDD: {
        topSoloDatas,
        topDuoDatas,
        topTrioDatas
      }
    });
  }

  render() {
    const { topBDD } = this.state;

    return (
      <Router>
        <Fragment>
          <Header />
          <Nav />
          <Route exact path="/" render={() => <TopChampions topBDD={topBDD} />} />
          <Route exact path="/champions-stats" component={ChampionsStats} />
          <Route exact path="/champions-stats/:champion" component={ChampionPage} />
          {/* <Route exact path="/best-synergies" component={ChampionsStats} /> */}
        </Fragment>
      </Router>
    );
  }
}

export default App;
