import {get, post} from './request'

export const login=(login)=>post('/api/post/user/login', login);

export const upload=(upload)=>get('/api/get/upload', upload);

