/**
 * HTTP client for ajax, like vue-resource, but smaller and stand alone
 * @param {Object} options
 * @param {Function} options.onerror especially for network error
 * @param {Function} options.onfail for server error
 */
export default ({
  type,
  url,
  data,
  headers = {},
  withCredentials = false,

  timeout,
  ontimeout,
  onerror,
  onfail
}) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()

    type = type.toUpperCase()

    req.open(type, url, true)
    req.timeout = timeout
    req.withCredentials = withCredentials

    for (let key in headers) {
      req.setRequestHeader(key, headers[key])
    }

    function rejectWith(fn) {
      return function() {
        fn(req)
        reject(req)
      }
    }

    // network error
    req.onerror = rejectWith(onerror)

    // timeout error
    req.ontimeout = rejectWith(ontimeout)

    // xhr.readystate = 4
    req.onload = function() {
      // success
      if (req.status < 400) resolve(req)
      // server error
      else rejectWith(onfail)()
    }

    req.send(data)
  }).then(req => {
    // resolve result
    let result = req.responseText

    if (/json/.test(req.getResponseHeader('Content-Type'))) {
      result = JSON.parse(req.responseText || null)
    }

    return result
  })
}
