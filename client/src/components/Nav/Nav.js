import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => (
  <nav className="nav">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <ul>
            <li>
              <Link to="/"><span data-hover="Top Champions">Top Champions</span></Link>
            </li>
            <li>
              <Link to="/champions-stats"><span data-hover="Champion's Stats">Champion's Stats</span></Link>
            </li>
            <li>
              <Link to="/best-synergies"><span data-hover="Best Synergies">Best Synergies</span></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default Nav;
