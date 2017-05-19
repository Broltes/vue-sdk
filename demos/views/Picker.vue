<template>
  <app-view>
    <app-header withback>picker</app-header>
    <div class="app-body demo-picker">
      <picker :show="true" v-bind="single"></picker>
    </div>
  </app-view>
</template>

<script>
import { toast, picker, datePicker } from 'vue-sdk';
import Picker from 'vue-sdk/src/components/Picker';

export default {
  data() {
    return {
      single: {
        groups: [
          [2015, 2016],
          function(values) {
            let months = Array.apply(null, Array(12)).map(function(item, index) {
              return {
                label: (index + 1) + '月',
                value: index + 1
              }
            });

            switch (values[0]) {
              case 2015:
                return months.slice(4 - 1);
              default:
                return months;
            }
          },
          function() {
            return []
          }
        ],
        action: value => {
          picker({
            groups: this.single.groups,
            defaultValue: value,
            action(value) {
              toast.show({ message: value });
            }
          });
        },
        cancel() {
          datePicker({
            start: new Date(1950, 4, 9),
            end: new Date(),
            defaultDate: new Date(),
            action(date) {
              toast.show({ message: date.toLocaleDateString() });
            }
          });
        }
      }
    }
  },
  methods: {
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
