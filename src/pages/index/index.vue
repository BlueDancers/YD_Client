<template>
  <div>
    <div
      :style="{
        height: `${compData.height / 32.5}rem`,
        backgroundColor: compData.backColor,
      }"
    >
      <template v-for="item in compData.template" :key="item.id">
        <yd-button v-if="item.name == 'y-button'" :compData="item"></yd-button>
        <yd-div v-if="item.name == 'y-div'" :compData="item"></yd-div>
        <yd-img v-if="item.name == 'y-img'" :compData="item"></yd-img>
        <yd-edit v-else-if="item.name == 'y-edit'" :compData="item"></yd-edit>
        <yd-p v-else-if="item.name == 'y-p'" :compData="item"></yd-p>
        <yd-swiper v-else-if="item.name == 'y-swiper'" :compData="item"></yd-swiper>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { cloud } from '../../modules/request'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {},
  setup() {
    const db = cloud.database()
    const route = useRoute()
    const compData: any = ref({})

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
      let compData = await db
        .collection('pageDetails')
        .where({
          pageId: pageData.data[0]._id,
        })
        .get()
      if (compData.data.length != 1) {
        console.log('页面数据不存在', compData.data)
        return
      }
      console.log('dom数据', compData.data)

      processPageData({
        ...pageData.data[0],
        ...compData.data[0],
      })
    })

    function processPageData(data) {
      document.title = data.title
      console.log(data.template)
      console.log(data)
      compData.value = data
    }
    return {
      compData,
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
