<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding-vertical" style="margin-top:0">
      <p class="am-text-default">提现记录</p>
    </div>
    <div class="weui-cells" v-if="backList.length">
      <div class="weui-cell" v-for="item in backList" :key="item.id">
        <div class="weui-cell__bd  am-text-xs">
          <p>提现金额：<em class="am-text-sm">¥{{fotmatMoney(item.takeCashNum)}}</em></p>
          <p class="am-margin-top-xs">提现银行：{{item.bankDeposit}}</p>
          <p class="am-margin-top-xs">提现前金额：￥{{fotmatMoney(item.cashRemainderFront)}}</p>
          <p class="am-margin-top-xs">提现后金额：￥{{fotmatMoney(item.cashRemainderAfter)}}</p>
          <p class="am-margin-top-xs">提现时间：{{formatDate(item.startTime)}}</p>
          <p class="am-margin-top-xs">备注：{{item.remark ? item.remark : '无'}}</p>
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
import {formatDate} from '../common/date.js'
const Url = api.apiData.host + 'takeCash/'
export default {
  data () {
    return {
      backList: [],
      pageNum: 1,
      pageSize: 5
    }
  },
  created () {
    this.$http.get(Url + 'findListInMobile?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize).then(({data}) => {
      if (data.code === 0) {
        this.backList = data.data
        console.log(data)
      } else {
        this.$vux.toast.text(data.msg)
      }
    })
  },
  methods: {
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
