import React from 'react';
import {A} from 'hookrouter';

const Navbar = () => {
  return (<>
   <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <A className="navbar-brand" href="#">Navbar</A>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <A className="nav-link" href="/dashboard">Dash <span className="sr-only">(current)</span></A>
          </li>
          <li className="nav-item">
            <A className="nav-link" href="/users">createUser</A>
          </li>
          <li className="nav-item">
            <A className="nav-link" href="/secured">secured</A>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </>)
}
export default Navbar;
