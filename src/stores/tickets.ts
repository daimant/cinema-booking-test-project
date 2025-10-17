import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import type { IBooking, ITicket } from "../types.ts";
import { getFetch } from "../api/getFetch.ts";
import { useAuthStore } from "./auth.ts";

export const useTicketsStore = defineStore("tickets", () => {
  const { isAuth } = storeToRefs(useAuthStore())
  const ticketsList = ref<ITicket[]>()
  const bookingList = ref<Map<number, IBooking>>(new Map())

  const getTickets = async () => {
    if (ticketsList.value?.length || !isAuth.value) return
    ticketsList.value = await getFetch(`me/bookings`)
  }

  const getBookings = async (id: number) => {
    if (bookingList.value.has(id)) return
    bookingList.value.set(id, await getFetch(`movieSessions/${id}`))
  }

  return {
    ticketsList,
    bookingList,
    getTickets,
    getBookings
  };
});
