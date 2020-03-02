<template>
    <div class="container">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <item  v-for="item of subjects" :key="item" :data="item"></item>
        </van-list>
    </div>
</template>

<script>
import Item from '@/components/MovieItem.vue'
    export default {
        components: {
            Item
        },
        data() {
            return {
                subjects:[],
                finished:false,
                count:10,
                loading:false
            }
        },
        mounted(){
            this.axios.get('https://douban.uieee.com/v2/movie/in_theaters').then(res=>{
                this.subjects=res.data.subjects;
                var subjects=this.subjects;
                var obj={};
                subjects.forEach(item=>{
                    // obj.casts=item.casts;
                    var casts=[];
                    item.casts.forEach(item=>{
                    casts.push(item.name)
                    })
                    obj.cast=casts.join("/")
                    console.log(obj.cast)
                    subjects.push(obj)
                })
            })
        },
        methods:{
            onLoad(){
                var url=`https://douban.uieee.com/v2/movie/in_theaters?count=${this.count}&start=${this.subjects.lenghth}`;
                this.axios.get(url).then(res=>{
                    this.subjects=this.subjects.concat(res.data.subjects);
                    this.loading=false;
                });
                if(this.subjects.length>=250){
                    this.finished=true;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>