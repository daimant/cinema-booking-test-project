import { createApp } from 'vue'
import './style.css'
import '@dv.net/ui-kit/dist/style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.ts";
import { createPinia } from "pinia";
import { useFilmsStore } from "./stores/films.ts";
import { useCinemasStore } from "./stores/cinemas.ts";
import { useTicketsStore } from "./stores/tickets.ts";
import { useSettingsStore } from "./stores/settings.ts";

const app = createApp(App)
const router = createRouter({ history: createWebHistory(), routes })

const initRequests = (callback: () => void) => {
  Promise.all([
    useSettingsStore().getSettings(),
    useFilmsStore().getFilms(),
    useCinemasStore().getCinemas(),
    useTicketsStore().getTickets(),
  ]).finally(callback)
}

app.use(router);
app.use(createPinia());

initRequests(() => app.mount("#app"))