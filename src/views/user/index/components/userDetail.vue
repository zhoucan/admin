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
  </el-dialog>
</div>
</template>

<script>
  import { doEdit } from '@/api/userManagement'

  export default {
    name: 'UserDetail',
    data() {
      return {
        title:'账户明细',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showDetail() {
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