import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="not-found">
    <div className="content">
      <h2 className="h1">404</h2>
      
      <h1 className="h2">Sorry, Rook has eaten this page...</h1>
      <Link to="/" className="btn btn-outline">Go back before Rook eat you too !</Link>

    </div>
  </section>
)

export default NotFound;
