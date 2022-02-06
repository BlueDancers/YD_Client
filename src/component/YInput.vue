<template>
  <input :style="styleData" :placeholder="staticData.placeholder" />
</template>

<script lang="ts">
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
