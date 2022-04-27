<template>
  <div>
    <div
      :style="{
        height: `${domData.height / 32.5}rem`,
        backgroundColor: domData.backColor,
      }"
    >
      <component v-for="item in domData.template" :key="item.id" :is="item.name" :domData="item"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { cloud } from '../../modules/request'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { animationFun, resetCss } from '../../utils/index'
import YImg from '../../component/YImg.vue'
import YP from '../../component/YP.vue'
import YButton from '../../component/YButton.vue'
import YDiv from '../../component/YDiv.vue'
import YInput from '../../component/YInput.vue'

export default defineComponent({
  components: {
    YImg,
    YP,
    YButton,
    YDiv,
    YInput,
  },
  setup() {
    const db = cloud.database()
    const route = useRoute()
    const domData: any = ref({})

    onMounted(async () => {
      console.log(route.params)
      // 首先通过 organCode 确认组织
      // 在通过 pageCode 确认页面
      // 获取组织id
      let parentData = await db
        .collection('organize')
        .where({
          routerCode: route.params.organCode,
        })
        .get()
      if (parentData.data.length != 1) {
        console.log('组织不存在')
        return
      }
      console.log('组织id', parentData.data[0]._id)
      // 获取页面总体数据
      let pageData = await db
        .collection('pageList')
        .where({
          organizeId: parentData.data[0]._id,
          router: route.params.pageCode,
        })
        .get()
      if (pageData.data.length != 1) {
        console.log('页面不存在', pageData.data)
        return
      }
      console.log('页面数据', pageData.data)

      // 获取页面dom数据
      let domData = await db
        .collection('pageDetails')
        .where({
          pageId: pageData.data[0]._id,
        })
        .get()
      if (domData.data.length != 1) {
        console.log('页面数据不存在', domData.data)
        return
      }
      console.log('dom数据', domData.data)

      processPageData({
        ...pageData.data[0],
        ...domData.data[0],
      })
    })

    function processPageData(data) {
      document.title = data.title
      console.log(data.template)
      data.template.map((p) => {
        p.cssModule = resetCss(p.cssModule)
        p.animation = animationFun(p.animation)
      })
      console.log(data)
      domData.value = data
    }
    return {
      domData,
    }
  },
})
</script>

<style scoped>
.page_index {
  position: relative;
}
.van-swipe {
  overflow: hidden;
  height: 100vh;
}
.van-swipe-item {
}
.comp_cont {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
