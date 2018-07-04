<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding-vertical" style="margin-top:0">
      <p class="am-text-default">今日完成订单：<em class="am-text-xl am-text-success">{{order}}</em></p>
    </div>
    <div class="weui-cells" v-if="orderData.length">
      <div class="weui-cell" v-for="item in orderData" :key="item.id">
        <div class="weui-cell__bd  am-text-xs ">
          <p>订单编号：{{item.orderNo}}</p>
          <p class="am-margin-top-xs">服务站点：{{item.siteName}}站</p>
          <p class="am-margin-top-xs">结算金额：<em class="am-text-danger am-text-sm">￥{{item.totalFee}}</em></p>
          <p class="am-margin-top-xs">充电时长：<em class="am-text-success am-text-sm">{{item.actChargerTime}}</em>小时</p>
          <p class="am-margin-top-xs">订单时间：{{item.startTime}}</p>
          <p class="am-margin-top-xs">结束时间：{{item.endTime}}</p>
        </div>
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
      orderTotal: '',
      pageNum: 1,
      pageSize: 3
    }
  },
  created () {
    this.$http.get(orderUrl + 'orderList?start=' + this.pageNum + '&size=' + this.pageSize).then(({data}) => {
      if (data.code === 0) {
        this.order = data.data.orderSum
        this.orderData = data.data.list
        this.orderTotal = data.dataCount
        console.log(data)
      } else {
        this.$vux.toast.text(data.msg)
      }
    })
  }
}
</script>
