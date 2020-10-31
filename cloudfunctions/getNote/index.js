// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = "wodeyun-g8zb3"
cloud.init()
const db = cloud.database({ env })
// 云函数入口函数
exports.main = async (event, context) => {
  const userInfo = event.userInfo
  if (event.time) {
    //先查询有无该openId
    return await db.collection('note').where({
      createBy: userInfo.openId,
      time: event.time
    }).get()
  } else {
    return await db.collection('note').where({
      createBy: userInfo.openId
    }).get()
  }


}