<template>
  <div class="list-container">
     <el-form ref="form" :model="queryForm" :inline="true">
          <el-form-item>
            <el-input
              v-model.trim="queryForm.title"
              placeholder="请输入商品名称"
              clearable
            />
          </el-form-item>
           <el-form-item>
              <el-select v-model="queryForm.isEnable" clearable placeholder="请选择状态" @change="handlechange">
                <el-option
                    v-for="item in options"
                    :key="item.text"
                    :label="item.text"
                    :value="item.value"
                  >
           </el-option>
           </el-select>
            </el-form-item>
            <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
               查询
            </el-button>
            <el-button icon="iconfont el-icon-myzhongzhi" type="danger" @click="resetData">
              重置
            </el-button>
          </el-form-item>
     </el-form>
     <el-table v-loading="listLoading" :data="tabledata">
       <el-table-column
         prop="title"
         show-overflow-tooltip
         label="产品标题">
        </el-table-column>
        <el-table-column
         prop="label"
         show-overflow-tooltip
         label="标签">
        </el-table-column>
        <el-table-column
         prop="power"
         label="算力值">
        </el-table-column>
        <el-table-column
         prop="unitPrice"
         label="单份价格">
        </el-table-column>
        <el-table-column
         prop="powerType"
         label="算力币种" :formatter="powerTypeformatter">
        </el-table-column>
        <el-table-column
         prop="buyCoin"
         label="购买币种" :formatter="buyCoinformatter">
        </el-table-column>
        <el-table-column
         prop="upholdDay"
         label="维护周期">
        </el-table-column>
        <el-table-column
         prop="upholdRate"
         label="维护费率">
        </el-table-column>
        <el-table-column
         prop="readyDay"
         label="准备周期">
        </el-table-column>
        <el-table-column
         prop="validityDay"
         label="有效期">
        </el-table-column>
        <el-table-column
         prop="isEnable"
         label="是否启用">
        <template #default="{ row }">
                <el-tag v-if="row.isEnable" type="success">启用</el-tag>
                <el-tag v-else type="danger">禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column
         width="300"
         label="操作">
            <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handlegiving(row)">设置赠送商品</el-button>
            <el-button type="text" @click="handleQuery(row)">设置支付方式</el-button>
        </template>
        </el-table-column>
     </el-table>
     <el-pagination
      background
      :current-page="queryForm.current"
      :page-size="queryForm.size"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
      <goodsEdit  ref="edit" @getmisgoods='GetMisGoods'/>
      <goodsGiving  ref="giving" @getmisgoods='GetMisGoods'/>
  </div>
</template>

<script>
import goodsEdit from './components/goodsEdit'
import goodsGiving from './components/givingEdit'
import { GetMisGoods,GetCoinAllTypeList } from  '@/api/goods'
  export default {
    components:{goodsEdit,goodsGiving},
    data() {
      return {
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        listLoading:true,
        tabledata:[],
        wallets:[],
        queryForm:{
            current:1,
            size:10,
            isEnable:'',
            title:''

        },
        form: {
            name:'',
            status:''
        },
        options:[
          {
            text:'启用',
            value:true
          },
          {
            text:'禁用',
            value:false
          }
        ]
      }
    },
    created(){
        this.GetMisGoods()
        this.GetCoinAllTypeList()
      },
    methods: {
      handlegiving(row) {
         this.$refs['giving'].showGiving(row)
      },
      handleSizeChange(){
        this.queryForm.size = val
        this.GetMisGoods()
      },
      handleCurrentChange(){
          this.queryForm.current = val
          this.GetMisGoods()
      },
      handleEdit(row) {
         this.$refs['edit'].showEdit(row)
      },
      handleQuery() {

      },
      handlechange(val) {
        console.log(val)
      },
      powerTypeformatter(row) {
          return this.wallets.find(item => item.id == row.powerType)
      },
      buyCoinformatter(row) {
          return this.wallets.find(item => item.id == row.buyCoin)
      },
      async GetCoinAllTypeList() {
          const { data } = await GetCoinAllTypeList()
          this.wallets = data
      },
      async GetMisGoods() {
         this.listLoading = true
        const {data}  = await GetMisGoods(this.queryForm)
        this.tabledata = data.records
        this.total = data.total
        this.listLoading = false
      },
      async queryData() {
        this.GetMisGoods()
      },
       resetData() {
         this.queryForm = this.$options.data().queryForm
         this.GetMisGoods()
      },
    }
  }
</script>
