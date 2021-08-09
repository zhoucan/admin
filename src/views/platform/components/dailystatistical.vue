<template>
<div>
  <el-form ref="form" :inline="true" :model="form" >
  <el-form-item label="币种">
    <el-select v-model="form.wallet" placeholder="请输入币种" @change="handlechange">
        <el-option
         v-for="item in options"
          :key="item.id"
          :label="item.text"
          :value="item.id"
          >
       </el-option>
      </el-select>
  </el-form-item>
  </el-form>
       <vab-table :tabledata='dailystatisticaldata' :pages='pages'  :loading='loading'>
      <el-table-column
        prop="text"
        label="币种"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        >
        </el-table-column>
        <el-table-column
        prop="registers"
        label="新增账户"                     
        >
         </el-table-column>
        <el-table-column
        prop="activeUsers"
        label="活跃人数"
        >
         </el-table-column>
        <el-table-column
        prop="newPayUsers"
        label="新增消费人数"
        >
        </el-table-column>
        <el-table-column
        prop="totalPower"
        label="购买算力"
        >
      </el-table-column>
      <el-table-column
        prop="miningPower"
        label="挖矿中算力"
        >
      </el-table-column>
      <el-table-column
        prop="totalPower"
        label="购买算力"
        >
      </el-table-column>
      <el-table-column
        prop="stopPower"
        label="停产算力"
        >
      </el-table-column>
      <el-table-column
        prop="expirePower"
        label="失效算力"
        >
      </el-table-column>
      <el-table-column
        prop="inRecharge"
        label="站内充值"
        >
      </el-table-column>
      <el-table-column
        prop="outRecharge"
        label="站外充值"
        >
      </el-table-column>
      <el-table-column
        prop="outWithdrawal"
        label="站外提币"
        >
      </el-table-column>
      <el-table-column
        prop="powerIncome"
        label="挖矿奖励"
        >
      </el-table-column>
      <el-table-column
        prop="powerFee"
        label="算力维护费"
        >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="170"
        >
      </el-table-column>
       </vab-table>
      
  </div>
</template>

<script>
import { GetCoinTypeList } from '@/api/userManagement'
import VabTable from '@/components/VabTable'

export default {
  components: { VabTable },
  props :{
       dailystatisticaldata:{
         type:Array,
         default:() => {
              return []
         }
       },
       pages: {
           type:Object,
           default:() => {}
       },
       loading: {
          type:Boolean,
          default:true
    }
      
   },
  data() {
      return {
        form:{
          wallet:10001
        },
        options:[],
        
         
      }
  },
  created() {
      this.GetCoinType()
     
   },
   mounted() {
   
   },
  methods: {
    handlechange(val) {
        this.$bus.$emit('GetReport',val);
    },
    async GetCoinType() {
          const { data } = await GetCoinTypeList()
          this.options = data
      },
  },
    
}
</script>

<style>

</style>