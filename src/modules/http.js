/**
 * HTTP client for ajax, like vue-resource, but smaller and stand alone
 * @param {Object} options
 * @param {Function} options.onerror especially for network error
 */
export default ({
  type,
  url,
  data,
  headers = {},
  withCredentials = false,

  timeout,
  ontimeout,
  onerror
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

    // xhr.readyState = 4
    req.onload = function() {
      resolve(req)
    }

    req.send(data)
  }).then(req => {
    if (/json/.test(req.getResponseHeader('Content-Type'))) {
      req.data = JSON.parse(req.responseText || null)
    }

    return req
  })
}
