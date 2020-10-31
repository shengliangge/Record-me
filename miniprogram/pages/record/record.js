const $util = require('../../common/util')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: '便签',
    recordContent: [],
    remind: true,
    dialogShow: false,
    deleteId: '',
    showShare: false,
    recordTopId:'',
    options: [
      {
        name: '置顶',
        icon: 'cloud://wodeyun-g8zb3.776f-wodeyun-g8zb3-1302804316/static/top-icon.png',
      },
      {
        name: '放置首页',
        icon: 'cloud://wodeyun-g8zb3.776f-wodeyun-g8zb3-1302804316/static/index-icon.png',
      },
      {
        name: '删除',
        icon: 'cloud://wodeyun-g8zb3.776f-wodeyun-g8zb3-1302804316/static/delete-icon.png',
      },
    ]
  },
  clickOverlay() {
    this.setData({
      showShare: false,
      deleteId: ''
    })
  },
  onSelect(e) {

    if (e.detail.index == 0) {
      for (let item of this.data.recordContent) {
        if (item._id == this.data.deleteId) {
          this.setData({
            showShare: false
          })
          wx.setStorageSync("recordTopId", item._id);
          Toast('置顶成功')
          this.onLoad()
          return
        }
      }
    } else if (e.detail.index == 1) {
      console.log('放置');
      Toast('开发中')
    }
    else {
      this.setData({
        showShare: false,
        dialogShow: true
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getRecordTop()
    this.getRecord()
  },
 
  getRecord() {
    let recordTopId = wx.getStorageSync('recordTopId')
    this.setData({
      recordTopId
    })
    const that = this
    //调用云函数
    wx.cloud.callFunction({
      name: 'getRecord',
      success(res) {

        if (res.result.data.length == 0) {
          that.setData({
            recordContent: [{
              createTime: $util.dateFormat("YYYY-mm-dd HH:MM", new Date()),
              title: "亲，当前还没有便签哦",
              content: "点击下方加号按钮创建第一条便签",
              state: "教程tag",
              mood: "happy"
            }]
          })
          return
        }
        let recordContent = res.result.data.reverse()
        for (var i = 0; i < recordContent.length; i++) {
          if (recordContent[i]._id === recordTopId) {
            recordContent.unshift(recordContent[i]); // 再添加到第一个位置
            recordContent.splice(i + 1, 1); // 如果数据组存在该元素，则把该元素删除
            break;
          }
        }
        that.setData({
          recordContent
        })
      },
      fail(err) {
      }, complete: () => {
        this.setData({
          remind: false
        })
      }
    })
  },
  deleteRecord(e) {
    if(e.currentTarget.dataset.id){
      this.setData({
        showShare: true,
        deleteId: e.currentTarget.dataset.id
      })
    }else{
      Toast('当前还没有便签哦，快去创建吧')
    }
   
  },
  onClose() {
    this.setData({
      dialogShow: false,
      deleteId: ''
    })
  },
  onConfirm() {   //确定删除
    this.setData({
      remind: true
    })
    wx.cloud.callFunction({
      name: 'deleteRecord',
      data: {
        id: this.data.deleteId
      },
      success(res) {
      },
      fail(err) {
      },
      complete: () => {
        this.onLoad()
        setTimeout(() => {
          this.setData({
            remind: false,
            deleteId: ''
          })
        }, 200)
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