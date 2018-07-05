<style lang="less">
.money-form input[type=number]{
  border:none;
  border-bottom:1px solid #eee;
  font-size: 1.4rem;
  padding: .8rem .5rem
}
</style>
<template>
  <div class="page">
    <div class="weui-cells am-text-center am-padding am-nbfc" style="margin-top:0;">
      <div class="am-text-default am-inline">提现</div>
      <router-link to="/money-back-list" class="am-fr am-text-sm">提现记录</router-link>
    </div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd am-text-xs">
          <!-- <p class="am-text-sm">到账银行卡</p> -->
          <p class="am-margin-top-xs"><em style="color:#666">开户银行：</em>{{monayData.bankDeposit}}</p>
          <p class="am-margin-top-xs"><em style="color:#666">银行账号：</em>{{monayData.bankAccount}}</p>
          <p class="am-margin-top-xs" style="color:#999">3个工作日内到账</p>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd am-form money-form">
          <div class="am-form-group am-nbfc am-text-xxl">
            <div class="am-u-sm-2 am-text-warning">￥</div>
            <div  class="am-u-sm-10 am-text-xs">
              <input type="number" class="am-text-warning" placeholder="请输入金额" v-model="money">
            </div>
          </div>
          <div class="am-padding-left am-text-xs" style="color:#999">
            <p>零钱余额<em class="am-text-sm">¥{{monayData.balance}}</em>，<em class="am-text-success" @click="getBalance">全部提现</em></p>
          </div>
        </div>
      </div>
    </div>
    <div class="am-margin-horizontal am-margin-top-lg">
      <button type="button" class="am-btn am-btn-success am-round am-btn-block am-btn-l" @click="onsubmit">提现</button>
    </div>
    <actionsheet v-model="showAction" :menus="showInfo" @on-click-menu-queren="showTip">
      <p slot="header">
        <span style="color:#666;font-size:14px;">是否继续提现？</span>
      </p>
    </actionsheet>
  </div>
</template>
<script>
import api from '../common/api.js'
const Url = api.apiData.api + 'merchant/'
const moneyUrl = api.apiData.api + 'takeCash/'
export default {
  data () {
    return {
      monayData: {},
      money: '',
      showAction: false,
      showInfo: {
        'queren': '确定'
      }
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    // 获取全部余额
    getBalance () {
      this.money = this.monayData.balance
    },
    // 提现
    onsubmit () {
      if (!this.money || parseFloat(this.money) === 0) {
        this.$vux.toast.text('请输入金额')
        this.money = ''
      } else if (this.money > this.monayData.balance) {
        this.$vux.toast.text('您输入的金额大于余额，请重新输入')
      } else {
        this.showAction = true
      }
    },
    getInfo () {
      this.$http.get(Url + 'walletBalance').then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.monayData = data.data
        } else {
          this.$vux.toast.text(data.msg)
        }
      })
    },
    showTip () {
      this.$http.post(moneyUrl + 'build', {
        takeCashNum: this.money * 100
      }).then(({data}) => {
        if (data.code === 0) {
          this.$vux.toast.text('提现成功')
          this.money = ''
          this.getInfo()
        } else {
          this.$vux.toast.text(data.msg)
        }
      })
    }
  }
}
</script>
