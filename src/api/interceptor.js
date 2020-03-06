import axios from 'axios';

export function initAxios(Vue) {
    axios.interceptors.request.use(config => {
        return config
    }, err => {
        return Promise.reject(err);
    });

    axios.interceptors.response.use(response => {
        return response.data;
    }, err => {
        return Promise.reject(err);
    });
    Vue.prototype.request = request;
}


function request (url, method = 'get', config = {}) {
    config = extend(config, {
        method,
        url
    });
    return axios(config);
}

function extend (from, to) {
    for (let key in from) {
        to[key] = from[key];
    }
    return to;
}