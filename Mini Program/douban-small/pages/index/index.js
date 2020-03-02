// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleToggle(){
    wx.switchTab({
      url: '/pages/read/read',
    });
  }
})