import React from 'react';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';
import {ToggleEnabled, ToggleEmailVerified} from './UserToggler';
//import { MyContext } from '../../App'
import AdmContext from '../../admContext';

export default ({adm, fetchUsers, del}:any) => {

  return (<>
    <AdmContext.Consumer>
      {context => (
        <>
        <small>{context.users.length}</small>
          <table className="table table-dark table-hover table-sm table-striped">
            <thead>
              <tr>
                <th>enabled</th>
                <th>verified</th>
                <th>username</th>
                <th>Email</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {context.users && context.users.map( (user: UserRepresentation) => (
                <tr key={user.id}>
                  <td>
                    <label className="switch">
                      <input type="checkbox" name="VERIFY_EMAIL" onChange={console.log} />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <ToggleEnabled user={user} adm={adm} fetchUsers={fetchUsers}/>
                  </td>
                  <td>
                    <ToggleEmailVerified user={user} adm={adm} fetchUsers={fetchUsers}/>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>
                    <button onClick={fetchUsers} className="btn btx-sm btn-success"><i className="fa fa-cog " /></button>
                    &nbsp;
                    <button onClick={() => del(user.id)} className="btn btx-sm btn-danger"><i className="fa fa-trash" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>)
      }
    </AdmContext.Consumer>
</>);
}

/*
  <pre>{JSON.stringify(users,null,4)}</pre>
  {
    "id": "a6a44864-5931-4163-8741-c9ebdd47efad",
    "createdTimestamp": 1569070729883,
    "username": "christine2",
    "enabled": false,
    "totp": false,
    "emailVerified": false,
    "firstName": "Shaun",
    "lastName": "Ferry",
    "email": "rylan_kautzer@hotmail.com",
    "disableableCredentialTypes": [],
    "requiredActions": [],
    "notBefore": 0,
    "access": {
        "manageGroupMembership": true,
        "view": true,
        "mapRoles": true,
        "impersonate": true,
        "manage": true
    }
},
*/
