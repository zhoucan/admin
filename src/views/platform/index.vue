<template>
  <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="基础信息" name="basisinfo">
      <Basisinfo  :basisinfodata='basisinfodata'  :loading='loadingbasisinfo'/>
    </el-tab-pane>
    <el-tab-pane label="资产信息" name="assetsinfo">
      <Assetsinfo :assetsinfodata='assetsinfodata' :loading='loadingassetsinfo'/>
    </el-tab-pane>
    <el-tab-pane label="每日统计" name="dailystatistical">
      <Dailystatistical :dailystatisticaldata='dailystatisticaldata' :pages = 'page' :loading='loadingdailystatistical'/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Basisinfo  from './components/basisinfo'
import Assetsinfo  from './components/assetsinfo'
import Dailystatistical  from './components/dailystatistical'
import { GetBaseInfo,GetAssetInfo,GetReport } from '@/api/platform'
export default {
  components: { Basisinfo,Assetsinfo,Dailystatistical },
  data() {
    return {
      activeName: 'basisinfo',
      basisinfodata:[],
      assetsinfodata:[],
      dailystatisticaldata:[],
      loadingbasisinfo:true,
      loadingassetsinfo:true,
      loadingdailystatistical:true,
      queryform:{
          coin: 10001,
          current: 1,
          size: 10

      },
      page: {
        current:1,
        size:10,
        total:''
      }
    }
  },
  created() {
    
  },
  mounted() {
    this.GetBaseInfo()
    this.GetAssetInfo()
    this.GetReport()
    this.$bus.on("handleSizeChange", (data)=> {
       this.queryform.size = data 
       this.GetReport()
    });
    this.$bus.on("handleCurrentChange", (data)=> {
       this.queryform.current = data 
       this.GetReport()
    });

    this.$bus.on("GetReport", (data)=> {
       this.queryform.coin = data 
       this.GetReport()
    });
    
  },
  destroyed(){
    this.$bus.$off('handleSizeChange')
    this.$bus.$off('handleCurrentChange')
    this.$bus.$off('GetReport')
  },
  methods: {
    handleClick(tab, event) {},
     async GetBaseInfo() {
        this.loadingbasisinfo = true
        let { data } = await GetBaseInfo()
        this.basisinfodata.push(data)
        this.loadingbasisinfo = false
    },
    async GetAssetInfo() {
        this.loadingassetsinfo = true
        let { data } = await GetAssetInfo()
        this.assetsinfodata = data
        this.loadingassetsinfo = false
    },
    async GetReport() {
        this.loadingdailystatistical = true
         let { data } = await GetReport(this.queryform)
         this.page.total =  data.total
         this.dailystatisticaldata = data.records
         this.loadingdailystatistical = false
    }
  },
}
</script>

<style lang="scss" scoped>
.app-main-height  {
  padding:20px;
  min-height: calc( 100vh - 60px - 55px - 100px )!important;
}
</style>
