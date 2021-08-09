<template>
  <div class="capacities-container">
    <el-button icon="el-icon-plus" style="margin-bottom:20px" type="primary"  @click="dialogFormVisible = true">
          添加算力
    </el-button>
    <el-table  v-loading="loading" :data="tabledata"  stripe style="width: 100%">
        <el-table-column :formatter="stateForma" prop="powerType" label="币种"/>
        <el-table-column prop="produceCoin" label="单T算力收益">
          <template slot-scope="scope">
            <el-input v-model="scope.row.produceCoin"/>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间"/>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleSave(scope.row)"
            >保存</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogFormVisible" title="添加算力" class="dialogWrap">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-row :gutter="10">
          <el-col :span="12">
             <el-form-item  label="币种">
                <el-select v-model="form.powerType" placeholder="请选择币种">
                  <el-option v-for="(item) in wallets" :key="item.id" :label="item.text" :value="item.id"/>
                </el-select>
             </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item  label="单T算力">
              <el-input v-model="form.produceCoin" type="number" autocomplete="off"/>
        </el-form-item>
       
          </el-col>
        </el-row>
        </el-form>
        
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="add"
        >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetCoinAllTypeList, GetPowerProfit, SetUpPowerProfit ,AddPowerProfit} from '@/api/goods'
  export default {
      data() {
        return {
          loading: true,
          dialogFormVisible: false,
          tabledata:[],
           form: {
             powerType: '',
             produceCoin: ''
          },
          wallets:[],
          formLabelWidth:'90px'
          
        }
      },
      created() {
         this.getCoin()
         this.GetPower()
      },
      methods:{
        async add() {
             const { code ,msg} = await AddPowerProfit(this.form)
             if(code !== 1)  return this.$baseMessage(msg, 'error')
             this.$baseMessage(msg, 'success') 
             this.GetPower()
        },
       
        stateForma(row) {
          return this.wallets.find(item => item.id == row.powerType)
      },
     async handleSave (item) {
        const  params = {
            profitId: item.id,
            powerType: item.powerType,
            produceCoin: item.produceCoin
        }
        const {msg,code}  = await SetUpPowerProfit(params)
            if(code !== 1)  return this.$baseMessage(msg, 'error')
            this.$baseMessage(msg, 'success') 
            this.GetPower()
        
      },
       async getCoin() {
            const { data } = await GetCoinAllTypeList()
             this.wallets = data
          },
          async GetPower() {
             this.loading = true
             const { data } = await GetPowerProfit()
             this.tabledata = data
             this.loading = false
          },
      }
  }
</script>

<style></style>
