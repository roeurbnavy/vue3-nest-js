import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)

const authStore = useAuthStore()

router.beforeEach((to, from, next) => {
  if (to.meta?.authRequired) {
    if (authStore.jwt_token) {
      next()
    } else {
      next('/auth')
    }
  } else {
    next()
  }
})

router.isReady().then(() => app.mount('#app'))
