<template>
  <popup :show="show" :maskClick="maskClick">
    <div class="picker">
      <div class="picker-hd">
        <a class="picker-action" @click="maskClick">取消</a>
        <a class="picker-action" @click="confirm">确定</a>
      </div>
      <div class="picker-bd">
        <scroller class="picker-group" v-for="(group, groupIndex) in computedGroups"
          :indicator="indicator"
          :indicatorIndex="valueIndexes[groupIndex]"
          :key="groupIndex"
          @change="change(groupIndex, ...arguments)">
          <div class="picker-mask" slot="header"></div>
          <div class="picker-indicator" slot="header"></div>
          <div class="picker-list">
            <div class="picker-item"
              v-for="(item, index) in group" :key="index">
              {{item.label || item}}
            </div>
          </div>
        </scroller>
      </div>
    </div>
  </popup>
</template>

<script>
import Scroller from './Scroller'

function getItemValue(item) {
  return item.value === undefined ? item : item.value
}
function computeGroup(group, value) {
  return typeof group === 'function' ? group(value) : group
}

export default {
  props: {
    show: {},
    groups: {
      type: Array,
      default: function () {
        return [['']]// Pass a empty group for indicator precomputing
      }
    },
    defaultValue: Array,
    action: Function,
    cancel: Function
  },
  data() {
    return {
      indicator: [],
      value: [],
      valueIndexes: [],
      computedGroups: []
    }
  },
  methods: {
    // cancel not ready when init plugin
    maskClick() {
      this.cancel()
    },
    change(groupIndex, itemIndex) {
      let selectedItem = this.computedGroups[groupIndex][itemIndex]
      this.valueIndexes[groupIndex] = itemIndex
      this.select(groupIndex, getItemValue(selectedItem))
    },
    select(startGroupIndex, itemValue) {
      let computedGroups = this.computedGroups.slice(0, startGroupIndex)
      let value = this.value.slice(0, startGroupIndex)

      // recompute the changed group and it's child groups
      for (let groupIndex = startGroupIndex; groupIndex < this.groups.length; groupIndex++) {
        let group = computeGroup(this.groups[groupIndex], value)

        // skip useless group
        if (!group || !group[0]) continue

        computedGroups.push(group)
        if (groupIndex === startGroupIndex) {
          value.push(itemValue)
        } else {
          // Get the last index of group.
          let itemIndex = this.valueIndexes[groupIndex]
          if (itemIndex >= group.length) {
            // Child group's index was exceeded after parent changed,
            // reset group value to the last item's value.
            itemIndex = group.length - 1
            this.valueIndexes[groupIndex] = itemIndex
          }
          let item = group[itemIndex]

          value.push(getItemValue(item))
        }
      }

      this.value = value
      this.computedGroups = computedGroups
    },
    confirm() {
      // return cleaned array
      this.action(this.value.slice())
    },
    init() {
      this.value = this.defaultValue || []

      this.groups.forEach((group, groupIndex) => {
        group = computeGroup(group, this.value)

        if (group && group[0]) {
          if (this.defaultValue) {
            // compute valueIndexes for defaultValue
            group.some((item, itemIndex) => {
              if (getItemValue(item) === this.defaultValue[groupIndex]) {
                this.valueIndexes[groupIndex] = itemIndex
                // finish some loop
                return true
              }
            })
          } else {
            // If defaultValue was omitted, we use 0 for default.
            this.value[groupIndex] = getItemValue(group[0])
            this.valueIndexes[groupIndex] = 0
          }
        }
      })

      this.select(0, this.value[0])
    }
  },
  components: {
    scroller: Scroller
  },
  mounted() {
    this.init()
    this.$nextTick(() => {
      let $indicator = this.$el.getElementsByClassName('picker-indicator')[0]
      if ($indicator) {
        let { offsetTop, clientHeight } = $indicator
        this.indicator = [offsetTop - 1, offsetTop + clientHeight + 1]
      }
    })

    // watch groups and defaultValue
    this.$watch(function() {
      return [this.groups, this.defaultValue]
    }, this.init)
  }
}
</script>
