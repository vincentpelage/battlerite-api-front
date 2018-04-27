import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

// local import
import actors from '../../contents/actors'
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import SearchInput from '../SearchInput/SearchInput';
import MatchFilterLight from '../Filter/MatchFilterLight';
import ChampionsMosaic from './ChampionsMosaic';
import RenderDuo from './RenderDuo';
import RenderTrio from './RenderTrio';


class BestSynergies extends Component {
  storeSearchInput = React.createRef();

  static propTypes = {
    bestSynergiesDuo: PropTypes.object,
    bestSynergiesTrio: PropTypes.object,
  }

  state = {
    bestSynergiesDuo: [],
    bestSynergiesTrio: [],
    match: "2V2",
    selected: null,
    search: '',
  }

  componentWillMount() {
    this.getSynergies(actors[0].id);
  }

  getSynergies = (actorId) => {
    let { bestSynergiesDuo, bestSynergiesTrio } = this.props;
    bestSynergiesDuo = bestSynergiesDuo[actorId];
    bestSynergiesTrio = bestSynergiesTrio[actorId];
    this.setState({ bestSynergiesTrio, bestSynergiesDuo, selected: actorId });
  }

  getBestSynergies = actorId => event => {
    this.getSynergies(actorId);
  }

  handleChangeMatch = (event) => {
    this.setState({ match: event.target.value });
  }

  getInputActor = event => {
    const search = this.storeSearchInput.current.value.toLowerCase();
    this.setState({ search });
  };

  getSearch = () => {
    const searchActor = actors.filter( actor => (actor.name).startsWith(this.state.search));
    return searchActor;
  };

  render() {
    const { match, bestSynergiesDuo, bestSynergiesTrio, selected, search } = this.state;
    const renderMatchFiltering = (match === '2V2') ? (<RenderDuo bestSynergiesDuo={bestSynergiesDuo} />) : (<RenderTrio bestSynergiesTrio={bestSynergiesTrio} />);

    return (
      <Fragment>
        <Header />
        <Nav />
        <section className="best-synergies">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="h3 hyphen-purple">
                  <span className="pop-purple">Choose</span> a champion
                </h3>
                <div className="input-search">
                  <SearchInput placeholder='Type a champion' storeSearchInput={this.storeSearchInput} getInputActor={this.getInputActor}/>
                </div>
              </div>
              <div className="col-lg-5">
                <FlipMove
                  duration={250}
                  easing="ease-out"
                  appearAnimation={true}
                  className="card card-mosaic"
                  maintainContainerHeight={true}
                >
                  {
                    this.getSearch().map( (actor) => (
                      <ChampionsMosaic
                        key={actor.id}
                        getBestSynergies={this.getBestSynergies}
                        selected={selected}
                        actor={actor}
                      />
                    ))
                  }
                </FlipMove>
              </div>
              <div className="col-lg-7">
                <div className="legend-wrapper">
                  <MatchFilterLight handleChangeMatch={this.handleChangeMatch}/>
                  <div className="legend">
                    <p className="turquoise">Best synergies by win rate (over the last 7 days)</p>
                  </div>
                </div>
                <div className="row">
                  {renderMatchFiltering}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default BestSynergies;
