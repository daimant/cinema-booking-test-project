import { defineStore } from "pinia";
import { ref } from "vue";
import type { IFilm, ISessionsDates, ISessionsResponse } from "../types.ts";
import { getFetch } from "../api/getFetch.ts";
import { dayjs } from "@dv.net/ui-kit";

export const useFilmsStore = defineStore("films", () => {
  const filmsList = ref<IFilm[]>()
  const filmSessions = ref<Map<number, ISessionsDates>>(new Map())
  const filmsImages = ref<Map<string, string>>(new Map())

  const getFilms = async () => {
    if (filmsList.value?.length) return
    filmsList.value = await getFetch(`movies`)
    Promise.all(filmsList.value?.map(({ posterImage }) => getPosters(posterImage)) || [])
  }

  const getFilmSessions = async (id: number) => {
    if (filmSessions.value.has(id)) return
    const rawSessions: ISessionsResponse[] = await getFetch(`movies/${id}/sessions`)
    const sessions: ISessionsDates = {}

    rawSessions.forEach(item => {
      const { id, cinemaId, startTime } = item
      const day = dayjs(startTime)
      const date = day.format('DD.MM')
      const time = day.format('HH:mm')

      if (!sessions[date]) sessions[date] = {}
      if (!sessions[date][cinemaId]) sessions[date][cinemaId] = { sessions: [] }
      if (sessions[date][cinemaId]) sessions[date][cinemaId].sessions.push({ time, id })
    })

    filmSessions.value.set(id, sessions)
  }

  const getPosters = async (url: string) => {
    try {
      const res = await fetch(`http://localhost:3022${url}`)
      const myBlob = await res.blob();
      const src = URL.createObjectURL(myBlob);
      filmsImages.value.set(url, src)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    filmsList,
    filmSessions,
    filmsImages,
    getFilms,
    getFilmSessions
  };
});
