// components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    backgroundColor: {
      type: String,
      value: 'rgb(71, 146, 230)'
    }
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    topHeight: '',
    statusBarHeight: '',
    navBarStyle: ''
  },

  lifetimes: { // 组件的生命周期
    attached: function() {
      let topHeight = wx.user.statusBarHeight + wx.user.navBarHeight
      let statusBarHeight = wx.user.statusBarHeight
      let navBarStyle = `height: ${wx.user.navBarHeight}px; font-size: 26rpx; line-height: ${wx.user.navBarHeight}px;`
      this.setData({
        topHeight,
        statusBarHeight,
        navBarStyle
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goBack(){
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
