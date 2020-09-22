//axios是http请求的框架，用于发送请求
import axios from 'axios'
//QS为json对象转为字符串的函数

import {
  QS
} from './../tools/apiTool'

export const register = (userName,password) => {
  return axios({
    method: 'POST',
    url: `/user/register`,
    data: QS({
      userName,
      password
    }),
  })
}


export const login = (userName,password) => {
  return axios({
    method: 'POST',
    url: `/user/login`,
    data: QS({
      userName,
      password
    }),
  })
}

export const getUserInfo = (userId) => {
  return axios({
    method: 'GET',
    url: `/user/info?userId=${userId}`
  })
}