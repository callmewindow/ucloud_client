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
