import { handleFun } from '@/utils'
import { onMounted, ref, watch, watchEffect } from 'vue'

/**
 * 装修组件的基础数据处理
 */
export function domData(props: any) {
  let dom = props.domData
  let styleData = ref()
  let staticData = ref()

  watchEffect(() => {
    staticData.value = dom.staticData
    updateAnimation(props.animation)
  })

  // 点击事件callback
  function handle() {
    handleFun(staticData.value)
  }
  // 刷新动画
  function updateAnimation(status) {
    if (status) {
      styleData.value = { ...dom.cssModule, ...dom.animation }
    } else {
      styleData.value = { ...dom.cssModule }
    }
  }
  return {
    styleData,
    staticData,
    handle,
  }
}
