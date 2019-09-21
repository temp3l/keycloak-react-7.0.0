import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
declare let window: any;

window.keycloak.init({
  checkLoginIframe: true,
  checkLoginIframeInterval: 60 * 60 * 5,
  onLoad: 'login-required',
}).success( (authenticated:any) => {
    console.log(authenticated ? 'authenticated' : 'not authenticated');
    ReactDOM.render(<App kc={window.keycloak}/>, document.getElementById('root'));

}).error(() =>{
    alert('failed to initialize keycloak app');
});

