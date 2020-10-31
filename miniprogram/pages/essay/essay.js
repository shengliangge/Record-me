// miniprogram/pages/essay/essay.js
const $util = require('../../common/util')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '涂涂改改',
    placeholder: '就写这吧',
    pageTitle: '便签',
    remind: true,
    option1: [
      { text: '生活tag', value: '生活tag' },
      { text: '学习tag', value: '学习tag' },
      { text: '工作tag', value: '工作tag' },
    ],
    state: '生活tag',
    option2: [
      { text: '心情不错', value: 'happy' },
      { text: '有点无聊', value: 'boring' },
      { text: '真的难受', value: 'sad' },
    ],
    mood: 'happy',
    noteTitle: '',
    noteContent: '',
    message:'',
    show:false
  },
  onSwitch1Change(e) {
    let state = e.detail
    this.setData({
      state
    })
  },
  onSwitch2Change(e) {
    this.setData({
      mood: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        remind: false
      })
    }, 1500)
  },
  titleInput(e) {
    this.setData({
      noteTitle: e.detail.value
    })
  },
  contentInput(e) {
    this.setData({
      noteContent: e.detail.value
    })
  },
  cancel() {
    if (this.data.noteContent.length <= 0) {  //直接返回 
      this.onConfirm()
    } else {  //用户有输入
      this.setData({
        message: '请注意，当前正在编辑的内容将会清空',
        show: true
      })
    }
  },
  onConfirm() {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

  onClose() {
    this.setData({
      show: false
    })
  },
  createRecord() {
    const that = this
    if (that.data.noteContent.length <= 0) {
      Toast('内容不能为空哦！')
      return
    }
    wx.showLoading({
      title: '保存中',
    });
    that.setData({
      remind: true
    })
    let title = that.data.noteTitle
    if (title.length <= 0)
      title = '无题'
    let createTime = $util.dateFormat("YYYY-mm-dd HH:MM", new Date())
    //调用云函数
    wx.cloud.callFunction({
      name: 'createRecord',
      data: {
        content: that.data.noteContent,
        title: title,
        state: that.data.state,
        mood: that.data.mood,
        createTime
      },
      success(res) {
        that.setData({
          remind: false
        })
      },
      fail(err) {
        console.log(err)
      }, complete: () => {
        setTimeout(() => {
          wx.hideLoading()
          wx.redirectTo({
            url: '/pages/record/record'
          })
        }, 50);
      }
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