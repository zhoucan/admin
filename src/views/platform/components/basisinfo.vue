<template>
    <vab-table :loading='loading' :tabledata='basisinfodata' :ispage='false'>
      <el-table-column
        prop="userCount"
        label="注册人数"
        >
      </el-table-column>
      <el-table-column
        prop="userValidCount"
        label="有效账户"
        >
        </el-table-column>
        <el-table-column
        prop="bctValidPower"
        label="BTC有效算力"
        >
         </el-table-column>
        <el-table-column
        prop="ethValidPower"
        label="ETH有效算力"
        >
         </el-table-column>
        <el-table-column
        prop="ccpValidPower"
        label="CCP有效算力"
        >
        </el-table-column>
        <el-table-column
        prop="filValidPower"
        label="FIL有效算力"
        >
      </el-table-column>
       </vab-table>
</template>

<script>
import VabTable from '@/components/VabTable'
export default {
  components: { VabTable },
  props: {
    basisinfodata: {
      type: Array,
      default: () => {
        return []
      },
    },
    loading: {
      type:Boolean,
      default:true
    }
    
  },
  data() {
    return {}
  },
  mounted() {
   
  },
}
</script>

<style>
</style>