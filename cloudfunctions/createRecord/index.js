// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = "wodeyun-g8zb3"
cloud.init()
const db = cloud.database({ env })
// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event)
  // console.log(context)
  const userInfo = event.userInfo
  //连通数据库
  return await db.collection('record').add({
    data: {
      createBy: userInfo.openId,
      createTime: event.createTime,
      title: event.title,
      content: event.content,
      state: event.state,
      mood: event.mood,
    }
  })
}