import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/films",
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
    path: "/cinemas",
    name: "cinemas",
    component: () => import("./components/cinemas/CinemasTable.vue"),
  },
  {
    path: "/cinemas/:id",
    name: "cinemas-detail",
    component: () => import("./components/cinemas/CinemasDetail.vue"),
  },
  {
    path: "/tickets",
    name: "tickets",
    component: () => import("./components/tickets/TicketsList.vue"),
  },
  {
    path: "/tickets-booking/:id",
    name: "tickets-booking",
    component: () => import("./components/tickets/TicketsBooking.vue"),
  }
]