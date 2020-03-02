<template>
  <div class="item">
    <input type="checkbox" class="cbx" v-model="datas.isChecked" />
    <div>{{datas.name}}</div>
    <button  @click="handleDelete(datas)">删除</button>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    datas:{
      type:Object,
      value:""
    },
    index:{
      type:Number,
      value:""
    }
  },
  methods:{
      handleDelete(datas){
      this.$emit("del")
    }
  }
}
</script>

<style scoped>
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
</style>
