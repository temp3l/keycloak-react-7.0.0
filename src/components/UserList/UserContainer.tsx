import React from 'react';
import UserTable from './UserTable';
import { StackedUserForm} from './UserForms';

declare let window: any;

class Welcome extends React.Component<any,any> {
  state = { users: [],   }

  fetchUsers = async () => {
    const users = await this.props.adm.users.find({max:-1});
    this.setState({users}); // TODO: handle error!
  }

  componentDidMount = () => this.fetchUsers();

  del = async (id:string) => {
    if(id === window.keycloak.tokenParsed.sub) return alert('we need you!')
    try {
      await this.props.adm.users.del({id});
      this.setState({ users: this.state.users.filter( (user:any) => user.id !== id)})
    } catch(e){
      alert(e);
      this.fetchUsers();
    }

  }

  render() {
    const {users,} = this.state;
    const {adm} = this.props;

    const userTableProps = {
      adm, users,
      fetchUsers: this.fetchUsers,
      del: this.del
    }

    return <>
      <div className="UserList">

        <div className="container">
          <StackedUserForm adm={adm}/>
        </div>

    <br/><br/><br/>

        <UserTable {...userTableProps} />
        <pre>{JSON.stringify(this.state,null,4)}</pre>
      </div>
    </>;
  }
}
// <button onClick={adm.createUsers} className="btn btn-sm btn-success">fake 100 Users</button>
export default Welcome;
