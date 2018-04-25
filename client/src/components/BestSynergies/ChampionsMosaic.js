import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

// local import

class ChampionsMosaic extends Component {
  static propTypes = {
    getBestSynergies: PropTypes.func,
    selected: PropTypes.number,
    actor: PropTypes.object,
  }

  render() {
    const { getBestSynergies, selected, actor } = this.props;
    return(
      <div className={selected === actor.id ? 'selected image-wrapper' : 'image-wrapper'} onClick={getBestSynergies(actor.id)} >
        <LazyLoad height={200}>
          <img src={actor.image} alt={actor.name} />
        </LazyLoad>
        <span data-actor-id={actor.id}>{actor.name}</span>
      </div>
    );
  }
}

export default ChampionsMosaic;
