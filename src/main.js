import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import Toast from "vue-toastification";
import { createPinia } from 'pinia';
import "vue-toastification/dist/index.css";


createApp(App)
    .use(createPinia())
    .use(router)
    .use(Toast)
    .mount('#app')
