<style lang="less">
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding am-nbfc" style="margin-top:0;">
      <div class="am-text-default am-inline">提现</div>
      <router-link to="/money-back-list" class="am-fr am-text-sm">提现记录</router-link>
    </div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd  am-text-xs ">
          <p>到账银行卡</p>
          <p class="am-margin-top-xs am-text-warning">平安银行：402556621455489932</p>
          <p class="am-margin-top-xs">结算金额：12.00元</p>
          <p class="am-margin-top-xs">3个工作日内到账</p>
          <p class="am-margin-top-sm">提现金额</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* import api from '../common/api.js'
import { cookie } from 'vux'
const apiUrl = api.apiData.api + 'merchant/' */
export default {
  data () {
    return {
      userName: '',
      merchantName: '',
      todayFee: '',
      totalFee: '',
      todayOrderSum: '',
      totalOrderSum: ''
    }
  },
  created () {
  }
}
</script>
