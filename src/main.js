import './assets/main.css'

import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const app = createApp(App)

app.mount('#app')
