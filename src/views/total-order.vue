<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding-vertical" style="margin-top:0">
      <p class="am-text-default">总订单：<em class="am-text-xl am-text-success">{{order}}</em></p>
    </div>
    <div class="weui-cells" v-if="orderData.length">
      <div class="weui-cell" v-for="item in orderData" :key="item.id">
        <div class="weui-cell__bd  am-text-sm">
          <p>时间：{{item.dateText}}</p>
        </div>
        <div class="weui-cell__ft am-text-default am-text-success">{{item.orderSum}}</div>
      </div>
    </div>
    <div class="am-padding-vertical am-text-xs am-text-center" style="color:#999" v-else>
      <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
import api from '../common/api.js'
const orderUrl = api.apiData.api + 'merchant/'
export default {
  data () {
    return {
      orderData: [],
      order: '',
      pageNum: 1,
      pageSize: 12
    }
  },
  created () {
    this.$http.get(orderUrl + 'orderTotalList?start=' + this.pageNum + '&size=' + this.pageSize).then(({data}) => {
      if (data.code === 0) {
        this.order = data.dataCount
        this.orderData = data.data
        console.log(data)
      } else {
        this.$vux.toast.text(data.msg)
      }
    })
  }
}
</script>
