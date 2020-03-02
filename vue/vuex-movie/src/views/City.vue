<template>
    <div>
        <div class="nav">当前城市</div>
        <div class="input"><input type="text" placeholder="输入城市名或拼音"></div>
        <div class="content">
            <p class="title">热门城市</p>
            <div class="hotcity">
                <router-link to="/home/nowPlaying" v-for="item of hotCities" :key="item.id" @click.native="handleCity(item.name)">
                    <span class="city">{{item.name}}</span>
                </router-link>
            </div>
            <van-index-bar>
                <div v-for="(value,index) of cities" :key="index">
                    <van-index-anchor :index="index" />
                    <router-link to="/home/nowPlaying" v-for="(val,i) of value" :key="i" @click.native="handleCity(val.name)">
                        <van-cell :title="val.name" />
                    </router-link>
                </div>
            </van-index-bar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cities:[],
                hotCities:[]
            }
        },
        mounted(){
           this.axios.get("/city").then(res=>{
                this.cities=res.data.data.cities;
                this.hotCities=res.data.data.hotCities;
                console.log(this.hotCities)
            });
        },
        methods:{
            handleCity(city){
                this.$store.dispatch("changeCity",city)
            }
        }
    }
</script>

<style lang="scss" scoped>
.nav{
    height: 100px;
    text-align: center;
    line-height: 100px;
}
.content{
    margin-left: 40px;
}
.city{
    display: inline-block;
    padding: 10px 70px;
    background: #F4F4F4;
    margin-right: 50px;
    margin-bottom: 30px;
    border-radius: 10px;
}
a{
    color: #333;
}
input{
    width: 100%;
    border: none;
    color: #F4F4F4;
    height: 60px;
    font-size: 22px;
    border-radius: 10px;
}
.input{
    background: #F4F4F4;
     padding: 25px 40px;
}
.title{
    font-size: 30px;
    color: #878787;
}
</style>