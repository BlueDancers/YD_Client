<template>
  <div :style="styleData" @click="handle"></div>
</template>

<script lang="ts">
import { handleFun } from "@/utils";
import { defineComponent } from "vue";
import { domData } from "./domData";

export default defineComponent({
  props: ["domData", "animation"],
  setup(props) {
    const total = domData(props);

    return {
      ...total,
    };
  },
});
</script>

<style scoped></style>
