import React from 'react';
import {StackedUserForm} from './UserForms';
import AdminService from '../../utils/adminService';
import '../../styles/slider.css';

export default ({id}:any) => {
  const adm = AdminService();
  return (<>
    <h3>huhu {id}</h3>
    <StackedUserForm adm={adm}/>
  </>)
}
