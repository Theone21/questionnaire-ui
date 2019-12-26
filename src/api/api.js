import {get, post} from './request'

export const login=(login)=>post('/sys/login', login);

export const upload=(upload)=>get('/api/get/upload', upload);

export const addUser = (user) => get('/sys/addUser', user);

