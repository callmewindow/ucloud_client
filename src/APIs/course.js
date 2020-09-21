import axios from 'axios'

import {
  QS
} from './../tools/apiTool'

export const addCourse = (courseEntity) => {
  return axios({
    method: 'POST',
    url: `/createCourse`,
    data: QS({
      course_name: courseEntity.course_name,
      course_intro: courseEntity.course_intro,
      start_time: courseEntity.start_time,
      end_time: courseEntity.end_time,
      profession: courseEntity.profession,
      rule: '',
      teacher_id: courseEntity.teacher_id,
    })
  })
}

export const uploadVideo = (videoEntity) => {
  return axios({
    method: 'POST',
    url: `/uploadVideo2`,
    data: QS({
      course_id: videoEntity.course_id,
      title: videoEntity.title,
      introduction: videoEntity.introduction,
      upload_time: videoEntity.upload_time,
      video_id: videoEntity.video_id
    })
  })
}

export const uploadExcel = (excelEntity) => {
  return axios({
    method: 'POST',
    url: `uploadUserCourse2`,
    data: QS({
      course_id: excelEntity.courseId,
      excel_name: excelEntity.excel_name
    })
  })
}

export const getCourseBasicInfo = (courseId, user_id) => {
  return axios({
    method: 'GET',
    url: `/info/basic/class/?class_id=${courseId}&user_id=${user_id}`
  })
}

export const getCourseVideoUrlArray = (courseId) => {
  return axios({
    method: 'GET',
    url: `/video/play/?class_id=${courseId}`
  })
}

export const getCourseStudentList = (courseId) => {
  return axios({
    method: 'GET',
    url: `api/student/manage/search?class_id=${courseId}`
  })
}

export const courseQuery = () => {
  return axios({
    method: 'POST',
    url: `/courseQuery`,
  })
}

export const getUserCourse = (userid) => {
  return axios({
    method: 'GET',
    url: `/usercourse?userid=${userid}`
  })
}

export const openCourseForum = (courseId) => {
  return axios({
    method: 'GET',
    url: `/api/circle/open?class_id=${courseId}`
  })
}

export const searchCourse = (keyword) => {
  return axios({
    method: 'POST',
    url: `/searchCourse`,
    data: QS({
      keyWord: keyword
    })
  })
}

export const getUCRelation = (user_id, course_id) => {
  return axios({
    method: 'POST',
    url: `/userCourse`,
    data: QS({
      user_id,
      course_id,
    })
  })
}

export const getCourseWatchRecords = (course_id) => {
  return axios({
    method: 'POST',
    url: `/getCourseWatches`,
    data: QS({
      id: course_id
    })
  })
}

export const addWatchRecord = (video_id, user_id, played_time, start_play_time) => {
  return axios({
    method: 'POST',
    url: `/oneWatch`,
    data: QS({
      video_id,
      user_id,
      played_time,
      start_play_time
    })
  })
}

export const authAssistant = (student_id, class_id) => {
  return axios({
    method: 'GET',
    url: `/student/manage/authorize/?student_id=${student_id}&class_id=${class_id}&op=1`,
  })
}

export const cancelAssistant = (student_id, class_id) => {
  return axios({
    method: 'GET',
    url: `/student/manage/authorize/?student_id=${student_id}&class_id=${class_id}&op=0`,
  })
}

export const deleteStudent = (student_id, class_id) => {
  return axios({
    method: 'GET',
    url: `/student/manage/del/?student_id=${student_id}&class_id=${class_id}`,
  })
}

// 退出用户已有课程*
export const deleteUserCourse = (user_id, course_id) => {
  return axios({
    method: 'GET',
    url: `/class/quit?user_id=${user_id}&course_id=${course_id}`,
  })
}

//用户已创建课程列表*
export const getUserOwnerCourse = (user_id) => {
  return axios({
    method: 'GET',
    url: `/class/asowner?user_id=${user_id}`,
  })
}

//获取用户创建课程的所有申请*
export const getUserApply = (user_id) => {
  return axios({
    method: 'GET',
    url: `/class/application/asreceiver?user_id=${user_id}`,
  })
}

//通过课程加入申请*
export const Course = (course_application_id) => {
  return axios({
    method: 'GET',
    url: `/class/application/accept?course_application_id=${course_application_id}`,
  })
}

//拒绝课程加入申请*
export const rejectCourse = (course_application_id) => {
  return axios({
    method: 'GET',
    url: `/class/application/reject?course_application_id=${course_application_id}`,
  })
}

//删除某课程*
export const deleteCourse = (course_id) => {
  return axios({
    method: 'GET',
    url: `/class/delete?course_id=${course_id}`,
  })
}

//发送系统消息
export const systemMessages = (user_id,title,content) => {
  return axios({
    method: 'GET',
    url: `/sysmessage/send/?user_id=${user_id}&title=${title}&content=${content}`,
  })
}
//已读系统消息
export const readMessages = (message_id) => {
  return axios({
    method: 'GET',
    url: `/sysmessage/read?message_id=${message_id}`,
  })
}



export const joinCourse = (class_id, student_id, content) => {
  return axios({
    method: 'GET',
    url: `api/class/application/create?class_id=${class_id}&student_id=${student_id}&content=${content}`,
  })
}

export const deleteVideo = (video_id) => {
  return axios({
    method: 'GET',
    url: `video/manage/delete?video_id=${video_id}`,
  })
}

export const updateVideoInfo = (video_id, title, introduction) => {
  return axios({
    method: 'POST',
    url: `video/manage/update`,
    data: QS({
      video_id,
      title,
      introduction
    })
  })
}

export const getHotCourses = () => {
  return axios({
    method: 'GET',
    url: `hotCourses`,
  })
}

export const searchTeacher = (keyword) => {
  return axios({
    method: 'POST',
    url: `/searchTeacher`,
    data: QS({
      keyWord: keyword
    })
  })
}