import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

// Components import
import LoadMore from './Elements/LoadMore';
import ChampionTrio from '../Champions/ChampionTrio';
import FadeAndSlideTransition from '../FadeAndSlideTransition/FadeAndSlideTransition';

class TopTrio extends Component {
  static propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    topTrio: PropTypes.array,
  }

  state = {
    counter: 3
  }

  loadMoreChampions = () => {
    const counter = this.state.counter + 3;
    this.setState({ counter });
  }

  render() {
    const { type, style, topTrio } = this.props;
    const { counter } = this.state;
    const isEnabled = counter < topTrio.length;

    return (
      <section className={style}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="h3 hyphen-pink">
                <span className="top-color">{type}</span> of the week
              </h3>
              <LoadMore top={type} loadMoreChampions={this.loadMoreChampions} isEnabled={isEnabled}/>
              <div className="legend">
                <p className="pink">Best win rate</p>
              </div>
            </div>
          </div>
          <TransitionGroup className="row">
          {
            topTrio.slice(0, counter).map( trio => (
              <FadeAndSlideTransition duration={150} key={trio._id.teamIds[0] + trio._id.teamIds[1] + trio._id.teamIds[2]}>
                <div className="col-sm-6 col-md-4">
                  <ChampionTrio
                    data={trio.winrate}
                    actorId1={trio._id.teamIds[0]}
                    actorId2={trio._id.teamIds[1]}
                    actorId3={trio._id.teamIds[2]}
                  />
                </div>
              </FadeAndSlideTransition>
            ))
          }
          </TransitionGroup>
        </div>
      </section>
    );
  }
}

export default TopTrio;
