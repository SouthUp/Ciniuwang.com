export default {
  getInfor: () => {
    let string = ``
    let id = getQueryVariable('id')
    if (!id) return string
    else string += `id=${id}`
    let type  = getQueryVariable('type')
    if (!type) return string
    else string += `&type=${type}`
    return string
  }
}

const getQueryVariable = variable => {
  var query = window.location.search.substring(1)
  var vars = query.split("&")
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=")
    if (pair[0] == variable) { return pair[1] }
  }
  return (false)
}