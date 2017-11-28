/**
 * Created by hehui on 2017/11/25.
 */
const HOST = 'https://apicloud.mob.com/v1';
const appKey = '20a4ab9e79cc0';
const formatUrl = (obj = {}) => {
    let urlStr = "&"
    const postData = Object.assign({}, obj, { key: appKey })
    for (let key in postData) {
        if (postData.hasOwnProperty(key)) {
            urlStr += `&${key}=${postData[key]}`
        }
    }
    return urlStr.replace(/&/, '?')
}
module.exports = {
    host: HOST,
    get(url, data = {}) {
        return fetch(HOST + url + formatUrl(data))
            .then(res => res.json())
            .then(res => {
                return res ? res : null
            })
    },
    post(url, data, options) {
        return fetch(HOST + url, {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                return res ? res : null
            })
    }
}