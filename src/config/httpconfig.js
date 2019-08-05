import axios from "axios";
import store from "../store";
import router from "../router";
import { Message } from 'element-ui';
let baseURL = 'https://www.easy-mock.com/mock/5d36a62ccaeac14198f42d3d';
//let AUTH_TOKEN = 'ss';

// 普通axios配置
const http = axios.create({
    baseURL,
})
http.defaults.timeout = 10000 //超时取消请求
http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
http.defaults.baseURL = process.env.BASE_URL;
//http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios请求拦截

// 请求列表
const requestList = []
// 取消列表
const CancelToken = axios.CancelToken
let sources = {}

http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

http.interceptors.request.use((config) => {
    //将请求地址及参数作为一个完整的请求
    const request = JSON.stringify(config.url) + JSON.stringify(config.data)
    config.cancelToken = new CancelToken((cancel) => {
        sources[request] = cancel
    })
    //1.判断请求是否已存在请求列表，避免重复请求，将当前请求添加进请求列表数组；
    if(requestList.includes(request)){
        sources[request]('取消重复请求')
    }else{
        requestList.push(request)
        //2.请求开始，改变loading状态供加载动画使用
        store.dispatch('changeGlobalState', {loading: true})
    }
    //3.从store中获取token并添加到请求头供后端作权限校验
    const token = store.getters.userInfo.token;
    if (token) {
        config.headers.token = token
    }
    return config
}, function (error) {
    let info;
    if (error.response.status == "404") info = "页面找不到，请检查网页是否正确！";
    else if (error.response.status.substr(0,1) == "5") info = "系统错误！";
    Message({
        message:info,
        type:'error',
        duration:1000
    })
    return Promise.reject(error)
})

//响应拦截器
http.interceptors.response.use(function (response) {
    // 1.将当前请求中请求列表中删除
    const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data)
    requestList.splice(requestList.findIndex(item => item === request), 1)
    // 2.当请求列表为空时，更改loading状态
    if (requestList.length === 0) {
        store.dispatch('changeGlobalState', {loading: false})
    }
    // 3.统一处理权限认证错误管理
    if (response.data.code === 900401) {
        Message({
            message:'认证失效，请重新登录！',
            type:'error',
            duration:1000
        })
        //window.ELEMENT.Message.error('认证失效，请重新登录！', 1000)
        router.push('/login')
    }
    return response
}, function (error) {
    // 4.处理取消请求
    if (axios.isCancel(error)) {
        requestList.length = 0
        store.dispatch('changeGlobalState', {loading: false})
        throw new axios.Cancel('cancel request')
    } else {
        // 5.处理网络请求失败
        Message({
            message:'网络请求失败',
            type:'error',
            duration:1000
        })
        //window.ELEMENT.Message.error('网络请求失败', 1000)
    }
    return Promise.reject(error)
})

//promise封装
const request = function (url, params, config, method) {
    return new Promise((resolve, reject) => {
        axios[method](url, params, Object.assign({}, config)).then(response => {
            resolve(response.data)
        }, err => {
            if (err.Cancel) {
                console.log(err)
            } else {
                reject(err)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

const post = (url, params, config = {}) => {
    return request(url, params, config, 'post')
}

const get = (url, params, config = {}) => {
    return request(url, params, config, 'get')
}

//3.导出cancel token列表供全局路由守卫使用
export {sources, post, get}

