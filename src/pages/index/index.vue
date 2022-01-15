<template>
  <div :class="domData.pageType == 2 ? 'page_index' : ''">
    <van-swipe
      v-if="domData.pageType == 2"
      :vertical="true"
      :style="{ height: `${chileHeight}px` }"
      @change="onChange"
      lazy-render
    >
      <van-swipe-item
        v-for="c in domData.content"
        :key="c.id"
        :style="{
          height: `${chileHeight}px`,
          backgroundColor: domData.backColor,
        }"
      >
        <div class="comp_cont" :style="{ height: `${chileHeight}px` }">
          <component
            v-for="item in c.dom"
            :key="item.id"
            :is="item.name"
            :domData="item"
          ></component>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div
      v-else
      :style="{
        height: `${domData.height / 32}rem`,
        backgroundColor: domData.backColor,
      }"
    >
      <div v-if="domData.content">
        <component
          v-for="item in domData.content[0].dom"
          :key="item.id"
          :is="item.name"
          :domData="item"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { cloud } from "@/modules/request";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { animationFun, resetCss } from "../../utils/index";
import YImg from "../../component/YImg.vue";
import YP from "../../component/YP.vue";
import YButton from "../../component/YButton.vue";
import YDiv from "../../component/YDiv.vue";
import YInput from "../../component/YInput.vue";
import YSwiper from '../../component/YSwiper.vue';

export default defineComponent({
  components: {
    YImg,
    YP,
    YButton,
    YDiv,
    YInput,
    YSwiper
  },
  setup() {
    const db = cloud.database();
    const route = useRoute();
    const domData: any = ref({});
    const chileHeight = ref(0);
    const swiperIndex = ref(0);
    console.log(route.params);
    onMounted(async () => {
      chileHeight.value = document.body.clientHeight;
      // 首先通过 organCode 确认组织
      // 在通过 pageCode 确认页面
      // 获取组织id
      let parentData = await db
        .collection("organize")
        .where({
          routerCode: route.params.organCode,
        })
        .get();
      if (parentData.data.length != 1) {
        console.log("组织不存在");
        return;
      }
      console.log("组织id", parentData.data[0]._id);
      // 获取页面总体数据
      let pageData = await db
        .collection("pageList")
        .where({
          organizeId: parentData.data[0]._id,
          router: route.params.pageCode,
        })
        .get();
      if (pageData.data.length != 1) {
        console.log("页面不存在", pageData.data);
        return;
      }
      console.log("页面数据", pageData.data);

      // 获取页面dom数据
      let domData = await db
        .collection("pageDetails")
        .where({
          pageId: pageData.data[0]._id,
        })
        .get();
      if (domData.data.length != 1) {
        console.log("页面数据不存在", domData.data);
        return;
      }
      console.log("dom数据", domData.data[0].content);

      processPageData({
        ...pageData.data[0],
        content: domData.data[0].content,
      });
    });
    function processPageData(data) {
      document.title = data.routerName;
      // document.body.style.backgroundColor = data.backColor;
      data.content.map((p) => {
        p.dom.map((c) => {
          c.cssModule = resetCss(c.cssModule);
          c.animation = animationFun(c.animation);
        });
      });
      console.log(data);

      domData.value = data;
    }
    /**
     *
     */
    function onChange(event) {
      console.log("onChange", event);
      swiperIndex.value = event;
    }
    return {
      domData,
      chileHeight,
      swiperIndex,
      onChange,
    };
  },
});
</script>

<style scoped>
.page_index {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  height: 100vh;
  width: 100vw;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.van-swipe {
  /* width: 100%; */
}
.van-swipe-item {
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
}
.comp_cont {
  overflow: hidden;
  position: relative;
  width: 100%;
}
</style>
