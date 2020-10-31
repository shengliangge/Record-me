//login.js
//获取应用实例
var app = getApp();
const $util = require('../../common/util')
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },

  onGetUserInfo(e) {
    wx.redirectTo({
      url: '/pages/index/index',
    });
  },
  onLoad: function () {
    this.getUserInfo()
  },
  getUserInfo() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.getUserInfo({
        success: res => {
          let userInfo = res.userInfo
          app.globalData.userInfo = userInfo
          wx.setStorageSync("userInfo", userInfo);
          this.setData({
            userInfo
          })
          let loginTime = $util.dateFormat("YYYY-mm-dd HH:MM", new Date())
          let nickName = userInfo.nickName
          let avatarUrl = userInfo.avatarUrl
          let gender = userInfo.gender //性别 0：未知、1：男、2：女
          let province = userInfo.province
          let city = userInfo.city
          let country = userInfo.country
          wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'getUserInfo',
            // 传递给云函数的event参数
            data: {
              nickName,
              avatarUrl,
              gender,
              province,
              city,
              country,
              loginTime
            }
          }).then(res => {
          }).catch(err => {
          })
        }
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
      app.globalData.userInfo = userInfo
    }
  },
  onShow: function () {

  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 300);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
});