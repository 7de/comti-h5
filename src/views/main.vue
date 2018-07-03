<style lang="less">
.border-radius{
  border-radius: 12px;
}
</style>
<template>
  <div class="page am-animation-slide-left">
    <div class="weui-cells" style="margin-top:0">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <img src="../style/images/img.jpg" width="70" height="70" class="am-img-thumbnail am-circle"/>
        </div>
        <div class="weui-cell__bd">
          <p>{{userName}}</p>
          <p class="am-text-xs">{{merchantName}}</p>
        </div>
      </div>
    </div>
    <div class="weui-flex am-margin-horizontal am-margin-top am-text-center">
      <router-link to="/today-fee" class="weui-flex__item border-radius" style="padding:10px 0;background-color:#f26522;color:#fff;">
        <p class="font-size-14">今日收益</p>
        <div class="placeholder font-size-24"><b>¥{{todayFee?todayFee:'0.00'}}</b></div>
      </router-link>
      <router-link to="/total-fee" class="weui-flex__item border-radius" style="margin-left: 15px;padding:10px 0;background-color:#f3715c;color:#fff;">
        <p class="font-size-14">总收益</p>
        <div class="placeholder font-size-24"><b>¥{{totalFee?totalFee:'0.00'}}</b></div>
      </router-link>
    </div>
    <div class="weui-flex am-margin-horizontal am-margin-top am-text-center">
      <router-link to="/today-order" class="weui-flex__item bg-white border-radius" style="padding:10px 0;background-color:#7fb80e;color:#fff;">
        <p class="font-size-14">今日完成订单</p>
        <div class="placeholder font-size-24"><b>{{todayOrderSum?todayOrderSum:0}}</b></div>
      </router-link>
      <router-link to="/total-order" class="weui-flex__item border-radius" style="margin-left: 15px;padding:10px 0; background-color:#585eaa;color:#fff;">
        <p class="font-size-14">总订单</p>
        <div class="placeholder font-size-24"><b>{{totalOrderSum?totalOrderSum:0}}</b></div>
      </router-link>
    </div>
    <div class="weui-cells">
      <router-link to="/money-back" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <i class="iconfont icon-tixian am-text-secondary"></i>
          <span>提现</span>
        </div>
        <div class="weui-cell__ft am-text-xs zan-c-gray-dark">收益提现发起</div>
      </router-link>
      <router-link to="/money" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <i class="iconfont icon-money2 am-text-secondary"></i>
          <span>钱包</span>
        </div>
        <div class="weui-cell__ft am-text-xs zan-c-gray-dark">查看收益明细</div>
      </router-link>
    </div>
  </div>
</template>
<script>
// import api from '../common/api.js'
import { cookie } from 'vux'
// import {post} from '../common/http.js'
// const apiUrl = api.apiData.api + 'merchant/'
const apiUrl = 'http://192.168.1.118:8965/merchant/'
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
    // console.log('首页' + cookie.get('token'))
    console.info(document.cookie)
    this.$http.get(apiUrl + 'home').then(({data}) => {
      if (data.code === 0) {
        let _data = data.data
        this.userName = _data.userName
        this.merchantName = _data.merchantName
        this.todayFee = _data.todayFee
        this.totalFee = _data.totalFee
        this.todayOrderSum = _data.todayOrderSum
        this.totalOrderSum = _data.totalOrderSum
      } else {
        this.$vux.toast.text(data.msg)
      }
    })
  }
}
</script>
