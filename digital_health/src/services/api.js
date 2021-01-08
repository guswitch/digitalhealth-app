import axios from 'axios';

const api = axios.create({baseURL:'http://10.0.2.2:3000/api'});
// const api = axios.create();
// const api = axios.create({baseUrl:'http://10.0.2.2:3333/api'});

export default api;