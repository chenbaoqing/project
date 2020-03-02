<template>
    <div>
        <div class="top">我的购物车</div>
        <div class="nav"></div>
        <div class="content" v-for="item of goodsList" :key="item.id">
            <van-card class="card"
            :num="item.productNum"
            :price="item.salePrice"
            :title="item.productName"
            :thumb="item.productImage">
            <div slot="bottom" class="checkbox"><van-checkbox class="checked" v-model="item.checked"  checked-color="#E28861"></van-checkbox></div>
                <div slot="bottom" class="count"><van-stepper v-model="item.productNum" /></div>
                <div slot="footer"><van-button  @click="handleDelete(item.productId)" class="btn" type="danger">删除</van-button></div>
            </van-card>
            <van-submit-bar
            :price="sum"
            button-text="提交订单"><van-checkbox v-model="checkAll"></van-checkbox>全选</van-submit-bar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               goodsList:"" ,
            //    value: 1,
            //    checked:false
            }
        },
        computed: {
            checkAll: {
                /* products值变化时会重新计算 */
                get() {
                    return this.goodsList.every(item => item.checked);
                },
                set(val) {
                    //给checkbox赋值的时候触发
                    this.goodsList.forEach(item => (item.checked = val));
                }
            },
            sum(){
                var total=0;
                this.goodsList.forEach(item=>{
                    if(item.checked){
                        total=item["productNum"]*item["salePrice"]+total;
                    }
                });
                return total*100;
            }
        },
        methods:{
            handleDelete(productId){
                this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                this.axios.post('/users/cartList/del',{
                    productId
                }).then(res=>{
                    console.log(res)
                    this.initData()
                })
            },
            initData(){
                this.axios.get("/users/cartList").then(res=>{
                    this.goodsList=res.data.result
                    console.log(res)
                })
            },
            async onChange(item){
                var {productNum,productId}=item;
                await this.axios.post('/users/cartList/edit',{
                    productNum,
                    productId
                })
            }
        },
        mounted(){
            this.initData()
        }
    }
</script>

<style lang="scss" scoped>
.count{
    position: absolute;
    left: 300px;
}
.card{
    padding-left: 50px;
    margin-top: 15px;
}
.checked{
    margin-top: 60px;
}
.btn{
    position: absolute;
    right: 420px;
    top: 25px;
}
.checkbox{
    position: absolute;
    left: -135px;
    bottom: 35px;
}
</style>