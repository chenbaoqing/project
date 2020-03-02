var baseUrl="https://douban.uieee.com/v2/movie/"
function MovieModel({url,data}){
    return new Promise((resolve,reject)=>{
        wx.request({
            url:baseUrl+url,
            data,
            header: {'content-type':'json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            },
        });
    })
}
module.exports={
    getTop250:()=>{
        return MovieModel({
            url:"top250"
        })
    },
    getInTheaters:()=>{
        return MovieModel({
            url:"in_theaters"
        })
    },
    getComingSoon:()=>{
        return MovieModel({
            url:"coming_soon"
        })
    },
    getMore:(url)=>{
        return MovieModel({
            url
        })
    },
    getDetail:(id)=>{
        return MovieModel({
            url:`subject/${id}`
        })
    },
}