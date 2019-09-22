import React from 'react';
import {useRoutes, A} from 'hookrouter';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import Secured from './components/Secured';
import Dashboard from './components/UserList/Dashboard';
import UserDetails from './components/UserList/UserDetails';
import AdminService from './utils/adminService';
import Navbar from './components/nav/Navbar';
import AdmContext, { AdmProvider, AdmConsumer } from './admContext'
import './App.css';
declare let window: any;

const routes = {
  '/secured': () => <Secured/>,
  '/dashboard': () => <Dashboard />,
  '/users': () => <UserDetails />,
  '/users/:id': ({id}:any) => <UserDetails id={id} />,
};

const Home = () => {
  const routeResult = useRoutes(routes);
  return routeResult || <h3>nada her</h3>;
};


const initialState = {
  users:[],
  adm: {},
  updpateUsers: (data:any) => {
    return (initialState.users = data);
  },
}
// https://github.com/bgirten/clever-React-Context-tricks/tree/a4e490c9119aafca2ca7b2529cbd51ce58459552

type State = Readonly<typeof initialState>;

  class App extends React.Component <any, any>{
    readonly state: State = initialState;

    componentDidMount(){
     // const adm = AdminService();
      //this.setState({ adm  });
    }
    render(){
      return (<>
        <AdmProvider value={this.state}>
          <Navbar/>
          <Home />
        </AdmProvider>
      </>)
    }

// <ul>
// <li><A href="/">public component</A></li>
// <li><A href="/secured">secured component</A></li>
// <li><A href="/dashboard"> userContainer</A></li>
// <li><A href="/users/123"> users/123</A></li>
// </ul>

  // return (
  //   <BrowserRouter>
  //     <div className="container-fluid">
  //       <ul>
  //         <li><Link to="/">public component</Link></li>
  //         <li><Link to="/secured">secured component</Link></li>
  //         <li><Link to="/userContainer"> userContainer</Link></li>
  //       </ul>

  //       <Route path="/secured" component={() => <Secured keycloak={window.keycloak} />} />
  //       <Route path="/c" component={() => <UserContainer adm={adm} keycloak={window.keycloak} />} />
  //       <Route path="/users/:id" component={({id}:any) => <UserDetails id={id} adm={adm} />} />
  //     </div>
  //   </BrowserRouter>
  // );
}

export default App;
