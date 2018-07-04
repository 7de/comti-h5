<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/css/weui.min.css';
@import './style/css/amazeui.min.css';
@import './style/fonts/font.css';

body {
  background-color: #fbf9fe;
}
i,em{
  font-style: normal;
}
p{
  margin: 0
}
input,button{
  outline:none;
}
</style>
