
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// Register Pinia for shared state management
app.use(createPinia())

// Register Vue Router for page navigation
app.use(router)

// Display the Vue application
app.mount('#app')
