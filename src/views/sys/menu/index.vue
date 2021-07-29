<template>
  <div class="menuManagement-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <vab-query-form>
          <vab-query-form-top-panel :span="12">
            <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
              添加
            </el-button>
          </vab-query-form-top-panel>
        </vab-query-form>
        <el-table
          v-loading="listLoading"
          :data="list"
          :element-loading-text="elementLoadingText"
          row-key="id"
          border
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column
            prop="name"
            sortable
            label="名称"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="icon"
            label="图标"
          ></el-table-column>
           <el-table-column
          prop="url"
          label="路径"/>
        <el-table-column
          label="是否启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949"/>
          </template>
        </el-table-column>
          <el-table-column
            prop="parentName"
            label="上级"
          ></el-table-column>
           <el-table-column
          prop="sort"
          sortable
          label="排序">
         </el-table-column>
          <el-table-column show-overflow-tooltip label="操作" width="200">
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
  import { FindMenusAsTreeCte } from '@/api/router'
  import { doDelete } from '@/api/menuManagement'
  import Edit from './components/MenuManagementEdit'

  export default {
    components: { Edit },
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        list: [],
        listLoading: true,
        elementLoadingText: '正在加载...',
      }
    },
    async created() {
      this.fetchData()
    },
    methods: {
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        }
      },
      async fetchData() {
        this.listLoading = true

        const { data } = await FindMenusAsTreeCte()
        this.list = data
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
      handleNodeClick(data) {
        this.fetchData()
      },
    },
  }
</script>
