import axios from 'axios'

import {
  QS
} from './../tools/apiTool'

export const createBot = (botName, botIntro, botQQ, botPassword, botType, userId) => {
  return axios({
    method: 'POST',
    url: `/bot/create`,
    data: QS({
      botName: botName,
      botIntro: botIntro,
      botQQ: botQQ,
      botPassword: botPassword,
      botType: botType,
      userId: userId
    })
  })
}

export const getAllBot = () => {
  return axios({
    method: 'GET',
    url: `/bot/getAll`
  })
}

export const getBotInfo = (botId) => {
  return axios({
    method: 'GET',
    url: `/bot/info?botId=${botId}`
  })
}

export const startBot = (botId) => {
  return axios({
    method: 'POST',
    url: `/bot/start`,
    data: QS({
      botId: botId
    })
  })
}

export const stopBot = (botId) => {
  return axios({
    method: 'POST',
    url: `/bot/stop`,
    data: QS({
      botId: botId
    })
  })
}

export const deleteBot = (botId) => {
  return axios({
    method: 'POST',
    url: `/bot/delete`,
    data: QS({
      botId: botId
    })
  })
}

export const uploadCode = (botId, code) => {
  return axios({
    method: 'POST',
    url: `/bot/uploadCode`,
    data: QS({
      botId: botId,
      code: code
    })
  })
}

export const forkBot = (botId, userId, botName, botQQ, botPassword) => {
  return axios({
    method: 'POST',
    url: `/bot/fork`,
    data: QS({
      botId,
      userId,
      botName,
      botQQ,
      botPassword
    })
  })
}

export const getBotCode = (botId) =>{
  return axios({
    method: 'GET',
    url: `/bot/download?botId=${botId}`
  })
}