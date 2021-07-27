<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="formModel" :rules="rules" label-width="80px">
      <el-form-item label="角色类型" prop="isAdmin">
        <el-select
          v-model="formModel.isAdmin"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in jueSeLXMCData"
            :key="item.id"
            :label="item.lable"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="级别">
        <el-input
          v-model="formModel.level"
          type="number"
          placeholder="请输入"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, doAddRole } from '@/api/roleManagement'

  export default {
    name: 'RoleManagementEdit',
    data() {
      return {
        formModel: {
          highlight: true,
          level: undefined,
          name: undefined,
          isAdmin: undefined,
          id: undefined,
        },
        jueSeLXMCData: [
          { id: true, lable: '管理员' },
          { id: false, lable: '普通用户' },
        ],
        rules: {
          isAdmin: [{ required: true, trigger: 'blur', message: '不能为空' }],
          name: [{ required: true, trigger: 'blur', message: '不能为空' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.formModel = Object.assign(this.formModel, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.formModel = this.$options.data().formModel
        console.log(this.$options)
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.formModel.id) {
              const { msg } = await doEdit(this.formModel)
              this.$baseMessage(msg, 'success')
            } else {
              const { msg } = await doAddRole(this.formModel)
              this.$baseMessage(msg, 'success')
            }
            this.$emit('fetch-data')
            this.close()
          } else {
            return false
          }
        })
      },
    },
  }
</script>
