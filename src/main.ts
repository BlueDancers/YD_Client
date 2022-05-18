import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
// import 'animate.css'
import './index.css'
import './utils/rem'
import '@vant/touch-emulator'

import 'vant/lib/index.css'

import ydH5 from 'ydh5-ui'
import 'ydh5-ui/dist/style.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

app.use(ydH5)
