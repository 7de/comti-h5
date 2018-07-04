<style lang="less">
.wallet-title{
  overflow: hidden;
  margin: 0 auto;
  .iconfont{
    font-size: 50px;
    color: #999;
  }
}
.money{
  font-size:44px;
  em{
    font-weight: bold
  }
}
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells am-text-center am-padding" style="margin-top:0;">
      <div class="am-text-default am-inline">钱包</div>
    </div>
    <div class="am-text-center">
      <div class="wallet-title">
        <i class="iconfont icon-money2"></i>
        <!-- <p class="am-text-xs">我的钱包</p> -->
      </div>
      <div class="money am-text-danger">
          ￥<em class="">{{account}}</em>
      </div>
    </div>
    <div class="am-margin-horizontal am-margin-top-lg">
      <router-link to="/money-back" class="am-btn am-round am-btn-success am-btn-block">提现</router-link>
    </div>
  </div>
</template>
<script>
import api from '../common/api.js'
const Url = api.apiData.api + 'merchant/'
export default {
  data () {
    return {
      account: '0.00'
    }
  },
  created () {
    this.$http.get(Url + 'walletBalance').then(({data}) => {
      console.log(data)
      if (data.code === 0) {
        let _data = data.data
        this.account = _data.balance
        console.log(_data)
      } else {
        this.$vux.toast.text(data.msg)
      }
    })
  }
}
</script>
