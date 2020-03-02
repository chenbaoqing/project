const http=require('../../models/MusicModel')
Page({
  data: {
    hot:"",
    cat:"",
    program:""
  },
  onLoad:async function (options) {
    var hot=await http.getHot();
    var cat=await http.getJapan();
    var program=await http.getMv();
    var arr=[]
    program.result.forEach(item=>{
      var obj={};
      obj.name=item.name;
      obj.coverImgUrl=item.picUrl;
      obj.playCount=item.program.adjustedPlayCount;
      obj.id=item.id;
      arr.push(obj)
    })
    this.setData({
      hot:hot.playlists.slice(0,3),
      cat:cat.playlists.slice(0,3),
      program:arr.slice(0,3)
    })
  },
})