<template>
  <div class="userManagement-container">
    <vab-query-form>
     <!--  <vab-query-form-left-panel :span="12">
         <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button> 
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button> 
      </vab-query-form-left-panel>-->
      <vab-query-form-left-panel :span="24">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.id"
              placeholder="请输入用户ID"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.account"
              placeholder="请输入账户"
              clearable
            />
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
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <!-- <el-table-column show-overflow-tooltip type="selection"></el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="account"
        label="账号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="accountType"
        label="账号类型"
      >
        <template #default="{ row }">
          <el-tag v-if="row.accountType === 1">手机号码</el-tag>
          <el-tag v-else type="success"></el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="userName"
        label="名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="loginTime"
        label="上次登录"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="registerTime"
        label="注册时间"
      ></el-table-column>
       <el-table-column
        show-overflow-tooltip
        prop="enable"
        label="状态"
      >
       <template #default="{ row }">
         <el-tag v-if="row.enable" type="success">未冻结</el-tag>
         <el-tag v-else type="info">已冻结</el-tag>
       </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" @click="handleQuery(row)">查看账户明细</el-button>
          <el-button  v-if="row.enable" type="text" @click="handleblocking(row)">冻结</el-button>
          <el-button
              v-else
              type="text"
              @click="handleblocking(row)">恢复</el-button>
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
    <Detail ref="Detail"></Detail>
  </div>
</template>

<script>
  import { getList, FreeezeUser,ResumeUser  } from '@/api/userManagement'
  import StringUtils from '@/utils/StringUtils'
  import Detail from './components/userDetail'

  export default {
    name: 'UserManagement',
    components: { Detail },
    data() {
      return {
        list: null,
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          current:1,
          size:10,
          id:'',
          account:''
          
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      handleQuery(row) {
          this.$refs['Detail'].showDetail(row)
      },
      handleblocking(row) {
        if(row.id && row.enable === false){
            this.$baseConfirm(`你确定要恢复${row.id}用户吗`, null, async () => {
            const { msg } = await ResumeUser(row.id)
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })   
          return
        }
        if (row.id && row.enable === true) {
          this.$baseConfirm(`你确定要冻结${row.id}用户吗`, null, async () => {
            const { msg } = await FreeezeUser(row.id)
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.size = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.current = val
        this.fetchData()
      },
      queryData() {
        if (!(StringUtils.isEmpty(this.queryForm.id) ^ StringUtils.isEmpty(this.queryForm.account))) {
               this.$baseMessage('不能为空', 'warning')   
               return 
        }
         let obj = {
            current : 1
         }
         this.queryForm = Object.assign(this.queryForm, obj)
         this.fetchData()
      },
      resetData() {
         this.queryForm = this.$options.data().queryForm
         this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getList(this.queryForm)
        this.list = data.records
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
