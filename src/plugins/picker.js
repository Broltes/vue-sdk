import Vue from 'vue'
import Picker from '../components/Picker'
import { utils } from 'wdk'

let getVM = utils.once(function() {
  let $vm = new (Vue.extend(Picker))({
    el: document.createElement('div')
  })

  $vm.$on('cancel', () => { $vm.show = 0 })

  document.body.appendChild($vm.$el)

  return $vm
})

/**
 *
 * @param {Object} options
 * @param {Array} options.groups
 * @param {Function} action Optional, can also be defined in options
 */
export default function(options, action) {
  let $vm = getVM()
  if (action) options.action = action

  $vm.$once('action', val => {
    $vm.show = 0
    options.action(val)
  })

  Object.assign($vm, {
    defaultValue: null
  }, options, {
    show: 1
  })
}
