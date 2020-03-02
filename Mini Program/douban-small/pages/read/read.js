var data=require('../../data/local');
var HTTP=require('../../models/HTTP')
Page({
  data: {
    banners:[],
    postList:[],
    indicatorDots:true,
    indicatorColor:"rgba(11, 44, 66, .6)",
    active:"#C20C0C"
  },
  onLoad:async function (options) {
    var {bannerUrl,postList}=data;
    var res=await HTTP(bannerUrl);
    var banners=res.data.banners.slice(0,3);
    this.setData({
      banners,
      postList
    })
  },
})