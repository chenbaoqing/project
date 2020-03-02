<template>
    <div>
        <!-- <van-loading type="spinner" color="#1989fa" v-if="this.$store.state.isLoading" class="loading" /> -->
        <movie :data="movie">
            
        </movie>
    </div>
</template>

<script>
import Movie from '@/components/DetailItem.vue'
    export default {
        components:{
            Movie
        },
        data() {
            return {
                movie:[],
                // casts:[]
            }
        },
        mounted(){
            var id=this.$route.params.id;
            this.axios.get(`https://douban.uieee.com/v2/movie/subject/${id}`).then(res=>{
                this.movie=res.data;
                /* this.casts=res.data.casts;
                var casts=[]
                this.casts.forEach(item=>{
                    var obj={}
                    obj.name=item.name;
                    obj.avatars=item.avatars.small;
                    casts.push(obj)
                })
                console.log(casts) */
            })
            // var id = this.$route.params.id
            // var url = `https://douban.uieee.com/v2/movie/subject/${id}`
            // this.axios.get(url).then(res=>{
            //     console.log(res.data)
            //     this.movie=res.data
            // })
        },
    }
</script>

<style lang="scss" scoped>

</style>