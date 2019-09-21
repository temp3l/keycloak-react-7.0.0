import React from 'react';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';

export default ({users}:any) => (<>
  <div className="container">
    <h4>{users.length}</h4>

    <table className="table table-dark table-hover table-sm table-responsive-md">
      <thead>
        <tr>
          <th>username</th>
          <th>Email</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map( (user: UserRepresentation) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.firstName} {user.lastName}</td>
            <td>
              <button className="btn btx-sm btn-success"><i className="fa fa-cog" /></button>
              &nbsp;
              <button className="btn btx-sm btn-danger"><i className="fa fa-trash" /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</>);

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
