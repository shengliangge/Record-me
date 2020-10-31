const $util = require('../../common/util')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: '首页',
    backgroundColor: '#6A5D6F',
    currentTime: '',
    sloganList: [
      '人生但苦无妨，良人归来极好',
      '海阔凭鱼跃，天高任鸟飞',
      '世事一场大梦，人生几度新凉',
      '人生自是有情痴，此恨无关风与月'
    ],
    blockHeight: wx.user.statusBarHeight + wx.user.navBarHeight,
    animationData: undefined
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'linear',
      // delay: 1000,  //动画延迟时间无
      transformOrigin: ("0 0 0")//  默认50 %50 0   设置动画的基点
    })
    this.animation = animation
    animation.rotate(8).step()
    this.setData({
      animationData: animation.export() 
    })
    var timer =  setTimeout(() => {
      animation.rotate(-8).step()
      this.setData({
      animationData: animation.export() 
      })
    }, 2000)
    
    
    
    
    var next = true;
    setInterval(function () {
      //2: 调用动画实例方法来描述动画
      if (next) {
        animation.rotate(8).step()
        next = !next;
      } else {
        animation.rotate(-8).step()
        next = !next;
        this.setData({
          animationData: animation.export()   //输出动画
        })
      }
    }.bind(this), 2000)
    
      this.getCurrentTime()
    },
      getCurrentTime() {
      this.setData({
        currentTime: $util.dateFormat("YYYY-mm-dd HH:MM:SS", new Date())
      })
    let clear = setInterval(() => {
        this.setData({
          currentTime: $util.dateFormat("YYYY-mm-dd HH:MM:SS", new Date())
        })
      }, 1000)
    },
      gotoNote() {
      app.globalData.navId = 1
    wx.navigateTo({
        url: '../note/note'
      })
    },
      gotoRecord() {
      app.globalData.navId = 2
    wx.navigateTo({
        url: '../record/record'
      })
    },
      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      }
})