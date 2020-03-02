<template>
    <div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <item v-for="item of subjects" :key="item.id" :data="item"></item>
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
            this.axios.get('https://douban.uieee.com/v2/movie/coming_soon').then(res=>{
                this.subjects=res.data.subjects;
                console.log(this.subjects)
            })
        },
        methods:{
            onLoad(){
                var url=`https://douban.uieee.com/v2/movie/coming_soon?count=${this.count}&start=${this.subjects.length}`;
                this.axios.get(url).then(res=>{
                    this.subjects=this.subjects.concat(res.data.subjects);
                    this.loading=false;
                });
                if(this.subjects.length>=250){
                    this.finished=true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>