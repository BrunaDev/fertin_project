import axios from 'axios';

//json-server --watch -d 150 --host 192.168.0.116 db.json

const api = axios.create({
    baseURL: "http://192.168.0.116:3000",
})

export default api;