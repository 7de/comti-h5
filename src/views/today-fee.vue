<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding-vertical" style="margin-top:0">
      <p class="am-text-default">今日收益：<em class="am-text-xl am-text-danger">￥{{fee}}</em></p>
    </div>
    <div class="weui-cells" v-if="feeData.length" :style="'height:'+(screenHeight-93)+'px'">
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
      pageSize: 7,
      screenHeight: window.screen.availHeight
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
          if (page === 1) {
            this.feeData = data.data.list   // 如果是想下滑动，刷新数据 就让items等于最新数据
          } else {
            this.feeData = this.feeData.concat(data.data.list) // 否则就把数据拼接
          }
          this.fee = data.data.totalFee
          this.feeTotal = data.dataCount
        } else {
          this.$vux.toast.text(data.msg)
        }
      })
    },
    infinite (done) {
      let _len = this.feeData.length
      if (_len < this.pageSize) {
        done(true)
      } else if (this.pageNum !== 1 && _len === this.feeTotal) {
        this.$refs.my_scroller.finishInfinite(2)
      } else {
        setTimeout(() => {
          this.pageNum++
          this.getDate(this.pageNum)
          done()
        }, 1500)
      }
    },
    refresh (done) { // 这是向下滑动的时候请求最新的数据
      setTimeout(() => {
        this.pageNum = 0
        this.getDate(this.pageNum + 1)
        done()
      }, 1500)
    }
  }
}
</script>
