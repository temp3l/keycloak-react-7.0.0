import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Secured from './components/Secured';
import UserContainer from './components/UserList/UserContainer';
import AdminService from './utils/adminService';
import './App.css';
declare let window: any;


const App: React.FC<any> = () => {
  const adm = AdminService();
  return (
    <BrowserRouter>
    <div className="container-fluid">
      <ul>
        <li><Link to="/">public component</Link></li>
        <li><Link to="/secured">secured component</Link></li>
        <li><Link to="/userContainer"> userContainer</Link></li>
      </ul>
      <Route path="/secured" component={() => <Secured keycloak={window.keycloak} />} />
      <Route path="/userContainer" component={() => <UserContainer adm={adm} keycloak={window.keycloak} />} />
    </div>
  </BrowserRouter>
  );
}

export default App;
