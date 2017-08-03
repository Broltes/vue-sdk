import picker from './picker'

/**
 * @param {Object} options
 * @param {Date} options.start
 * @param {Date} options.end
 * @param {Date} options.defaultValue
 * @param {Function} action
 */
export default function(options, action) {
  const startYear = options.start.getFullYear()
  const startMonth = options.start.getMonth()
  const startDay = options.start.getDate()
  const endYear = options.end.getFullYear()
  const endMonth = options.end.getMonth()
  const endDay = options.end.getDate()

  if (action) options.action = action

  // compute years
  const years = []
  for (let y = startYear; y <= endYear; y++) {
    years.push({
      label: y + '年',
      value: y
    })
  }

  // enumerate moths
  const months = Array.apply(null, Array(12)).map(function(item, index) {
    return {
      label: (index + 1) + '月',
      // months start from 0
      value: index
    }
  })

  // enumerate day
  const days = Array.apply(null, Array(31)).map(function(item, index) {
    return {
      label: (index + 1) + '日',
      value: index + 1
    }
  })

  // Parse defaultDate to picker array
  let defaultValue
  let { defaultDate } = options
  if (defaultDate) {
    defaultValue = [defaultDate.getFullYear(), defaultDate.getMonth(), defaultDate.getDate()]
  }

  picker({
    groups: [
      years,
      // month maker
      function([year]) {
        if (year === startYear) return months.slice(startMonth - 1)
        if (year === endYear) return months.slice(0, endMonth + 1)

        return months
      },
      // day maker
      function([year, month]) {
        // how many days in the month
        let monthDays = days.slice(0, new Date(year, month + 1, 0).getDate())

        if (year === startYear && month === startMonth) return monthDays.slice(startDay - 1)
        if (year === endYear && month === endMonth) return monthDays.slice(0, endDay)

        return monthDays
      }
    ],
    defaultValue,
    action(value) {
      options.action(new Date(...value), value)
    }
  })
}
