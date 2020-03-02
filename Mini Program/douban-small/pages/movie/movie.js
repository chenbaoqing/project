const MovieModel=require('../../models/MovieModel')
Page({
  data: {
    movies:{

    }
  },
  onLoad:async function (options) {
    var storageData=wx.getStorageSync('movies')
    if(storageData){
      this.setData({
        movies:storageData
      })
    }else{
      var movies={};
      var top250=await MovieModel.getTop250();
      var inTheaters=await MovieModel.getInTheaters();
      var comingSoon=await MovieModel.getComingSoon();
      movies.inTheaters={};
      movies.inTheaters.title="正在热映";
      movies.inTheaters.data=inTheaters.data.subjects.slice(0,3);
      movies.inTheaters.subTitle="in_theaters";

      movies.comingSoon={};
      movies.comingSoon.title="即将上映";
      movies.comingSoon.data=comingSoon.data.subjects.slice(0,3);
      movies.comingSoon.subTitle="coming_soon";

      movies.top250={};
      movies.top250.title="豆瓣top250";
      movies.top250.data=top250.data.subjects.slice(0,3);
      movies.top250.subTitle="top250";
      wx.setStorageSync('movies', movies)
      this.setData({
        movies
      })
    }
  },
  handleToggle(event){
    var {url,title}=event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/more/more?url=${url}&title=${title}`,
    });
  }
})