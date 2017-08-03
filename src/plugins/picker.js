import Vue from 'vue'
import Picker from '../components/Picker'
import { once } from '../modules/utils'

let getVM = once(function() {
  let $vm = new (Vue.extend(Picker))({
    el: document.createElement('div')
  })

  document.body.appendChild($vm.$el)

  return $vm
})

/**
 *
 * @param {Object} options
 * @param {Array} options.groups
 * @param {Function} action
 */
export default function(options, action) {
  let $vm = getVM()
  if (action) options.action = action

  Object.assign($vm, {
    defaultValue: null
  }, options, {
    show: 1,
    action(value) {
      $vm.show = 0
      options.action(value)
    },
    cancel() {
      $vm.show = 0
    }
  })
}
