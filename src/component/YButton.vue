<template>
  <button :style="styleData">
    {{ staticData.btnValue }}
  </button>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { domData } from "./domData";

export default defineComponent({
  props: ["domData"],
  setup(props) {
    const total = domData(props.domData);
    return {
      ...total,
    };
  },
});
</script>

<style scoped></style>
