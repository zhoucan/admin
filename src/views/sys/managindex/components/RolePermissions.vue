<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="700px"
      @close="close"
    >
      <el-tree
        ref="tree"
        default-expand-all
        :data="treedata"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultcheckedkeys"
        :props="defaultProps"
        @check="checkchange"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { doAuthMenus } from '@/api/roleManagement'
  export default {
    props: {
      treedata: {
        type: Array,
        default: () => {
          return []
        },
      },
      defaultcheckedkeys: {
        type: Array,
        default: () => {
          return []
        },
      },
      userid: {
        type: String,
        default: () => {
          return ''
        },
      },
    },
    data() {
      return {
        checkedkeys: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        title: '角色权限',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      checkchange() {
        let CheckedKeysArr = this.$refs.tree
          .getCheckedKeys()
          .concat(this.$refs.tree.getHalfCheckedKeys())
        this.TreeData(this.treedata, CheckedKeysArr)
      },
      TreeData(node, checkarr) {
        node.forEach((item) => {
          item.checked = checkarr.some((element) => element === item.id)
          if (item.children && item.children.length > 0) {
            this.TreeData(item.children, checkarr)
          }
        })
      },

      async save() {
        const { msg } = await doAuthMenus({
          Menus: this.treedata,
          Uid: this.userid,
        })
        this.dialogFormVisible = false
        this.$baseMessage(msg, 'success')
      },

      close() {
        this.dialogFormVisible = false
      },
      shwoPermissions() {
        this.dialogFormVisible = true
      },
    },
  }
</script>
<style></style>
