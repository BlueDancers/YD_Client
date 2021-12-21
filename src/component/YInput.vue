<template>
  <input :style="cssModule" :placeholder="staticData.placeholder" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["domData"],
  setup(props) {
    return {
      cssModule: props.domData.cssModule,
      staticData: props.domData.staticData,
    };
  },
});
</script>

<style scoped></style>
