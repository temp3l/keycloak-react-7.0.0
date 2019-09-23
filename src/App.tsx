import React from 'react';
import {useRoutes} from 'hookrouter';
import Secured from './components/Secured';
import Dashboard from './components/UserList/Dashboard';
import UserDetails from './components/UserList/UserDetails';
import Navbar from './components/nav/Navbar';
// import AdminService from './utils/adminService';
import { AdmProvider } from './admContext'
import './App.css';
declare let window: any;

const routes = {
  '/': () => <Dashboard />,
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
    // this.setState({ adm  });
  }
  render(){
    return (<>
      <AdmProvider value={this.state}>
        <Navbar/>
        <Home />
      </AdmProvider>
    </>)
  }
}

export default App;
