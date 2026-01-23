import axios from 'axios';

const api = axios.create({
  // Updated to match your working local URL
  baseURL: 'http://localhost/GameFest-BackEnd-feat-methodsSQL/', 
  
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;