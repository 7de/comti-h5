<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding-vertical" style="margin-top:0">
      <p class="am-text-default">今日完成订单：<em class="am-text-xl am-text-success">{{order}}</em></p>
    </div>
    <div class="weui-cells" v-if="orderData.length" style="height:450px;">
      <scroller :on-infinite="infinite" ref="myscroller">
        <div style="height: 1px;"></div>
        <div class="weui-cell" v-for="item in orderData" :key="item.id">
          <div class="weui-cell__bd  am-text-xs ">
            <p>订单编号：{{item.orderNo}}</p>
            <p class="am-margin-top-xs">服务站点：{{item.siteName}}站</p>
            <p class="am-margin-top-xs">结算金额：<em class="am-text-danger am-text-sm">￥{{item.totalFee}}</em></p>
            <p class="am-margin-top-xs">充电时长：<em class="am-text-success am-text-sm">{{item.actChargerTime >= 60 ? fotmatTime(item.actChargerTime) + '小时' :  item.actChargerTime + '分钟'}}</em></p>
            <p class="am-margin-top-xs">订单时间：{{item.startTime}}</p>
            <p class="am-margin-top-xs">结束时间：{{item.endTime}}</p>
          </div>
        </div>
      </scroller>
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
    this.getDate(this.pageNum)
  },
  methods: {
    // 获取数据
    getDate (page) {
      this.$http.get(orderUrl + 'orderList?start=' + page + '&size=' + this.pageSize).then(({data}) => {
        if (data.code === 0) {
          if (page === 1) {
            this.orderData = data.data.list   // 如果是想下滑动，刷新数据 就让items等于最新数据
          } else {
            this.orderData = this.orderData.concat(data.data.list) // 否则就把数据拼接
          }
          console.log(this.orderData)
          this.order = data.data.orderSum
          this.orderTotal = data.dataCount
          console.log(data)
        } else {
          this.$vux.toast.text(data.msg)
        }
      })
    },
    infinite (done) {
      let _len = this.orderData.length
      if (this.pageNum !== 1 && _len === this.orderTotal) {
        this.$refs.myscroller.resize()
        this.$refs.myscroller.finishInfinite(2)
        done()
      } else {
        console.log('下拉加载')
        this.pageNum++
        console.log(this.pageNum)
        this.getDate(this.pageNum)
        done()
        this.$refs.myscroller.finishInfinite(2)
      }
    },
    fotmatTime (str) {
      return api.fotmatTime(str)
    }
  }
}
</script>
