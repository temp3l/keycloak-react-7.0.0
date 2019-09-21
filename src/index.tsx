import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

declare let window: any;// read: https://github.com/dasniko/keycloak-reactjs-demo/blob/master/src/index.js
const keycloak = window.keycloak

keycloak.init({
  checkLoginIframe: true,
  checkLoginIframeInterval: 60 * 60 * 5,
  onLoad: 'login-required',
}).success( (authenticated:Boolean) => {
    //console.log(authenticated ? 'authenticated' : 'not authenticated');
    console.log(keycloak)
    ReactDOM.render(<App kc={keycloak}/>, document.getElementById('root'));
}).error(() => {
  ReactDOM.render(<h1>Failed to load keyloak</h1>, document.getElementById('root'));
    alert('failed to initialize keycloak app');
});

keycloak.onTokenExpired = () => {
  keycloak.updateToken(30).success(() => {
      console.log('successfully got a new token');
  }).error((e:any) => {
    console.log(e)
    alert('auth problem');
  });
}

// keycloak.onAuthSuccess = function() { alert('authenticated'); }
// keycloak.onAuthRefreshSuccess = function() { alert('onAuthRefreshSuccess'); }
