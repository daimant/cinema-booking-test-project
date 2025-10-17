import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.ts";
import { createPinia } from "pinia";

import '@dv.net/ui-kit/dist/style.css'
import { useFilmsStore } from "./stores/films.ts";

const app = createApp(App)
const router = createRouter({ history: createWebHistory(), routes })

const initRequests = (callback: () => void) => {
  Promise.all([useFilmsStore().getFilms()]).finally(callback)
}

app.use(router);
app.use(createPinia());

initRequests(() => app.mount("#app"))