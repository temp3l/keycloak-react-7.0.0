import React, {useState, useEffect} from 'react';
import {navigate} from 'hookrouter';
import {StackedUserForm} from './UserForms';
import AdminService from '../../utils/adminService';
import '../../styles/slider.css';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';

export default ({id}:any) => {
  const [user, setUser] = useState <UserRepresentation>({});
  const adm = AdminService();

  useEffect(() => {
    
    const fetchUser = async(id:string) => {
      try {
        const response = await adm.users.findOne({id}); // returns all users if no id given => bug?
        console.log(response)
        if(response && response.id){
          setUser(response);
        } else {
          if(id && !response.id){
            alert('No such user!');
            navigate('/dashboard');
          }
        }
      } catch(e){
        alert(e.message);
        navigate('/dashboard');
      }
    }
    fetchUser(id);
  },[]);



  if(id && !user.id) return (<>Loading...</>)
  return (<>
    <StackedUserForm adm={adm} user={user}/>
  </>)
}