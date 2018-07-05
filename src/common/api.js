export default {
  apiData: {
    host: 'https://b.comtti.net/',
    api: 'https://b.comtti.net/merchant/'
    // 本地测试
    /* host: 'http://localhost:8965/',
    api: 'http://localhost:8965/' */
  },
  // 金额把分转换元为单位
  fotmatMoney (str) {
    let _money = (str / 100).toFixed(2)
    return _money
  },
  // 分钟转换小时
  fotmatTime (str) {
    let _time = (str / 60).toFixed(2)
    return _time
  },
  setCookie (cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    const expires = 'expires=' + d.toGMTString()
    console.info(cname + '=' + cvalue + '; ' + expires)
    window.document.cookie = cname + '=' + cvalue + ';path=/;' + expires
    console.info(document.cookie)
  },
  getCookie (name) {
    let arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr === document.cookie.match(reg)) {
      return true
    // return (arr[2]);
    } else {
      return false
    }
  },
  delCookie (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  }
}
