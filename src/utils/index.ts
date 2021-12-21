/**
 * clone对象
 * @param obj
 * @returns
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 当前css数据是否需要增加单位
 * @param name css属性名称
 * @returns
 */
export function cssTopx(name) {
  return [
    'width',
    'height',
    'x',
    'y',
    'top',
    'left',
    'border-width',
    'font-size',
    'border-radius',
    'margin-top',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'padding-top',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'grid-row-gap',
    'grid-column-gap',
  ].includes(name)
}

/**
 * 格式化
 */
export function resetCss(data: Object): any {
  const cssData = {}
  for (const key in data) {
    if (cssTopx(key) && !String(data[key]).includes('%')) {
      cssData[key] = `${data[key] / 32}rem`
    } else {
      cssData[key] = data[key]
    }
  }
  return cssData
}

export function animationFun(animation: any[]) {
  let animationToDom1 = animation.reduce((item, data, index) => {
    let datas = deepClone(data)
    datas.animationName = datas.animationName.split('_')[1]
    datas.animationDuration = String(datas.animationDuration + 'ms')
    datas.animationDelay = String(datas.animationDelay + 'ms')
    if (index != 0) {
      item += ','
    }
    let animaText = `${datas.animationName} ${datas.animationDuration} ease-in ${datas.animationDelay} ${datas.animationIterationCount} normal ${datas.animationFillMode}`
    item += animaText
    return item
  }, '')
  return {
    animation: animationToDom1,
  }
}
