// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = "wodeyun-g8zb3"
cloud.init()
const db = cloud.database({ env })
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('note').where({
      _id: event.id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}


