const http=require('../../models/MusicModel')
Page({
  data: {
    name:"",
    poster:"",
    isPlay:true,
    animation:''
  },
  onLoad:async function (options) {
    var id=options.id;
    var name=options.name;
    var res=await http.getMusicUrl({id:id})
    var url=res.data[0].url;
    myaudio.title=name;
    myaudio.src=url;
    var poster=wx.getStorageSync('poster')
    myaudio.coverImgUrl=poster;
    wx.setStorageSync('playState', true)
    wx.setStorageSync('playId', id)
    this.setData({
      name,
      poster
    })
    myaudio.onPlay(()=>{
      this.setData({
        isPlay:true
      })
      wx.setStorageSync('playState', true)
    })
    myaudio.onPause(()=>{
      this.setData({
        isPlay:false
      })
      wx.setStorageSync('playState', false)
    })
  },
  handleClick(){
    if(this.data.isPlay){
      this.setData({
        isPlay:false
      })
      myaudio.pause()
      wx.setStorageSync('playState',false)
    }else{
      this.setData({
        isPlay:true
      })
      myaudio.play()
      wx.setStorageSync('playState', true)
    }
  }
})