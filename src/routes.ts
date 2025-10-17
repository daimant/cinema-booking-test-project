import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "films",
    component: () => import("./components/films/FilmsTable.vue"),
  },
  {
    path: "/films/:id",
    name: "films-detail",
    component: () => import("./components/films/FilmsDetail.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/auth/Login.vue"),
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("./components/auth/Registration.vue"),
  },
  {
    path: "/cinema",
    name: "cinema",
    component: () => import("./components/cinema/CinemaTable.vue"),
  },
  {
    path: "/cinema/:id",
    name: "cinema-detail",
    component: () => import("./components/cinema/CinemaDetail.vue"),
  },
  {
    path: "/tickets",
    name: "tickets",
    component: () => import("./components/tickets/Tickets.vue"),
  }
]