<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding-vertical" style="margin-top:0">
      <p class="am-text-default">今日收益：<em class="am-text-xl am-text-danger">￥{{fee}}</em></p>
    </div>
    <div class="weui-cells" v-if="feeData.length" style="height:450px;">
      <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller">
        <div class="weui-cell" v-for="item in feeData" :key="item.id">
          <div class="weui-cell__bd  am-text-sm">
            <p>服务内容：{{item.serviceContent}}</p>
            <p class="am-margin-top-xs">服务时间：{{item.startTime}}</p>
          </div>
          <div class="weui-cell__ft am-text-default am-text-danger">¥{{item.totalFee}}</div>
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
    this.getDate(this.pageNum)
  },
  methods: {
    // 获取数据
    getDate (page) {
      this.$http.get(feeUrl + 'earnList?start=' + page + '&size=' + this.pageSize).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          /* const _len = data.data.list.length
          if (_len < this.pageSize) {
            this.pageNum = 1
            fn(true)
            return
          } else {
            if (fn) fn()
          } */
          if (page === 1) {
            this.feeData = data.data.list   // 如果是想下滑动，刷新数据 就让items等于最新数据
          } else {
            this.feeData = this.feeData.concat(data.data.list) // 否则就把数据拼接
          }
          console.log(this.feeData)
          this.fee = data.data.totalFee
          this.feeTotal = data.dataCount
        } else {
          this.$vux.toast.text(data.msg)
        }
      })
    },
    infinite (done) {
      let _len = this.feeData.length
      if (this.pageNum !== 1 && _len === this.feeTotal) {
        // this.$vux.toast.text('没有更多数据')
        // this.$refs.myscroller.resize();
        this.$refs.my_scroller.resize()
        this.$refs.my_scroller.finishInfinite(2)
      } else {
        console.log('下拉加载')
        this.pageNum++
        this.getDate(this.pageNum)
        this.$refs.my_scroller.finishInfinite(2)
      }
      /* this.pageNum++
      this.getDate(this.pageNum) */
    },
    refresh (done) { // 这是向下滑动的时候请求最新的数据
      this.pageNum = 1
      this.getDate(this.pageNum)
      console.log(done())
    }
  }
}
</script>
