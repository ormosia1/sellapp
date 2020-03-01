//把所有请求封装接口文件(方便项目后期维护，所有请求统一管理)
import axios from 'axios';

// 创建一个请求对象 
//写法一： axois.defaults.baseURL = 'http://localhost:3000'与下面的写法完全等效
let req = axios.create({
    baseURL: 'http://192.168.0.104:3000/',   //基本路径
    timeout:10000,                           //ms 请求10秒，如果10秒还没请求到，就提示用户请求超时(给请求增加超时限制)
})

// 对axios的封装
export function getSeller(){
    return req.get('api/seller')
}

export function getGoods(){
    return req.get('api/goods')
}

export function getRatings(){
    return req.get('api/ratings')
}
