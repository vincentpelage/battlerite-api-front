import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => (
  <nav className="nav">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <ul>
            <Link to="/">
              <li>
                <span data-hover="Top Champions">Top Champions</span>
              </li>
            </Link>
            <Link to="/champions-stats">
              <li>
                <span data-hover="Champion's Stats">Champion's Stats</span>
              </li>
            </Link>
            <Link to="/best-synergies">
              <li>
                <span data-hover="Best Synergies">Best Synergies</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default Nav;
