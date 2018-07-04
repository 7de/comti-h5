<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding-vertical" style="margin-top:0">
      <p class="am-text-default">总收益：<em class="am-text-xl am-text-danger">￥{{fee}}</em></p>
    </div>
    <div class="weui-cells" v-if="feeData.length">
      <div class="weui-cell" v-for="item in feeData" :key="item.id">
        <div class="weui-cell__bd  am-text-sm">
          <p>时间：{{item.dateText}}</p>
        </div>
        <div class="weui-cell__ft am-text-default am-text-danger">¥{{item.monthFee}}</div>
      </div>
    </div>
    <div class="am-padding-vertical am-text-xs am-text-center" style="color:#999" v-else>
      <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
import api from '../common/api.js'
const feeUrl = api.apiData.api + 'merchant/'
export default {
  data () {
    return {
      feeData: [],
      fee: '',
      pageNum: 1,
      pageSize: 12,
      lengthThreshold: 50, // 当滑动到距离低端50px时，更新数据
      timeThreshold: 300,
      promise: null
    }
  },
  created () {
    this.$http.get(feeUrl + 'earnTotalList?start=' + this.pageNum + '&size=' + this.pageSize).then(({data}) => {
      if (data.code === 0) {
        console.log(data)
        this.fee = data.dataCount
        this.feeData = data.data
        console.log(this.feeData)
      } else {
        this.$vux.toast.text(data.msg)
      }
    })
  },
  methods: {
  }
}
</script>
