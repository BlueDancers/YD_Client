import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
import 'animate.css'
import './index.css'
import './utils/rem'
import { Swipe, SwipeItem } from 'vant'

const app = createApp(App)

app.use(router)
app.mount('#app')

app.use(Swipe)
app.use(SwipeItem)
