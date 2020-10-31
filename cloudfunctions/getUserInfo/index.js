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
  const checkUser = await db.collection('user').where({
    openId: userInfo.openId
  }).get()
  //如果有该用户，则更新用户信息
  if (checkUser.data.length > 0) {
    await db.collection('group-user').doc(checkUser.data[0]._id)
      .update({
        data: {
          nickName: event.nickName,
          avatarUrl: event.avatarUrl,
          loginTime: event.loginTime
        }
      })
  } else {
    return await db.collection('user').add({
      data: {
        nickName: event.nickName,
        avatarUrl: event.avatarUrl,
        gender: event.gender,
        province: event.province,
        city: event.city,
        country: event.country,
        openId: event.userInfo.openId,
        loginTime: event.loginTime
      }
    })
  }
}