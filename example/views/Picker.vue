<template>
  <router-view>
    <app-header withback>picker</app-header>
    <div class="app-body demo-picker">
      <picker :show="true" v-bind="single" @action="action" @cancel="cancel"></picker>
    </div>
  </router-view>
</template>

<script>
import { toast, picker, datePicker } from 'vue-sdk'
import Picker from 'vue-sdk/src/components/Picker'

export default {
  data() {
    return {
      single: {
        groups: [
          [2015, 2016],
          function([year]) {
            let months = Array.apply(null, Array(12)).map(function(item, index) {
              return {
                label: (index + 1) + '月',
                value: index + 1
              }
            })

            switch (year) {
              case 2015:
                return months.slice(4 - 1)
              default:
                return months
            }
          },
          function([year]) {
            switch (year) {
              case 2015:
                return Array.apply(null, Array(31)).map(function(item, index) {
                  return {
                    label: (index + 1) + '日',
                    value: index + 1
                  }
                })
              default:
                return []
            }
          }
        ]
      }
    }
  },
  methods: {
    action(value) {
      picker({
        groups: this.single.groups,
        defaultValue: value,
        action(value) {
          toast.show({ message: value })
        }
      })
    },
    cancel(data) {
      datePicker({
        start: new Date(1950, 4, 9),
        end: new Date(),
        defaultDate: new Date(),
        action(date) {
          toast.show({ message: date.toLocaleDateString() })
        }
      })
    }
  },
  components: {
    picker: Picker
  }
}
</script>

<style lang="scss">
.demo-picker {
  background-color: #666;

  .mask {
    display: none;
  }
}
</style>
