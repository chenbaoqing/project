<template>
  <div class="home">
    <div class="img">
      <span class="location" @click="toggle">{{this.$store.state.city}}</span>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="item in res" :key="item">
          <img class="img" :src="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="nav" :class="{fixedBar:isfixed}">
      <router-link to="/home/nowPlaying">正在热映</router-link>
      <router-link to="/home/comingSoon">即将上映</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'home',
  data() {
    return {
      isfixed:false,
      res:[
        require('@/assets/p2574551676.webp'),
        require('@/assets/p2573691764.webp'),
        require('@/assets/p2572847101.webp'),
        require('@/assets/p2571441805.webp'),
      ],
    }
  },
  mounted(){
    window.addEventListener("scroll",this.handle)
  },

/* mounted() {
        if(this.$route.query.rollType) {
          // 设置初始的 padding-bottom 值为 footer 的高度 +20 防止数据列表拉到最下面被footer挡住 +多少自定
          this.paddingBottom = document.querySelector('.footer').offsetHeight + 800 + 'px';
          // 设置bar浮动阈值为 #fixedBar 至页面顶部的距离
          this.offsetTop = document.querySelector('#fixedBar').offsetTop;
          // 开启滚动监听
          window.addEventListener('scroll', this.handleScroll);
        }
  },
  methods: {
      // 滚动监听  滚动触发的效果写在这里
        handleScroll() {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
 
          if (scrollTop >= this.offsetTop) {
            this.isFixed = true;
            this.marginTop = document.querySelector('#fixedBar').offsetHeight + 'px';
          } else {
            this.isFixed = false;
            this.marginTop = 0;
          }
        },
  } */
  methods:{
    handle(){
      var height=document.documentElement.scrollTop;
      if(height>380){
        this.isfixed=true;
      }else{
        this.isfixed=false;
      }
    },
    toggle(){
      this.$router.push('/city')
    }
  }
}
</script>
<style scoped>
*{
  margin: 0;padding: 0;
}
.img{
    width: 100%;
    height: 800px;
}
.img[data-v-fae5bece]{
  height: 600px;
}
.fixedBar{
  position: fixed;
  width: 10rem;
  top: 0;
  background: #fff;
  z-index: 100
}
.nav{
  display: inline-block;
  background: #fff;
  height: 110px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
a{
  text-decoration: none;
  color: #333;
  display: inline-block;
  padding: 30px 3px;
  border-bottom: 6px solid #333;
}
.location{
  color: #fff;
  font-size: 22px;
  position: absolute;
  top:35px;
  left: 20px;
  z-index: 100;
  display: inline-block;
  width:120px;
  background: rgba(145, 141, 141, 0.36);
  text-align: center;
  line-height: 65px;
  border-radius: 40px;
}
</style>