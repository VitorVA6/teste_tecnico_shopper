import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://[::1]:4000',
});

export default instance;