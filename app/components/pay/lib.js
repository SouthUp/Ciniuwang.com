var $ = require('jquery')
// const url = 'http://localhost:3000'
// const url = 'http://ciniu.leanapp.cn'
const url = 'http://stg-ciniu.leanapp.cn'

module.exports = {
  createTrade(sessionToken, state) {
    return new Promise((resolve, reject) => {
      let send_data = state
      $.ajax({
        type: 'POST',
        url: `${url}/pay/2`,
        headers: {'X-LC-Session': sessionToken},
        dataType: 'json',
        data: send_data,
        success: (res) => {
          resolve(res)
        },
        error: err => {
          console.log(err)
          reject(err)
        }
      })
    })
  },

  queryTrade(sessionToken, id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'get',
        url: `${url}/pay/trade?id=${id}` ,
        headers: {'X-LC-Session': sessionToken},
        success: res => resolve(res),
        error: err => reject(err)
      })

    })
    
  }
}