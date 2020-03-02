const MovieModel =require('../../models/MovieModel')
Page({
  data: {
    movies:[]
  },
  onLoad:async function (options) {
    var {url,title}=options;
    wx.setNavigationBarTitle({
      title,
    });
    wx.showLoading({
      title: "正在加载",
    });
    var res=await MovieModel.getMore(url);
    var subjects=res.data.subjects;
    wx.hideLoading();
    this.setData({
      movies:subjects
    })
  },
})