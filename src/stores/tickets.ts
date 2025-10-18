import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import type { IBooking, ITicket } from "../types.ts";
import { getFetch } from "../api/getFetch.ts";
import { useAuthStore } from "./auth.ts";

export const useTicketsStore = defineStore("tickets", () => {
  const { isAuth } = storeToRefs(useAuthStore())
  const { getToken } = useAuthStore()
  const ticketsList = ref<ITicket[]>()
  const bookingList = ref<Map<number, IBooking>>(new Map())
  const sessionTimes = ref<Map<number, Set<string>>>(new Map)

  const getTickets = async () => {
    const token = await getToken()

    if (ticketsList.value?.length || !isAuth.value) return
    ticketsList.value = await getFetch(`me/bookings`, token)
  }

  const getBookings = async (id: number) => {
    const res = await getFetch(`movieSessions/${id}`)
    bookingList.value.set(id, res)
    return res
  }

  return {
    ticketsList,
    bookingList,
    sessionTimes,
    getTickets,
    getBookings
  };
});
