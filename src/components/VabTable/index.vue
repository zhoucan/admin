<template>
<div>
   <el-table
        v-loading="loading"
        :data="tabledata"
        style="width: 100%">
     <slot></slot>
   </el-table>
       <el-pagination
       v-if='ispage'
       background
      :current-page="pages.current"
      :page-size="pages.size"
      :layout="layout"
      :total="Number(pages.total)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
</div>
</template>

<script>

export default {
    props: {
        tabledata:{
            type:Array,
            default: () =>  []
        },
        ispage:{
            type:Boolean,
            default: true
        },
        loading: {
            type:Boolean,
            default:true
        },
        pages: {
            type:Object,
            default:()=> {}
        }
    },
    data() {
        return {
            layout: 'total, sizes, prev, pager, next, jumper',
        }
    },
    mounted() {
        
    },
    methods: {
        handleSizeChange(val){
            this.$bus.emit("handleSizeChange", val);
        },
        handleCurrentChange(val){
            this.$bus.emit("handleCurrentChange", val);
        }
    }
}
</script>

<style>

</style>