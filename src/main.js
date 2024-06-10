import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'flowbite'
import App from './App.vue'
import router from './router'
import './index.css'

import mitt from 'mitt'

const emitter = mitt()

const app = createApp(App).use(createPinia()).use(router)

app.provide('emitter', emitter)

app.mount('#app')
