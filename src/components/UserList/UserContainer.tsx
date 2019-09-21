import React from 'react';
import UserService from './users';
import UserTable from './UserTable';

declare let window: any;
const keycloak = window.keycloak

class Welcome extends React.Component<any,any> {
  state = { users: [] }
  componentDidMount(){
    const {keycloak} = this.props;
    const service = UserService();

    const fetchAll = async () => {
      const users = await service.users.find();
      console.log(users)
      this.setState({users})
    }

    fetchAll()
  }
  render() {
    const { keycloak } = this.props;
    const {users,} = this.state;

    return <>

      <div className="UserList">
        <UserTable users={users}/>
        <pre>{JSON.stringify(this.state,null,4)}</pre>
      </div>
    </>;
  }
}
export default Welcome;
