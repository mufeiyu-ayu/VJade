/**
 * 格式化日期
 *
 * @param date - 要格式化的日期对象
 * @param format - 目标格式的字符串，支持 yyyy, MM, dd, HH, mm, ss
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date, format = 'yyyy-MM-dd HH:mm:ss'): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const formatMap: { [key: string]: string } = {
    yyyy: year.toString(),
    MM: month.toString().padStart(2, '0'),
    dd: day.toString().padStart(2, '0'),
    HH: hour.toString().padStart(2, '0'),
    mm: minute.toString().padStart(2, '0'),
    ss: second.toString().padStart(2, '0'),
  }

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, match => formatMap[match])
}
