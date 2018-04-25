import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

// Components import
import LoadMore from './Elements/LoadMore';
import ChampionDuo from '../Champions/ChampionDuo';
import FadeAndSlideTransition from '../FadeAndSlideTransition/FadeAndSlideTransition';

class TopDuo extends Component {
  static propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    topDuo: PropTypes.array,
  }

  state = {
    counter: 3
  }

  loadMoreChampions = () => {
    const counter = this.state.counter + 3;
    this.setState({ counter });
  }

  render() {
    const { type, style, topDuo } = this.props;
    const { counter } = this.state;
    const isEnabled = counter < topDuo.length;

    return (
      <section className={style}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="h3 hyphen-turquoise">
                <span className="top-color">{type}</span> of the week
              </h3>
              <LoadMore top={type} loadMoreChampions={this.loadMoreChampions} isEnabled={isEnabled}/>
              <div className="legend">
                <p className="turquoise">Best win rate</p>
              </div>
            </div>
          </div>
          <TransitionGroup className="row">
            {
              topDuo.slice(0, counter).map( duo => (
                <FadeAndSlideTransition duration={150} key={duo._id.teamIds[0] + duo._id.teamIds[1]}>
                  <div className="col-6 col-md-4">
                    <ChampionDuo
                      data={duo.winrate}
                      actorId1={duo._id.teamIds[0]}
                      actorId2={duo._id.teamIds[1]}
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

export default TopDuo;
