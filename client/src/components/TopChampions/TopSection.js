import React from 'react';
// Components import
import LoadMore from './Elements/LoadMore';
import Champions from '../Champions/Champions';

const TopSection = ({ top, style, topBDD }) =>  (
  <section className={style}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="h3">
            <span className="top-color">{top}</span> of the week
          </h3>
          { top !== 'Champions' ? <LoadMore top={top}/> : null }
          <Champions topBDD={topBDD} />
        </div>
      </div>
    </div>
  </section>
);

export default TopSection;
