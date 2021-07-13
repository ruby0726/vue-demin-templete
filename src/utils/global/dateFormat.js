export function dateFormat(val, str) {
  var date = new Date(val)
  console.log(date, 'date');
  if (!date.getTime()) return
  var format = str || 'yyyy-MM-dd'
  switch (str) {
    case 'medium':
      format = 'yyyy-MM-dd hh:mm:ss'
      break
    case 'short':
      format = 'yyyy-M-d h:mm:ss'
      break
  }

  var o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}
