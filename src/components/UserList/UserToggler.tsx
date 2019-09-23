import React from 'react';
import AdminService from '../../utils/adminService';
// import AdmContext from '../../admContext';

declare let window: any;

// stupid component - move me
// just change css class!

export const ToggleEnabled = ( {user, fetchUsers}:any) => {
  const adm = AdminService();
  //const {adm} = this.context;
  //const adm = React.useContext(AdmContext);

  const toggle = async () => {
    if(user.username === 'admin') return alert('isAdmin!');
    if(user.id === window.keycloak.tokenParsed.sub) return alert('suicidal!');

    await adm.users.update({id: user.id}, { enabled: !user.enabled });
    fetchUsers();
  }
  return user.enabled === true ?
      <button onClick={toggle} className="btn btn-sm btn-success"><i className="fa fa-1x fa-toggle-on" /></button>
    : <button onClick={toggle} className="btn btn-sm btn-danger"><i className="fa fa-1x fa-toggle-off" /></button>
}

export const ToggleEmailVerified = ( {user, fetchUsers}:any) => {
  const adm = AdminService();

  const toggle = async () => {
    console.log(user.username)
    if(user.username === 'admin') return alert('isAdmin!');
    if(user.id === window.keycloak.tokenParsed.sub) return alert('suicidal!');

    await adm.users.update({id:user.id}, { emailVerified:!user.emailVerified });
    fetchUsers();
  }
  return <button onClick={toggle} className={user.emailVerified === true ? 'btn btn-sm btn-success' : 'btn btn-sm btn-danger'}>
    <i className="fa fa-1x fa-envelope" />
  </button>
}


