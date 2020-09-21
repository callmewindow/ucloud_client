import {
    Message
} from 'element-ui'
import router from './../router'
import store from '../store'

// text
export const siteTitle = 'beacon'
export const siteTitleInFull = 'beacon education'

// methods

// 字符串内非法字符检测
// 原始方法，没有标点符号，体验不友好
// export function CS(str) {
//     let regular = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/; //汉字，数字，英文
//     return regular.test(str);
// }
// 这一方法无法准确判断，原因未知
// export function CS(str) {
//     let regular = /^[\"\']+$/; //英文单双引号
//     return regular.test(str);
// }
// 最终方案，最单纯的判断，最好用的解决方案
export function CS(str) {
    return (str.indexOf('"') != -1) || (str.indexOf("'") != -1)
}

// 字符串内引号转义
export function TS(str) {
    str = str.replaceAll("\'", "\\\'");
    str = str.replaceAll('\"', '\\\"');
    return str;
}

// 检测邮箱格式
export function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}

export function updateTitleTo(value) {
    store.dispatch('updateNavTitle', value)
    document.title = `${value} ~`
    // ${siteTitleInFull}
}

export function building() {
    Message("功能开发中，敬请期待");
}

export function toPath(pos) {
    router.push({
        path: pos
    })
}