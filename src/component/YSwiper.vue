<template>
  <van-swipe :style="styleData">
    <van-swipe-item v-for="(item, index) in staticData.data" :key="index">
      <img :style="{ width: '100%', height: '100%' }" :src="item.imglUrl" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { domData } from "./domData";

export default defineComponent({
  props: ["domData"],
  setup(props) {
    const total = domData(props.domData);
    console.log(total.staticData.value.data);

    return {
      ...total,
    };
  },
});
</script>

<style scoped></style>
