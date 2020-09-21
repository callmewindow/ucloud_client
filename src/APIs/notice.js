import axios from 'axios'

import {
  QS
} from './../tools/apiTool'

export const addPaperReading = (userId, noticeType, noticeContent, noticePlusContent) => {
  return axios({
    method: 'POST',
    url: `/api/user/setNewNotice`,
    data: QS({
      userId,
      noticeType,
      noticeContent,
      noticePlusContent
    })
  })
}

export const setOneNoticeRead = (userId, offset) => {
  return axios({
    method: 'POST',
    url: `/api/user/setOneNoticeRead`,
    data: QS({
      userId,
      offset
    })
  })
}

export const setAllNoticesRead = (userId) => {
  return axios({
    method: 'POST',
    url: `/api/user/setAllNoticesRead`,
    data: QS({
      userId
    })
  })
}

export const getPrivateMessages = (speakersId) => {
  return axios({
    method: 'POST',
    url: `/getPrivateMessages`,
    data: QS({
      user_id1 : speakersId.user1Id,
      user_id2 : speakersId.user2Id,
    })
  })
}

export const sendPrivateMessages = (text) => {
  return axios({
    method: 'POST',
    url: `/postPrivateMessage`,
    data: QS({
      sender_id:text.senderId,
  receiver_id:text.receiverId,
      content:text.textarea,
      send_time:text.time
    })
  })
}

export const getAllFriend = (userId) => {
  return axios({
    method: 'GET',
    url: `/api/friend/search?user_id=${userId}`
  })
}

export const getAllSysMsg = (userId) => {
  return axios({
    method: 'GET',
    url: `/sysmessage/get?user_id=${userId}`
  })
}
