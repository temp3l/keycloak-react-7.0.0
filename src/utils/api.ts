import axios from 'axios';
declare let window: any;
const keycloak = window.keycloak

const instance = axios.create({ baseURL: window.baseURL });


instance.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + keycloak.token;
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
