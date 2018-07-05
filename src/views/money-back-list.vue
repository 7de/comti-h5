<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding-vertical" style="margin-top:0">
      <p class="am-text-default">提现记录</p>
    </div>
    <div class="weui-cells" v-if="backList.length" :style="'height:'+(screenHeight-93)+'px'">
      <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller">
        <div class="weui-cell" v-for="item in backList" :key="item.id">
          <div class="weui-cell__bd  am-text-xs">
            <p class="am-margin-top-xs">提现状态：{{item.bankStatus===10?'处理中':item.bankStatus===20?'已处理':'异常'}}</p>
            <p class="am-margin-top-xs">提现金额：<em class="am-text-sm">¥{{fotmatMoney(item.takeCashNum)}}</em></p>
            <p class="am-margin-top-xs">提现银行：{{item.bankDeposit}}</p>
            <p class="am-margin-top-xs">提现前余额：￥{{fotmatMoney(item.cashRemainderFront)}}</p>
            <p class="am-margin-top-xs">提现后余额：￥{{fotmatMoney(item.cashRemainderAfter)}}</p>
            <p class="am-margin-top-xs">提现时间：{{formatDate(item.startTime)}}</p>
            <p class="am-margin-top-xs">备注：{{item.remark ? item.remark : '无'}}</p>
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
import {formatDate} from '../common/date.js'
const Url = api.apiData.api + 'takeCash/'
export default {
  data () {
    return {
      backList: [],
      pageNum: 1,
      pageSize: 5,
      pageTotal: '',
      screenHeight: window.screen.availHeight
    }
  },
  created () {
    this.getDate(this.pageNum)
  },
  methods: {
    // 获取数据
    getDate (page) {
      this.$http.get(Url + 'findListInMobile?pageNum=' + page + '&pageSize=' + this.pageSize).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          if (page === 1) {
            this.backList = data.data
          } else {
            this.backList = this.backList.concat(data.data.list)
          }
          this.pageTotal = data.dataCount
        } else {
          this.$vux.toast.text(data.msg)
        }
      })
    },
    infinite (done) {
      let _len = this.backList.length
      if (_len < this.pageSize) {
        done(true)
      } else if (this.pageNum !== 1 && _len === this.pageTotal) {
        this.$refs.myscroller.finishInfinite(2)
      } else {
        console.log('下拉加载')
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
    },
    // 时间戳转时间
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    },
    // 金额转换
    fotmatMoney (str) {
      return api.fotmatMoney(str)
    }
  }
}
</script>
