// components/movie-item/movie-item.js
Component({
  properties: {
    data:{
      type:Object
    }
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
    handleToggle(){
      var id=this.properties.data.id;
      wx.navigateTo({
        url: '/pages/movie-detail/movie-detail?id='+id,
      });
    }
  }
})
