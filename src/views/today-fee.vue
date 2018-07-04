<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding-vertical" style="margin-top:0">
      <p class="am-text-default">今日收益：<em class="am-text-xl am-text-danger">￥{{fee}}</em></p>
    </div>
    <div class="weui-cells" v-if="feeData.length">
      <div class="weui-cell" v-for="item in feeData" :key="item.id">
        <div class="weui-cell__bd  am-text-sm">
          <p>服务内容：{{item.serviceContent}}</p>
          <p class="am-margin-top-xs">服务时间：{{item.startTime}}</p>
        </div>
        <div class="weui-cell__ft am-text-default am-text-danger">¥{{item.totalFee}}</div>
      </div>
    </div>
    <div class="am-padding-vertical am-text-xs am-text-center" style="color:#999" v-else>
      <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
import api from '../common/api.js'
// import { cookie } from 'vux'
const feeUrl = api.apiData.api + 'merchant/'
export default {
  data () {
    return {
      feeData: [],
      fee: '',
      feeTotal: '',
      pageNum: 1,
      pageSize: 7
    }
  },
  created () {
    this.$http.get(feeUrl + 'earnList?start=' + this.pageNum + '&size=' + this.pageSize).then(({data}) => {
      if (data.code === 0) {
        this.feeTotal = data.dataCount
        this.feeData = data.data.list
        this.fee = data.data.totalFee
        console.log(data)
      } else {
        this.$vux.toast.text(data.msg)
      }
    })
  }
}
</script>
