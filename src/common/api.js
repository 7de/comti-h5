export default {
  apiData: {
    host: 'https://www.comtti.net/',
    api: 'https://www.comtti.net/merchant/'
  },
  setCookie (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    console.info(cname + '=' + cvalue + '; ' + expires)
    document.cookie = cname + '=' + cvalue + ';path=/;' + expires
    console.info(document.cookie)
  }
}
