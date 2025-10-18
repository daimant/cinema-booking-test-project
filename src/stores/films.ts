import { defineStore } from "pinia";
import { ref } from "vue";
import type { IFilm, ISessionsDates } from "../types.ts";
import { getFetch } from "../api/getFetch.ts";

export const useFilmsStore = defineStore("films", () => {
  const filmsList = ref<IFilm[]>()
  const filmSessions = ref<Map<number, ISessionsDates>>(new Map())
  const filmsImages = ref<Map<string, string>>(new Map())

  const getFilms = async () => {
    if (filmsList.value?.length) return
    filmsList.value = await getFetch(`movies`)
    Promise.all(filmsList.value?.map(({ posterImage }) => getPosters(posterImage)) || [])
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

  const getFilmNameById = (id: number) => filmsList.value?.find(el => el.id === id)?.title ?? ''

  return {
    filmsList,
    filmSessions,
    filmsImages,
    getFilms,
    getFilmNameById
  };
});
