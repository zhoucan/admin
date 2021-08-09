<template>
   <vab-table :tabledata='assetsinfodata'  :loading='loading' :ispage='false'>
      <el-table-column
        prop="coin"
        label="币种"
        >
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="余额"
        >
        </el-table-column>
        <el-table-column
        prop="rechargeAmount"
        label="充值"
        >
         </el-table-column>
        <el-table-column
        prop="withdrawAmount"
        label="提现"
        >
         </el-table-column>
        <el-table-column
        prop="powerPay"
        label="算力消费"
        >
        </el-table-column>
        <el-table-column
        prop="powerProfit"
        label="挖矿奖励"
        >
        </el-table-column>
        <el-table-column
        prop="withdrawFee"
        label="提现手续费"
        >
        </el-table-column>
        <el-table-column
        prop="powerFee"
        label="算力维护费"
        >
      </el-table-column>
       </vab-table>
</template>

<script>
import VabTable from '@/components/VabTable'
export default {
  components: { VabTable },
  props :{
       assetsinfodata:{
         type:Array,
         default:() => {
              return []
         }
       },
   loading: {
      type:Boolean,
      default:true
    }
   },
  data() {
      return {
          
      }
  },
   mounted() {
     
   },
  
}
</script>

<style>

</style>