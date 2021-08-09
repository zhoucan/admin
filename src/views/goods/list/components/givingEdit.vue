<template>
<div class="goodsEdit-container">
  <el-dialog
    title='赠送商品'
    :visible.sync="dialogFormVisible"
    width="1300px"
    @close="close"
  >
  <div class="box-wrap">
    <el-card v-for="(item,index) in GetGive" :key="index" class="box-card">
      <el-form :ref="item.formRef" :model="item.formModel" label-width="80px" >
        <el-form-item label="标题" prop="title" :rules="[{ required: true, trigger: 'blur',message: '不能为空'}]">
          <el-input v-model="item.formModel.title"></el-input>
        </el-form-item>
        <el-form-item label="算力值" prop="power">
          <el-input v-model="item.formModel.power"></el-input>
        </el-form-item>
        <el-form-item label="算力产出" prop="powerType">
          <el-input v-model="item.formModel.powerType"></el-input>
        </el-form-item>
        <el-form-item label="算力类型" prop="productType">
          <el-input v-model="item.formModel.productType"></el-input>
        </el-form-item>
        <el-form-item label="添加时间">
          <el-input v-model="item.formModel.addTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="item.formModel.updateTime" readonly></el-input>
        </el-form-item>
      </el-form>
      <div class="ftbtn">
        <el-button type="primary" @click="GetGivesave(item)">保存</el-button>
      </div>
    </el-card>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { GetGiveGoodsList} from '@/api/goods'
export default {
  data() {
    return {
      givingform:{},
      GetGive:[],
      dialogFormVisible: true,
       rules: {
          
        },
    }
  },
  created() {
        this.GetGiveGoodsList('b13e269b-646a-422b-ad99-d7967cfe9879')
    },
  methods: {
    GetGivesave(item) {
      console.log(item)
    },
    async GetGiveGoodsList(id) {
        const { data } = await GetGiveGoodsList(id)
        data.forEach(item => {
            item.formModel = item
        });
        console.log(data)
        this.GetGive = data
    },
    save() {
       this.$refs['form'].validate(async (valid,object) => {
          if (valid) {
             
             
          } else {
            for(let item in object) {
                    setTimeout(()=> {
                        this.$baseMessage(object[item][0].message,'error',1200)
                    },100)
            }
          }
        })
    
      
    },
    
    close() {
      this.$refs['form'].resetFields()
      this.dialogFormVisible = false
    },
  
    showGiving(row) {
        this.dialogFormVisible = true
        this.GetGiveGoodsList(row.id)
    },
  },
}
</script>

<style lang="scss" scoped>
  .goodsEdit-container {
    .box-wrap {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .box-card {
          width: 400px;
        }
        .ftbtn {
           display: flex;
           justify-content: flex-end;
        }
    }
    .news {
      &-title {
        text-align: center;
      }

      &-content {
        ::v-deep {
          p {
            line-height: 30px;

            img {
              display: block;
              margin-right: auto;
              margin-left: auto;
              max-width: 100%;
            }
          }
        }
      }
    }

    .vab-quill-content {
      ::v-deep {
        .el-form-item__content {
          line-height: normal;
        }
      }
    }
  }
</style>