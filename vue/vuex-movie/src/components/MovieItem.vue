<template>
  <div class="hello"  >
    <router-link :to="'/detail/'+data.id">
      <div class="item">
        <div><img :src="data.images.small" alt=""></div>
        <div>
          <p class="title">{{data.title}}</p>
          <div class="center">
            <p><span>观众评分 </span> <span class="star"> {{data.rating.average}}</span></p>
            <p><span>主演：</span><span v-for="item of (data.casts)" :key="item.id">{{item.name}} </span></p>
            <p><span></span><span>{{data.mainland_pubdate}}</span></p>
          </div>
          <div>
            <p class="buy">预购</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data:{
      type:Object,
      required:true
    }
  },
  // methods:{
  //   handleClick(){
  //       this.$router.push('/detail')
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
*{margin: 0;padding: 0}
.item{
    margin-top: 40px;
    overflow: hidden;
}
.item div{
    float: left;
}
img{
    width: 150px;
    height: 210px;
    margin-left: 35px;
}
.center{
    font-size: 16px;
    color: #878787;
}
.star{
    color: #FFC461;
}
p{
    margin-top: 8px;
    margin-left: 22px;
}
.buy{
  width: 100px;
  height: 50px;
  line-height: 50px;
  color: #ffb232;
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
  border:2px solid #ffb232;
  position: absolute;
  right: 30px;
}
</style>
