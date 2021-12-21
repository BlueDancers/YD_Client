<template>
  <!-- 页面 -->
  <div v-for="c in domData" :key="c.id">
    <!-- 组件 -->
    <component
      v-for="item in c"
      :key="item.id"
      :is="item.name"
      :domData="item"
    ></component>
  </div>
</template>

<script lang="ts">
import { cloud } from "@/modules/request";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { animationFun, resetCss } from "../../utils/index";
import YImg from "../../component/YImg.vue";
import YP from "../../component/YP.vue";
import YButton from "../../component/YButton.vue";
import YDiv from "../../component/YDiv.vue";

export default defineComponent({
  components: {
    YImg,
    YP,
    YButton,
    YDiv,
  },
  setup() {
    const db = cloud.database();
    const route = useRoute();
    const domData: any = ref([]);
    console.log(route.params);
    onMounted(async () => {
      console.log(route.params);
      // 首先通过 organCode 确认组织
      // 在通过 pageCode 确认页面
      // 获取组织id
      let parentData = await db
        .collection("organize")
        .where({
          routerCode: route.params.organCode,
        })
        .get();
      console.log(parentData.data);
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
      document.body.style.backgroundColor = data.backColor;
      data.content.map((p) => {
        p.map((c) => {
          c.cssModule = resetCss(c.cssModule);
          c.animation = animationFun(c.animation);
        });
      });
      console.log(data.content);
      domData.value = data.content;
    }
    return {
      domData,
      resetCss,
    };
  },
});
</script>

<style scoped></style>
