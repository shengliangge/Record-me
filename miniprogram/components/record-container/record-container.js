// components/record-container/record-container.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recordContent: Object,
    record: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  lifetimes: {
  
  },
  /**
   * 组件的方法列表
   */
  methods: {
    delete(){
      this.triggerEvent('deleteRecord')  //抛出方法
    }
  }
})
