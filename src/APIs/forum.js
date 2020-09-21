import axios from 'axios'

import {
  QS
} from './../tools/apiTool'

export const setForumRule = (forumId, forumCon) => {
  return axios({
    method: 'POST',
    url: `/setCourseRule`,
    data: QS({
      id: forumId,
      rule: forumCon
    })
  })
}

export const postDetail = (postId) => {
  return axios({
    method: 'POST',
    url: `/postQuery`,
    data: QS({
      id: postId
    })
  })
}

export const postList = (forumId) => {
  return axios({
    method: 'POST',
    url: `/cicleAllPost`,
    data: QS({
      forumId: forumId
    })
  })
}

export const replyPost = (postId, author_id, content) => {
  return axios({
    method: 'POST',
    url: `/replyPost`,
    data: QS({
      postId: postId,
      author_id: author_id,
      content: content
    })
  })
}

export const sendPost = (post) => {
  return axios({
    method: 'POST',
    url: `/createPost`,
    data: QS({
      title: post.title,
      course: post.courseId,
      owner: post.senderId,
      tag: post.tags,
      content: post.content
    })
  })
}

export const topPost = (postId) => {
  return axios({
    method: 'POST',
    url: `/topPost`,
    data: QS({
      postId: postId
    })
  })
}

export const starPost = (postId) => {
  return axios({
    method: 'POST',
    url: `/starPost`,
    data: QS({
      postId: postId
    })
  })
}

export const cancelTopPost = (postId) => {
  return axios({
    method: 'POST',
    url: `/cancelTopPost`,
    data: QS({
      postId: postId
    })
  })
}

export const cancelStarPost = (postId) => {
  return axios({
    method: 'POST',
    url: `/cancelStarPost`,
    data: QS({
      postId: postId
    })
  })
}

export const searchPost = (keyword, forumId) => {
  return axios({
    method: 'POST',
    url: `/searchPost`,
    data: QS({
      keyWord: keyword,
      forumId: forumId
    })
  })
}

export const addPoint = (user_id, course_id, point) => {
  return axios({
    method: 'POST',
    url: `/getPoint`,
    data: QS({
      user_id,
      course_id,
      point
    })
  })
}

export const likeFloor = (user_id, floor_id) => {
  return axios({
    method: 'POST',
    url: `/likeFloor`,
    data: QS({
      user_id,
      floor_id,
    })
  })
}

export const dislikeFloor = (user_id, floor_id) => {
  return axios({
    method: 'POST',
    url: `/unlikeFloor`,
    data: QS({
      user_id,
      floor_id,
    })
  })
}

export const deletePost = (postId) => {
  return axios({
    method: 'POST',
    url: `/deletePost`,
    data: QS({
      postId
    })
  })
}