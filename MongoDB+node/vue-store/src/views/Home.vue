<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="top">
      <div class="top-left"><img src="@/assets/logo_wps图片.svg" alt=""></div>
      <div class="top-right">
        <el-button type="success" @click="dialogFormVisible = true" >登录</el-button>
          <el-dialog title="登陆界面" :visible.sync="dialogFormVisible">
            <el-form :model="form" status-icon :rules="rules">
              <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
                <el-input type="password" v-model="form.pass"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button class="sure" type="primary" @click="handleLogin">确 定</el-button>
            </div>
          </el-dialog>
        <el-button @click="handleLogout">退出</el-button>
        <span @click="handleCart"><i class="iconfont icon">&#xe656;</i></span>
      </div>
    </div>
    
    <div class="container">
      <div class="content">
        <item class="nav"></item>
        <div class="input"><input type="text">
        <p class="sort"><span>排序：</span><span>默认 </span><span @click="handleSort"> 价格<i class="iconfont">{{sortFlag==1?'&#xe62f;':'&#xe630;'}}</i></span></p></div>
      </div>
      <div class="content">
        <div class="price">
          <h3>通过价格搜索 :</h3>
          <div v-for="item of searchPrice" :key="item.id">
            <p @click="handlePrice(item.gt,item.lt)">{{item.gt}}--{{item.lt}}</p>
          </div>
        </div>
        <div class="product">
          <div class="item" v-for="item of goodsList" :key="item.productName">
            <img :src="item.productImage" alt="">
            <p class="name">{{item.productName}}</p>
            <p class="salePrice"><i class="iconfont">&#xe652;</i><span>{{item.salePrice}}</span></p>
            <button class="btn" @click="addCart(item.productId)">加入购物车</button>
          </div>
        </div>
      </div>
      <el-pagination
        @current-change="getPage"
        class="pagination"
        background
        small
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import Item from '../views/NavItem'
export default {
  name: 'home',
  components:{
    Item
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    }
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        pass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" ,required:true}],
        username: [  { required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      formLabelWidth: "120px",
      searchPrice:[
        {gt:0,lt:100,id:1001},
        {gt:100,lt:500,id:1002},
        {gt:500,lt:1000,id:1003},
        {gt:1000,lt:5000,id:1004},
        {gt:5000,lt:10000,id:1005},
      ],
      total:30,
      limit:8,
      start:0,
      sortFlag: 1,
      goodsList:""
    }
  },
  props:['data'],
  mounted(){
    var start=this.start;
    var limit=this.limit;
    this.axios.get("/goods/list",{params:{start,limit:limit}}).then(res=>{
      this.goodsList=res.data.result
      console.log(res)
    }),
    this.axios('/users/checkLogin').then(res=>{
      console.log(res.data)
      if(res.data.code==200){
        this.successName=res.data.result
      }else{
        this.$message({
          message:"未登录",
          duration:1000,
          type:"warning"
        })
      }
    })
  },
  methods:{
    handlePrice(gt,lt){
      this.axios({
        url:"/goods/price",
        method:'get',
        params:{
          gt,
          lt
        }
      }).then(res=>{
        if(res.data.code==200){
          this.goodsList=res.data.result;
          this.total=10;
        }else{
          this.goodsList=[];
          this.$message({
            duration:1000,
            message:res.data.msg,
            type: 'warning'
          })
        }
      })
    },
    handleLogin(){
      console.log(this.form)
      if(this.form.username&&this.form.pass){
        this.axios({
          url:"/users/login",
          method:"post",
          data:{
            userName:this.form.username,
            userPwd:this.form.pass
          }
        }).then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.$message({
              message:res.data.msg,
              duration:1000,
              type:"success"
            })
            this.successName =  res.data.result;
            this.dialogFormVisible=false;
          }else{
            this.$message({
              message:res.data.msg,
              duration:1000,
              type:"error"
            })
          }
        })
      }else{
        this.$message({
          message:"用户名和密码不能为空",
          duration:1000,
          type:"error"
        })
      }
    },
    handleLogout(){
      this.axios.post('/users/logout').then(res=>{
        this.$message({
          message:res.data.msg,
          duration:1000
        })
        this.successName = ""
      })
    },
    getPage(page){
      console.log(page)
      this.start=(page - 1)*this.limit;
      this.initData();
    },
    initData(){
      this.axios.get("/goods/list",{params:{start:this.start,limit:this.limit}}).then(res=>{
        if(res.data.code==200){
          this.goodsList=res.data.result;
          this.total=Math.ceil(res.data.total/this.limit)*10;
        }
      })
    },
    compareUp(value){
      return (a,b)=>{
        return a[value]-b[value]
      }
    },
    compareDown(value){
      return (a,b)=>{
        return b[value]-a[value]
      }
    },
    handleSort(){
      this.sortFlag=this.sortFlag==1 ?-1:1;
      if(this.sortFlag==1){
        this.goodsList.sort(this.compareUp("salePrice"))
      }else{
        this.goodsList.sort(this.compareDown("salePrice"))
      }
    },
    addCart(productId){
      this.axios({
        method:"post",
        url:'/users/addCart',
        data:{
          productId
        }
      }).then(res=>{
        this.$message({
          message:res.data.msg,
          duration:1000,
          type:"success"
        })
      })
    },
    handleCart(){
      this.$router.push({path:'/carts'})
    }
  },
  beforeRouteLeave (to,from,next) {
    this.axios('/users/checkLogin').then(res=>{
      if(res.data.code==200){
        next()
      }else{
        this.$message({
          message:res.data.msg,
          duration:1000
        })
      }
    })
  }
}
</script>
<style scoped>
*{
  margin: 0;padding: 0;
}
.top{
  position: relative;
}
.top div{
  float: left;
}
.top-right{
  position: absolute;
  right: 30px;
  top: 25px;
}
.nav{
  color: #878787;
  margin-top: 10px;
}
.bold{
  font-weight: bold;
  color: #333;
}
.input, input{
  width: 1165px;
  height: 40px;
  background: #fff;
  margin-top: 45px;
} 
.sort{
  position: absolute;
  right: 200px;
  top: 180px;
}
.content,.top{
  overflow: hidden;
  width: 1200px;
  margin: auto;
}
.container{
  background: #F5F7FC;
  width: 100%;
}
.content img{
  width: 200px;
}
.price{
  color: #878787;
  width: 240px;
  text-align: center;
  line-height: 45px;
  margin-top: 20px;
}
.name{
  color: #333;
  margin-bottom: 60px;
}
.item{
  float: left;
  background: #fff;
  color: #D3434A;
  float: left;
  text-align: center;
  margin-left: 27px;
  margin-top: 25px;
  border: 2px solid #E9E9E9;
  position: relative;
}
.content>div{
  float: left;
}
.product{
  width: 960px;
}
.salePrice{
  position: absolute;
  left: 15px;bottom:50px;
}
.btn{
  background: #fff;
  width: 180px;
  height: 32px;
  border: 1px solid #D3434A;
  color: #D3434A;
  font-weight: bold;
  margin-bottom: 10px;
}
.pagination{
  width: 250px;
  margin: auto;
  padding: 25px 0;
}
.sure{
  position: absolute;
  bottom: 20px;right: 10px;
}
.icon{
  font-size: 28px;
  color: #878787;
}
</style>