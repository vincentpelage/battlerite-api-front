import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => (
  <nav className="nav">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <ul>
            <li>
              <Link to="/">Top Champions</Link>
            </li>
            <li>
              <Link to="/champions-stats">Champion's Stats</Link>
            </li>
            <li>
              <Link to="/best-synergies">Best Synergies</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default Nav;
