import axios from 'axios';
import qs from 'qs';
// import router from '../router';
// import {
//     Loading
// } from "element-ui";
// import store from '../store';

axios.defaults.timeout = 60000;
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export function get(url, params) {
    return axios.get(url, {
        params
    }).then(res => res.data);
}

export function post(url, params) {
    return axios.post(url, qs.stringify(params)).then(res => res.data);
}
