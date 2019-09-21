import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Secured from './components/Secured';
import UserContainer from './components/UserList/UserContainer';
import './App.css';
declare let window: any;
const keycloak = window.keycloak;
const App: React.FC<any> = () => {
  return (
    <BrowserRouter>
    <div className="container">
      <ul>
        <li><Link to="/">public component</Link></li>
        <li><Link to="/secured">secured component</Link></li>
        <li><Link to="/userContainer"> userContainer</Link></li>
      </ul>
      <Route path="/secured" component={() => <Secured keycloak={keycloak} />} />
      <Route path="/userContainer" component={() => <UserContainer keycloak={keycloak} />} />
    </div>
  </BrowserRouter>
  );
}

export default App;
