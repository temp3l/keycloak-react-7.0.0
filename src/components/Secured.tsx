import React from 'react';
import AdmContext from '../admContext';
declare let window: any;

class Welcome extends React.Component<any,any> {
  state = { name: '', email: '', sub: '', email_verified: false, expiration:'', error:'' }
  static contextType = AdmContext

  componentDidMount(){

    window.keycloak.loadUserInfo()
      .success( (info:any) => this.setState(info))
      .error( () => this.setState({error: 'Failed to load user info'}) );;

    window.keycloak.loadUserProfile()
      .success( (userInfo:any) => this.setState(userInfo) )
      .error( () => this.setState({error: 'Failed to load user profile'}) );

      //axios.get('http://localhost:8080/auth/admin/realms/master/roles').then(console.log)
  }
  render() {
    const keycloak = window.keycloak;
    return <>
      <h1>Hello, {this.props.name}</h1>
      <div className="UserInfo">
        <p>ID: {this.state.sub}</p>
        <p>Name: {this.state.name}</p>
        <p>Email: {this.state.email}</p>
        <p>email_verified: {String(this.state.email_verified)}</p>
        <p>{this.state.expiration}</p>
        <p>Token Expires in: {Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000)} seconds</p>
        <p>Refresh Token Expires in: {Math.round(keycloak.refreshTokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000)} seconds</p>
        <pre>{JSON.stringify(this.state,null,4)}</pre>
      </div>
    </>;
  }
}
export default Welcome;
