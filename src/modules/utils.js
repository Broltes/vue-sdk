function once(fn) {
  let result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
}

export {
  once
}
