<template>
<div class="creategoods-container">
  <el-form ref="form"  :rules="rules"  :model="goodsform" label-width="90px">
      <el-form-item ref="isEnable" label="启用" prop="isEnable">
        <el-radio-group v-model="goodsform.isEnable">
          <el-radio
            v-for="(item, index) in radiaos"
            :key="index"
            :label="item.label"
          >
            {{ item.text }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="goodsform.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="goodsform.label" placeholder="请输入标签"></el-input>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="产品类型"  prop="productType">
            <el-select
              v-model.number="goodsform.productType" 
              clearable
              placeholder="请选择产品类型"
              style="width: 100%"
            >
              <el-option
                v-for="item in product_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="算力值" prop="power">  
            <el-input
              v-model.number="goodsform.power"
              type="number"
              placeholder="请输入算力值"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" >
          <el-form-item label="初始有效算力" label-width="120px" prop="initialEffectivePower">
            <el-input
              v-model.number="goodsform.initialEffectivePower"
              type="number"
              placeholder="请输入有效算力"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="算力产出" prop="powerType">
            <el-select
              v-model.number="goodsform.powerType"
              placeholder="请选择算力产出"
              style="width: 100%"
            >
              <el-option
                v-for="item in wallets"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="购买币种" prop="buyCoin">
            <el-select
             v-model.number="goodsform.buyCoin" 
              clearable
              placeholder="请选择购买币种"
              style="width: 100%"
            >
              <el-option
                v-for="item in wallets"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单价" label-width="120px" prop="unitPrice">
            <el-input
              v-model.number="goodsform.unitPrice"
              type="number"
              placeholder="请输入单价"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维护周期" prop="upholdDay">
            <el-input
              v-model.number="goodsform.upholdDay"
              type="number"
              placeholder="请输入维护周期"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维护价格" prop="upholdFee">
            <el-input
              v-model.number="goodsform.upholdFee"
              type="number"
              placeholder="请输入维护价格"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维护币种" label-width="120px" prop="upholdCoin">
            <el-select
              v-model.number="goodsform.upholdCoin" 
              clearable
              placeholder="请选择维护币种"
              style="width: 100%"
            >
              <el-option
                v-for="item in wallets"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="准备周期" prop="readyDay">
            <el-input
              v-model.number="goodsform.readyDay"
              type="number"
              placeholder="请输入准备周期"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有效期" prop="validityDay">
            <el-input
              v-model.number="goodsform.validityDay"
              type="number"
              placeholder="请输入有效期"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="库存数" label-width="120px" prop="stock">
            <el-input
              v-model.number="goodsform.stock"
              type="number"
              placeholder="请输入库存数"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="封装速度" prop="sealSpeed">
            <el-input
              v-model.number="goodsform.sealSpeed"
              type="number"
              placeholder="请输入封装速度"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Gas费" prop="gas">
            <el-input
              v-model.number="goodsform.gas"
              type="number"
              placeholder="请输入Gas费"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="质押" label-width="120px" prop="pledge">
            <el-input
              v-model.number="goodsform.pledge"
              type="number"
              placeholder="请输入质押"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开售时间" prop="onSaleTime">
            <el-date-picker
              v-model="goodsform.onSaleTime"
              style="width: 100%"
              type="datetime"
              clearable
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分币比例" prop="branch">
            <el-input
              v-model.number="goodsform.branch"
              type="number"
              placeholder="请输入比例"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排序" label-width="120px" prop="sort">
            <el-input
              v-model.number="goodsform.sort"
              type="number"
              placeholder="请输入排序"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="限制数量" prop="quota">
            <el-input
              v-model.number="goodsform.quota"
              type="number"
              placeholder="请输入数量"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="交付描述" prop="deliverDescribe">
            <el-input
              v-model="goodsform.deliverDescribe"
              type="number"
              placeholder="请输入交付描述"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
         <el-form-item label="产品说明" prop="content" class="vab-quill-content">
            <vab-quill
            v-model="goodsform.content"
            :min-height="200"
            
            ></vab-quill>
          </el-form-item>
        </el-col>
        <el-col :span="24">
         <el-form-item label="购买协议" prop="purchaseAgreement" class="vab-quill-content">
            <vab-quill
            v-model="goodsform.purchaseAgreement"
            :min-height="200"
            
            ></vab-quill>
          </el-form-item>
        </el-col>
        <el-col :span="24">
         <el-form-item label="风险提示" prop="riskTip" class="vab-quill-content">
            <vab-quill
            v-model="goodsform.riskTip"
            :min-height="200"
            
            ></vab-quill>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
   <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">发布</el-button>
    </div>
    </div>
</template>

<script>
import { GetCoinTypeList ,AddGoods} from '@/api/goods'
import vabQuill from '@/plugins/vabQuill'
export default {
    components: { vabQuill },
  data() {
    return {
        options: {
          theme: 'snow',
          bounds: document.body,
          debug: 'warn',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ color: [] }, { background: [] }],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ align: [] }],
              [{ direction: 'rtl' }],
              [{ font: [] }],
              ['clean'],
              ['link', 'image'],
            ],
          },
          placeholder: '内容...',
          readOnly: false,
      },
      product_type: [
        {
          label: '无',
          value: 0,
        },
        {
          label: '云算力',
          value: 20001,
        },
        {
          label: '满存算力',
          value: 20002,
        },
        {
          label: '封装独享矿机',
          value: 20003,
        },
        {
          label: '联合矿机',
          value: 20004,
        },
      ],
      radiaos: [
        {
          label: true,
          text: '启用',
        },
        {
          label: false,
          text: '禁用',
        },
      ],
      wallets:[],
      goodsform: {
          isEnable:true,
          onSaleTime:'',
          riskTip:'',
          purchaseAgreement:'',
          content:'',
          giveGoods:[]
      },
    
       rules: {
          isEnable: [{ required: true, trigger: 'blur', message: '请选择是否启用' }],
          title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
          label: [{ required: true, trigger: 'blur', message: '请输入标签' }],
          productType: [{ required: true, trigger: 'blur', message: '请选择产品' }],
          power: [{ required: true, trigger: 'blur', message: '请输入算力值' }],
          initialEffectivePower: [{ required: true, trigger: 'blur', message: '请输入初始有效算力' }],
          powerType: [{ required: true, trigger: 'blur', message: '请选择算力产出' }],
          buyCoin: [{ required: true, trigger: 'blur', message: '请选择币种' }],
          unitPrice: [{ required: true, trigger: 'blur', message: '请输入单价' }],
          upholdDay: [{ required: true, trigger: 'blur', message: '请输入维护周期' }],
          upholdFee: [{ required: true, trigger: 'blur', message: '请输入维护价格' }],
          upholdCoin: [{ required: true, trigger: 'blur', message: '请选择维护币种' }],
          readyDay: [{ required: true, trigger: 'blur', message: '请输入周期' }],
          validityDay: [{ required: true, trigger: 'blur', message: '请输入有效期' }],
          stock: [{ required: true, trigger: 'blur', message: '请输入库存数' }],
          sealSpeed: [{ required: true, trigger: 'blur', message: '请输入封装速度' }],
          gas: [{ required: true, trigger: 'blur', message: '请输入Gas费' }],
          pledge: [{ required: true, trigger: 'blur', message: '请输入质押' }],
          onSaleTime: [{ required: true, trigger: 'blur', message: '请选择时间' }],
          branch: [{ required: true, trigger: 'blur', message: '请输入分币比列' }],
          sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
          quota: [{ required: true, trigger: 'blur', message: '请输入限制数量' }],
        },
    }
  },
  created() {
        this.GetCoinType()
    },
    mounted() {
             document.documentElement.scrollTop = 0
    },
  methods: {
    save() {
       this.$refs['form'].validate(async (valid) => {
          if (valid) {
             this.goodsform.onSaleTime = new Date(this.goodsform.onSaleTime).getTime() / 1000
              const {code ,msg} = await AddGoods(this.goodsform)   
              if(code === 1 ){
                   this.$baseMessage(msg,'success')
                   this.$emit('getmisgoods')
                   this.$refs['form'].resetFields()
              }
          } else {
            for(let item in object) {
                    setTimeout(()=> {
                        this.$baseMessage(object[item][0].message,'error',1200)
                    },100)
            }
          }
        })
      
    },
    
    async GetCoinType() {
          const { data } = await GetCoinTypeList()
          this.wallets = data

          
      },
    
    
    
  },
}
</script>

<style lang="scss" scoped>
.dialog-footer{
   display: flex;
   justify-content:center;
   padding-right: 50px;
}

  .creategoods-container {
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
