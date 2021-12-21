<template>
  <img :style="styleData" :src="staticData.imglUrl" alt="" @click="handle" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
