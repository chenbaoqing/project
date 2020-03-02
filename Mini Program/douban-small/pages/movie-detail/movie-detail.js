const MovieModel=require('../../models/MovieModel')
Page({
  data: {
    movie:{},
    x:true
  },
  onLoad:async function (options) {
    var id=options.id;
    var res=await MovieModel.getDetail(id);
    this.setData({
      movie:res.data
    })
  },
  handleImage(event){
    var url=event.currentTarget.dataset.url;
    var casts=this.data.subject.casts;
    var urls=casts.map(item=>{
      return item.avatars.small
    })
    wx.previewImage({
      current: url,
      urls,
    });
  }
})