import React from 'react';

const Header = () => (
  <header className="header">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="flex">
            <h1 className="h1">Battlerite
              <span className="light">
                <svg viewBox="0 0 508.928 508.928">
                  <g> <polygon points="403.712,201.04 256.288,201.04 329.792,0 105.216,307.888 252.64,307.888 179.136,508.928" /> </g>
                </svg>
              </span>Stats</h1>
            <h2 className="h2">Get all <span className="turquoise">stats</span> you need to improve your game</h2>
          </div>
        </div>
      </div>
    </div>
  </header>
)

export default Header;
