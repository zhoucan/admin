<template>
  <el-table
      :data="tableData"
      style="width: 100%">
       <slot></slot>
    </el-table>
</template>

<script>
export default {
    props:{
        tableData: {
            type: Array,
            default: () => {
               return []
            },
      },
    },
   data(){
       return {
           
       }
   },
}
</script>

<style>

</style>