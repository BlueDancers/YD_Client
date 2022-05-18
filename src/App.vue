<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { cloud } from './modules/request'

export default defineComponent({
  setup() {
    var auth: any = cloud.auth({
      persistence: 'local',
    })
    onMounted(async () => {
      const loginState = await auth.getLoginState()
      if (!loginState || !loginState.isAnonymousAuth) {
        await auth.anonymousAuthProvider().signIn()
      }
    })
  },
})
</script>

<style>
html,
body {
  padding: 0px;
  margin: 0px;
  height: 100vh;
  width: 100vw;
}
img {
  -webkit-user-drag: none;
}
p {
  font-size: 0.4rem;
}
</style>
