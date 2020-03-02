var baseUrl="https://music.aityp.com"
function http(url,data){
    return new Promise((resolve,reject)=>{
        wx.request({
            url: baseUrl+url,
            data:data,
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (res)=>{
                resolve(res.data)
            },
            fail: (err)=>{
                reject(err)
            },
        });
    })
}
module.exports={
    getBanner:()=>{
        return http('/banner',{type:2})
    },
    getHot:()=>{
        return http('/top/playlist',{order:"hot"})
    },
    getJapan:()=>{
        return http('/top/playlist',{cat:"日语"})
    },
    getMv:(data)=>{
        return http('/personalized/djprogram',data)
    },
    getPlaylistDetail:(data)=>{
        return http('/playlist/detail',data)
    },
    getMusicUrl:(data)=>{
        return http('/song/url',data)
    }
}