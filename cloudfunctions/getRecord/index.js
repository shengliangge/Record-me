// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = "wodeyun-g8zb3"
cloud.init()
const db = cloud.database({ env })
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);

  const userInfo = event.userInfo
  //先查询有无该openId
  return await db.collection('record').where({
    createBy: userInfo.openId
  }).get()
}