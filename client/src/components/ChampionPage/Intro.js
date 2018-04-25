import React from 'react';
import PropTypes from 'prop-types';

// local import

const Intro = ({ actor }) => {

  return (
    <section className="intro">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className='champion-type'>{actor[0].role}</p>
            <p>{actor[0].intro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

Intro.propTypes = {
  actor: PropTypes.array,
}

export default Intro;
