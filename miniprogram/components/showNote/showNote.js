
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      default: '快去添加第一条记录吧'
    },
    imgs: {
      type: Array,
    },
    createTime: {
      type: String
    },
    month: String,
    day: String
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
      this.triggerEvent('deleteNote')  //抛出方法
    },
    topic_preview(e) {
      var that = this;
      var url = e.currentTarget.dataset.url;
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: that.data.imgs // 需要预览的图片http链接列表
      })

    }
  }
})
