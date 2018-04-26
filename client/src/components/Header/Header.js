import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";

// local import
import getPathname from './utils/getPathname';
import isNotChampionUrl from './utils/isNotChampionUrl';
import getQuote from './utils/getQuote';
import actors from '../../contents/actors';
import bannerBattlerite from '../../assets/images/battlerite.jpg';


class Header extends Component {
  render() {

    const BannerContentGlobal = () => {
      const bannerStyle = {backgroundImage: 'url(' + bannerBattlerite + ')'};

      return (
        <header className="header" style={bannerStyle}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="flex">
                  <Link to="/">
                  <h1 className="h1">Battlerite
                    <svg className="center" viewBox="0 0 508.928 508.928">
                      <g> <polygon points="403.712,201.04 256.288,201.04 329.792,0 105.216,307.888 252.64,307.888 179.136,508.928" /> </g>
                    </svg>
                    Pro</h1>
                    </Link>
                  <h2 className="h2">Get all <span className="turquoise">stats</span> you need to improve your game</h2>
                </div>
              </div>
            </div>
          </div>
        </header>
      );
    }

    const BannerContentChampion = () => {
      const currentChampion = actors.find(champion => champion.path === getPathname());
      const bannerStyle = {backgroundImage: 'url(' + currentChampion.banner + ')'};

      return (
        <header className="header" style={bannerStyle}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="flex">
                  <h1 className="h1">{currentChampion.h1}</h1>
                  <div className="quote-wrapper">
                    <svg className="left" viewBox="0 0 508.928 508.928">
                      <g className="miror"> <polygon points="403.712,201.04 256.288,201.04 329.792,0 105.216,307.888 252.64,307.888 179.136,508.928" /> </g>
                    </svg>
                    <h2 className="h2 quote">{getQuote(currentChampion.h2)}</h2>
                    <svg className="right" viewBox="0 0 508.928 508.928">
                      <g> <polygon points="403.712,201.04 256.288,201.04 329.792,0 105.216,307.888 252.64,307.888 179.136,508.928" /> </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      );
    }

    const banner = isNotChampionUrl() ? <BannerContentGlobal /> : <BannerContentChampion />;

    return (
      <Fragment>
        {banner}
      </Fragment>
    );
  }
}

export default Header;
