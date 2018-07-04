<style lang="less">
.login-img{
  text-align: center;
  padding-top: 10%;
}
.am-form-group .iconfont{
  font-size: 20px;
}
.login-form input[type=text],.am-form input[type=password]{
  border:none;
  background-color: transparent;
  border-bottom:1px solid #eee;
  font-size: 1.4rem;
  padding:.8rem
}
.help{
  font-size:12px;
  position: absolute;
  left:1.8rem;
  bottom:-5px;
  bottom:-18px;
}
.footer{
  position:fixed;
  width: 100%;
  bottom: 5%;
  text-align: center;
  &::after{
    content: '';
    position: absolute;
    top:0;
    left: 0;
    right:0;
    border-top:1px dotted #eee;
  }
  .tip{
    width: 100%;
    color:#999;
    position: absolute;
    top:-9px;
    z-index: 1;
    >p {
      width: 120px;
      background: #fbf9fe;
      margin: 0 auto;
    }
  }
}
</style>

<template>
  <div>
    <div class="am-g">
      <div class="am-u-lg-6 am-u-md-8 am-u-sm-centered">
        <div class="login-img am-animation-slide-top">
          <div class="icon">
            <img src="../style/images/logo.png" width="80" />
          </div>
        </div>
        <br>
        <form class="am-form am-form-horizontal login-form" style="padding-top:2.2rem">
          <div class="am-form-group am-animation-slide-left">
            <label for="phone" class="am-u-sm-1 am-form-label am-text-l am-text-secondary am-text-center" style="padding-top:0;">
              <i class="iconfont icon-ipone"></i>
            </label>
            <div class="am-u-sm-11">
              <input v-validate="'required|phone'" :class="{'input': true, 'is-danger': errors.has('phone') }" name="phone" type="text" placeholder="请输入您的手机号码" autocomplete="off" v-model="phone">
              <span v-show="errors.has('phone')" class="help is-danger am-text-danger">
                {{ errors.first('phone') }}
              </span>
            </div>
          </div>
          <div class="am-form-group am-animation-slide-left">
            <label for="password" class="am-u-sm-1 am-form-label  am-text-l am-text-secondary am-text-center" style="padding-top:0;">
              <i class="iconfont icon-lock"></i>
            </label>
            <div class="am-u-sm-11">
              <input v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" type="password" placeholder="请输入您的密码" autocomplete="off" v-model="password">
              <span v-show="errors.has('password')" class="help is-danger am-text-danger">
                {{ errors.first('password') }}
              </span>
            </div>
          </div>
          <div class="am-form-group am-animation-slide-bottom" style="padding-top:3.2rem">
            <div class="am-u-sm-12">
              <button type="button" class="am-btn am-btn-success am-round am-btn-block am-btn-xl" @click="onsubmit"><i class="iconfont icon-login" style="padding-right:10px;"></i>登录</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="footer">
      <div class="tip am-text-xs">
        <p>注册账号请联系商务</p>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../common/api.js'
import { cookie } from 'vux'
const loginUrl = api.apiData.api + 'official/'
export default {
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    onsubmit () {
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(loginUrl + 'login', {
            loginname: this.phone,
            password: this.password
          }).then(({data}) => {
            if (data.code === 0) {
              let _token = data.data.rdSession
              console.log(cookie)
              cookie.set('token', _token, {
                path: '/official',
                expires: 300
              })
              // document.cookie = 'token=' + _token
              // api.setCookie('token', _token, 200000)
              this.$router.push({
                name: 'home'
              })
            } else {
              this.$vux.toast.text(data.msg)
              console.log('登陆失败')
            }
          })
        }
      })
    }
  }
}
</script>
