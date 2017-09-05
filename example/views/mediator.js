let cache

function post(data) {
  cache = data
}

function fetch() {
  return cache
}

export default {
  post,
  fetch
}
