import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "意见建议",
    placeholder: "可以在此输入您的意见"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  commitSuggestion(e) {
    if(e.detail.content.length==0){
      Toast('内容不能为空哦')
      return 
    }
    wx.showLoading({
      title: '提交中',
    });
    //调用云函数
    wx.cloud.callFunction({
      name: 'createSuggest',
      data: {
        content: e.detail.content
      },
      success(res) {
        setTimeout(() => {
          wx.hideLoading()
          wx.redirectTo({
            url: '/pages/personal/personal'
          })
        }, 50);
      },
      fail(err) {
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