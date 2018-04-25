import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

// Components import
import LoadMore from './Elements/LoadMore';
import ChampionSolo from '../Champions/ChampionSolo';
import FadeAndSlideTransition from '../FadeAndSlideTransition/FadeAndSlideTransition';

class TopSolo extends Component {
  static propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    topSolo: PropTypes.array,
  }

  state = {
    counter: 4
  }

  loadMoreChampions = () => {
    if (this.state.counter < this.props.topSolo.length) {
      const counter = this.state.counter + 4;
      this.setState({ counter });
    }
  }

  render() {
    const { type, style, topSolo } = this.props;
    const { counter } = this.state;
    const isEnabled = counter < topSolo.length;

    return (
      <section className={style}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="h3 hyphen-purple">
                <span className="top-color">{type}</span> of the week
              </h3>
              <LoadMore top={type} loadMoreChampions={this.loadMoreChampions} isEnabled={isEnabled}/>
              <div className="legend">
                <p className="pop-purple">Best win rate</p>
              </div>
            </div>
          </div>
          <TransitionGroup className="row">
          {
            topSolo.slice(0, counter).map( solo => (
              <FadeAndSlideTransition duration={150} key={solo.id}>
                <div className="col-6 col-md-6 col-lg-3">
                  <ChampionSolo data={solo.winrate} actorId={solo.id}/>
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

export default TopSolo;
