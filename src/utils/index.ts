/**
 * 将对象添加当作参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的对象
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: Record<string, string>): string {
  let parameters = ''
  let url = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters
  }
  return url
}

/**
 * 格式日期时间
 * */
export function formatDate(time: any, b = 'yyyy-MM-dd') {
  if (!arguments.length) {
    return ''
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^\d+$/.test(time)) {
        time = parseInt(time)
      } else {
        time = time.replace(/\-/gi, '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const c: Record<string, unknown> = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3)
  }
  if (/(y+)/.test(b)) {
    b = b.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const a in c) {
    if (new RegExp('(' + a + ')').test(b)) {
      b = b.replace(RegExp.$1, RegExp.$1.length === 1 ? String(c[a]) : ('00' + c[a]).substr(('' + c[a]).length))
    }
  }
  return b
}

/**
 * 按字符串获取对象内的对应的值
 * getObjectValue({}, 'a.b[0].c')
 * **/
export function getObjectValue(object: any, prop: string) {
  const arr = prop.replace(/]/g, '').replace(/\[/g, '.').split('.')
  const len = arr.length
  let current = object
  for (let i = 0; i < len; i++) {
    // 防止空数据处理
    if (current[arr[i]] === undefined) {
      return undefined
    }
    current = current[arr[i]]
  }
  return current
}

/**
 * 当前时间日期选择器特有的选项
 * **/
export function formatPickerOptions(type: number) {
  const now = new Date()
  const start = new Date()
  switch (type) {
    case 2:
      start.setDate(start.getDate() - 1)
      return [start, start]
    case 3:
      start.setDate(start.getDate() - 7)
      return [start, now]
    case 4:
      start.setDate(start.getDate() - 30)
      return [start, now]
    case 5:
      start.setDate(start.getDate() - 60)
      return [start, now]
    case 6:
      start.setDate(start.getDate() - 90)
      return [start, now]
    default:
      return [now, now]
  }
}

/**
 * 小数点后补多位0   ==>  12.00000000 || 12.12340000
 * */
export function formatZero(number = 0, n = 2) {
  if (n <= 0) {
    return Math.round(number)
  }
  number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n) // 四舍五入
  return Number(number).toFixed(n) // 补足位数
}

// 数据格式化保留小数点   ==>  12,345.12 || 12345.12
export function formatNumber(value = 0, precision = 2, type = false) {
  const multiple = Math.pow(10, precision)
  if (type) {
    return (Math.round(value * multiple) / multiple).toLocaleString()
  } else {
    return Math.round(value * multiple) / multiple
  }
}
/**
 * 添加cdn图片优化参数 ?x-oss-process=image/quality,q_75/format,webp
 * @param {string} url 图片地址
 * @param {number} w 尺寸
 * @param {number} q 质量
 * */
export function formatCdn(url: string, w = 300, q = 85, format?: string) {
  const pixelRatio = window.devicePixelRatio || 2
  const oss = ['?x-oss-process=image']

  if (!/\?/gi.test(url)) {
    // 宽度处理
    if (pixelRatio === 2) {
      oss.push(`resize,w_${w}`)
      oss.push(`quality,q_${q}`)
    } else if (pixelRatio <= 1) {
      oss.push(`resize,w_${formatNumber(w / 2, 0)}`)
      oss.push(`quality,q_${formatNumber(q * 1.1, 0)}`)
    } else if (pixelRatio > 2) {
      oss.push(`resize,w_${formatNumber(w * 1.5, 0)}`)
      oss.push('quality,q_75')
    } else {
      oss.push('quality,q_75')
    }

    // 图片格式
    if (/.gif$/gi.test(url)) {
      oss.push('format,gif')
    } else {
      if (format) {
        oss.push(format)
      } else {
        oss.push('format,webp')
      }
    }
    return [url, oss.join('/')].join('')
  } else {
    return url
  }
}

/**
 * 删除JSON对象中的空值对象
 * JSON.stringify(obj, replacer)
 * */
export function replacer(key: any, value: any) {
  if (value === null || value === '') {
    return undefined // never return null or empty strings in our JSON
  }
  if (Array.isArray(value)) {
    return value.filter((v) => ![undefined, null, ''].includes(v))
  }
  return value
}

// 计算中英文字数
export function formatWordCount(value: string | number) {
  let count = 0
  if (value) {
    const content = String(value || '')
    for (let a = content.length, n = -1, r = 0; r < a; r++) {
      n = content.charCodeAt(r)
      count += n >= 0 && n <= 128 ? 0.5 : 1
    }
  }
  return Math.ceil(count)
}

/**
 * css对象格式为行间css
 * **/
export function formatStyle(object: any) {
  const style: Record<string, any> = {}
  for (const key in object) {
    switch (key) {
      case 'marginBottom':
        style['margin-bottom'] = /^(\-|\+)?\d+$/.test(<string>object[key]) ? `${object[key]}px` : object[key]
        break
      case 'fontSize':
        style['font-size'] = /^(\-|\+)?\d+$/.test(<string>object[key]) ? `${object[key]}px` : object[key]
        break
      case 'backgroundColor':
        style['background-color'] = object[key]
        break
      case 'textAlign':
        style['text-align'] = object[key]
        break
      case 'color':
        style['color'] = object[key]
        break
      case 'fontWeight':
        style['font-weight'] = object[key]
        break
    }
  }
  return style
}
