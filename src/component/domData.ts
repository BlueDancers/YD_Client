import { ref } from 'vue'

/**
 * 装修组件的基础数据处理
 */
export function domData(props: any) {
  let styleData = ref()
  let staticData = ref()
  styleData.value = { ...props.cssModule, ...props.animation }
  staticData.value = props.staticData
  return {
    styleData,
    staticData,
  }
}
