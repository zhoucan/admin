<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="上级" prop="parentId">
        <el-select
          v-model="form.parentId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in menus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input
          v-model="form.icon"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="路径" prop="url">
        <el-input
          v-model="form.url"
          placeholder=""
        />
      </el-form-item>
       <el-form-item label="是否启用" prop="enable">
        <el-switch
          v-model="form.enable"
          active-color="#13ce66"
          inactive-color="#ff4949"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input
          v-model="form.sort"
          type="number"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="form.describe"
          :rows="2"
          placeholder="请输入"
          type="textarea" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, GetMenus } from '@/api/menuManagement'
  export default {
    data() {
      return {
        form: {},
        rules: {
          id: [{ required: true, trigger: 'blur', message: '请输入路径' }],
        },
        title: '',
        dialogFormVisible: false,
        menus:[]
      }
    },
    created() {

    },
   async mounted() {
        const { data } = await GetMenus()
        this.menus = data
    },
   
    methods: {

      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
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
