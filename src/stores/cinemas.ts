import { defineStore } from "pinia";
import { ref } from "vue";
import type { ICinema, ISessionsDates } from "../types.ts";
import { getFetch } from "../api/getFetch.ts";

export const useCinemasStore = defineStore("cinemas", () => {
  const cinemasList = ref<ICinema[]>()
  const cinemasSessions = ref<Map<number, ISessionsDates>>(new Map())

  const getCinemas = async () => {
    if (cinemasList.value?.length) return
    cinemasList.value = await getFetch(`cinemas`)
  }

  const getCinemaNameById = (id: number): string => cinemasList.value?.find(el => el.id === id)?.name ?? ''

  return {
    cinemasList,
    cinemasSessions,
    getCinemas,
    getCinemaNameById
  };
});
