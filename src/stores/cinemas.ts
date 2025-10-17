import { defineStore } from "pinia";
import { ref } from "vue";
import type { ICinema, ISessionsDates, ISessionsResponse } from "../types.ts";
import { getFetch } from "../api/getFetch.ts";
import { dayjs } from "@dv.net/ui-kit";

export const useCinemasStore = defineStore("cinemas", () => {
  const cinemasList = ref<ICinema[]>()
  const cinemasSessions = ref<Map<number, ISessionsDates>>(new Map())

  const getCinemas = async () => {
    if (cinemasList.value?.length) return
    cinemasList.value = await getFetch(`cinemas`)
  }

  const getCinemasSessions = async (id: number) => {
    if (cinemasSessions.value.has(id)) return
    const rawSessions: ISessionsResponse[] = await getFetch(`cinemas/${id}/sessions`)
    const sessions: ISessionsDates = {}

    rawSessions.forEach(item => {
      const { id, movieId, startTime } = item
      const day = dayjs(startTime)
      const date = day.format('DD.MM')
      const time = day.format('HH:mm')

      if (!sessions[date]) sessions[date] = {}
      if (!sessions[date][movieId]) sessions[date][movieId] = { sessions: [] }
      if (sessions[date][movieId]) sessions[date][movieId].sessions.push({ time, id })
    })

    cinemasSessions.value.set(id, sessions)
  }

  return {
    cinemasList,
    cinemasSessions,
    getCinemas,
    getCinemasSessions
  };
});
