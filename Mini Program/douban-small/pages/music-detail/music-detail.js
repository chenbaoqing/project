const http=require('../../models/MusicModel')
Page({
  data: {
    playlist:"",
    coverImgUrl:"",
    isPlay:false,
    playId:""
  },
  onShow(){
    var playState=wx.getStorageSync('playState');
    var playId=wx.getStorageSync('playId')
    if(playState!==null){
      this.setData({
        isPlay:playState
      })
    }
    this.setData({
      playId
    })
  },
  onLoad:async function (options) {
    var id=options.id;
    var data=await http.getPlaylistDetail({
      id
    })
    var songs=[]
    data.playlist.tracks.forEach(item=>{
      var obj={};
      obj.id=item.id;
      obj.name=item.name;
      obj.coverImage=item.al.picUrl
      songs.push(obj)
    })
    this.setData({
      playlist:songs,
      coverImgUrl:data.playlist.coverImgUrl
    })
  },
  togglePlay(event){
    var{id,name,poster}=event.currentTarget.dataset;
    wx.setStorageSync('poster', poster)
    wx.navigateTo({
      url: `/pages/music-play/music-play?id=${id}&name=${name}`,
    });
  }
})