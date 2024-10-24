/**
 *
 * @description 时间格式化
 * @param {Date} date
 * @param {string} [format='yyyy-MM-dd HH:mm:ss' ] 时间格式
 * @return {*}  {string}1211
 */
export const formatDate = (date: Date, format = 'yyyy-MM-dd HH:mm:ss'): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const formatMap: { [key: string]: any } = {
    yyyy: year.toString(),
    MM: month.toString().padStart(2, '0'),
    dd: day.toString().padStart(2, '0'),
    HH: hour.toString().padStart(2, '0'),
    mm: minute.toString().padStart(2, '0'),
    ss: second.toString().padStart(2, '0')
  }
  console.log(formatMap, 'map')
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (match) => formatMap[match])
}
