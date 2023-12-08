import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import antd from "ant-design-vue"
import {router} from "@/router"
const app = createApp(App)
app.use(antd)
app.use(router)
app.mount('#app')
