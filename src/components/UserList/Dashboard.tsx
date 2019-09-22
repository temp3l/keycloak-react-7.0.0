import React from 'react';
import UserTable from './UserTable';
import AdminService from '../../utils/adminService';
import AdmContext from '../../admContext';

declare let window: any;

class Welcome extends React.Component<any,any> {
  state = { users: [], adm: AdminService(), loading:false  }
  static contextType = AdmContext

  fetchUsers = async () => {
    this.setState({loading:true})
    const users = await this.state.adm.users.find({max:-1});
    this.context.updpateUsers(users);
    this.setState({loading:false})
  }

  componentDidMount = () => this.fetchUsers();

  del = async (id:string) => {
    if(id === window.keycloak.tokenParsed.sub) return alert('we need you!')
    try {
      await this.state.adm.users.del({id});
      this.setState({ users: this.state.users.filter( (user:any) => user.id !== id)})
    } catch(e){
      alert(e);
      this.fetchUsers();
    }
  }

  render() {
    const {adm, users} = this.context;

    const userTableProps = {
      adm,
      fetchUsers: this.fetchUsers,
      del: this.del
    }
    return <>
      <UserTable {...userTableProps} />
    </>;
  }
}
// <button onClick={adm.createUsers} className="btn btn-sm btn-success">fake 100 Users</button>
// <pre>{JSON.stringify(this.state,null,4)}</pre>

export default Welcome;
