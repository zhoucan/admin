<template>
<div class="element-container">
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    :fullscreen="true"
    :close-on-click-modal = "false"
    @close="close"
  >
   <el-form :inline="true" :model="recharge" class="demo-form-inline">
    <el-form-item>
      <el-select v-model="recharge.coin" placeholder="请输入币种">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.text"
          :value="item.id">
       </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
    <el-input v-model="recharge.tradeHash" placeholder="请输入Hash"></el-input>
    </el-form-item>
    <el-form-item>
    <el-input v-model="recharge.to" placeholder="请输入转入地址"></el-input>
    </el-form-item>
    <el-form-item>
    <el-input v-model="recharge.from" placeholder="请输入转出地址"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="充值明细" name="Recharge">
      <Table ref="table"  :table-data='tableData'>
      <el-table-column
        prop="date"
        label="Hash"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="转入地址"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="转出地址"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="数量"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="交易状态"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        >
      </el-table-column>
  </Table>
    </el-tab-pane>
    <el-tab-pane label="提现明细" name="Withdrawal">
       <Table ref="table" :table-data='tableData'>
          <el-table-column
              prop="date"
              label="Hash"
              >
            </el-table-column>
            <el-table-column
              prop="date"
              label="转入地址"
              >
            </el-table-column>
            <el-table-column
              prop="date"
              label="转出地址"
              >
            </el-table-column>
            <el-table-column
              prop="date"
              label="数量"
              >
            </el-table-column>
            <el-table-column
              prop="date"
              label="交易状态"
              >
            </el-table-column>
            <el-table-column
              prop="date"
              label="手续费"
              >
            </el-table-column>
            <el-table-column
              prop="date"
              label="创建时间"
              >
            </el-table-column>
      </Table>
    </el-tab-pane>
  </el-tabs>
  </el-dialog>
</div>
</template>

<script>
  import { GetCoinTypeList,RechargePage,WithdrawalPage } from '@/api/userManagement'
  import Table from './userTable'
  export default {
    name: 'UserDetail',
    components: { Table },
    data() {
      return {
        recharge:{
          coin: 10005,
          tradeHash: '',
          to: '',
          from: '',
          current: 1,
          size: 15,
        },
        options:[],
        activeName: 'Recharge',
        tableData:[],
        title:'账户明细',
        dialogFormVisible: false,
      }
    },
    created() {
      this.GetCoinType()
      
    },
    methods: {
      handleClick(tab){
          if(tab.name === 'Recharge'){
              this.GetUserRechargePage(this.row)
          }else{
             this.GetUserWithdrawalPage(this.row)
          }
      },
      async GetUserRechargePage(row) {
         this.recharge.id = row.id
         const { data } = await RechargePage(this.recharge)
         this.tableData = data.data
         
      },
     async  GetUserWithdrawalPage(row) {
         this.recharge.id = row.id
         const { data } = await WithdrawalPage(this.recharge)
         this.tableData = data.data
        
      },
      onSubmit() {
          
      },
     async GetCoinType() {
          const { data } = await GetCoinTypeList()
          this.options = data
      },
       showDetail(row) {
        this.row = row
        this.GetUserRechargePage(row)
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
      save() {
            this.close()
        
      },
    },
  }
</script>
<style lang="scss" scoped>
  .element-container {
    ::v-deep {
      .el-dialog__wrapper {
        position: fixed;
        top: 20px;
        right: 20px;
        bottom: 20px;
        left: 20px;
     }
    }
 }
      </style>