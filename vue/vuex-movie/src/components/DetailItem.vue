<template>
    <div>
        <div class="item">
            <div><img  class="bg" :src="data.images.small" alt=""></div>
            <p class="title"><i @click="handleBack" class="iconfont">&#xe608; </i> {{data.title}}</p>
            <div class="content">
                <p>{{data.genres}}</p>
                <p>{{data.pubdate}}上映</p>
                <p>{{data.countries}}分钟</p>
                <p>{{data.summary}}</p>
            </div>
            <div class="wrapper">
                <div class="container" v-for="item of (data.casts)" :key="item.id">
                    <img :src="item.avatars.small" alt="">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Movie',
        props: {
            data:{
                type:Object,
                required:true
            },
            datas:{
                type:Object,
            }
        },
        methods:{
            handleBack(){
                this.$router.back()
            },
        },
        mounted(){
            console.log(1)
        }
    }
</script>

<style lang="scss" scoped>
.bg{
    width: 100%;
    height: 600px;
}
.title{
    margin-left: 40px;
}
.content{
    font-size: 28px;
    color: #878787;
    margin-left: 40px;
}
.wrapper{
  overflow-x: auto;
  overflow-y: hidden;
  display: grid;
  grid-template-columns: repeat(5, 150px);
  gap: 20px;
}
.wrapper img{
  width: 150px;
  height: 80px;
}
.container img{
    height: 200px;
}
</style>