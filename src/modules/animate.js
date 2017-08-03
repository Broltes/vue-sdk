let lastTime = 0
const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback, element) {
  let currTime = Date.now()
  let timeToCall = Math.max(0, 16 - (currTime - lastTime))
  lastTime = currTime + timeToCall

  let id = setTimeout(function() {
    callback(lastTime)
  }, timeToCall)
  return id
}
// const cAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;

let running = {}
let counter = 1

export default {
  start(stepCallback, duration, easingMethod, root) {
    let id = counter++
    let percent = 0
    let start = Date.now()

    if (!root) {
      root = document.body
    }

    // This is the internal step method which is called every few milliseconds
    function step(virtual) {
      let now = Date.now()

      // Compute percent value
      if (duration) {
        percent = (now - start) / duration
        if (percent > 1) {
          percent = 1
        }
      }

      if (running[id]) {
        let easedPercent = easingMethod ? easingMethod(percent) : percent
        if (stepCallback(easedPercent) === false || percent === 1) {
          // Stop animation
          running[id] = null
        } else {
          // Step to next
          rAF(step, root)
        }
      }
    }

    // Mark as running
    running[id] = true
    rAF(step, root)
    return id
  },
  // Stops the given animation.
  stop(id) {
    running[id] = null
  },

  easeOutCubic (pos) {
    return (Math.pow((pos - 1), 3) + 1)
  },
  easeInOutCubic (pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3)
    }
    return 0.5 * (Math.pow((pos - 2), 3) + 2)
  }
}
