<template>
  <div id="app">
    <div class="header">
      <div class="head">
        <div class="nav">ToDoList</div>
        <div class="searchBar">
          <el-input v-model="input" @keyup.enter.native="clickEnter" placeholder="添加ToDo"></el-input>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <p class="text">正在进行</p>
        <span class="num">{{data.length-sum}}</span>
        <div class="item" v-for="(item,index) of data" :key="item.id" :index="index" v-show="!item.checked">
          <el-checkbox v-model="item.checked"></el-checkbox>
          <div class="box">{{item.name}}</div>
          <button  @click="handleDelete(item)">删除</button>
        </div>
        <p class="text">已经完成</p>
        <span class="num">{{sum}}</span>
        <div class="item" v-for="(item,index) of data" :key="item.id" :index="index" v-show="item.checked">
          <el-checkbox v-model="item.checked"></el-checkbox>
          <div>{{item.name}}</div>
          <button  @click="handleDelete(item)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
// import Item from './components/Item.vue'

export default {
  name: 'app',
  // components: {
  //   Item
  // },
  data() {
    return {
      input:"",
      data:[],
      checked:false
    };
  },
  methods:{
    clickEnter(){
      if(this.input){
        var data=this.data;
        var obj={};
        obj.checked=this.checked;
        obj.name=this.input;
        data.push(obj);
        this.input=""
      }
    },
    handleDelete(item){  
      var data=this.data.filter(value=>value!==item);
      this.data=data
    }
  },
  computed:{
    sum(){
      var sum =this.data.filter(item=>item.checked);
      return sum.length
    }
  },
  mounted(){
    let data= localStorage.getItem("data");
    if(data){
      this.data = JSON.parse(data);
    }else{
      localStorage.setItem("data","[]")
    }
  },
  updated(){
    localStorage.setItem("data", JSON.stringify(this.data));
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.box{
  margin-left: 12px;
}
.num{
  background: #E6E6FA;
  display: inline-block;
  width: 20px;
  height: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  border-radius: 50px;
}
.searchBar{
  width:30%;
  min-width: 100px;
  height: 40px;
}
.header {
  width: 100%;
  background: #323232;
  padding: 12px 0;
}
.head{
  width:50%;
  margin: 0 auto;
  display: flex;
}
.nav{
  display: flex;
  align-items: center;
  margin-right: 120px;
  color: rgb(216, 211, 211);
  font-size: 24px;
}
.head .el-input {
  width: 170%;
  height: 28px;
}
.content {
  width: 50%;
  margin: 0 auto;
  position: relative;
}
.text{
  font-size: 24px;
  font-weight: 600;
  margin: 25px 0;
}
.item {
    display: flex;
    padding: 6px 0;
    background: #FFFFFF;
    border-radius: 3px;
    position: relative;
    width: 85%;
    margin: 10px 0;
}
button{
    display: flex;
    align-items: center;
    position: absolute;
    top: 4px;
    right:10px;
    border-radius: 3px;
}
.el-checkbox{
    margin: 0 15px;
}
body {
  background: #CDCDCD;
}
/* .head .el-input__inner {
  width: 100%;
  height: 28px;
} */
</style>
