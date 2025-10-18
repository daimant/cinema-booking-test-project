<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { IFilm, ISessionsDates, ISessionsResponse } from "../../types.ts";
import { useRoute } from "vue-router";
import { useFilmsStore } from "../../stores/films.ts";
import { storeToRefs } from "pinia";
import { timeHelper } from "../../helpers/timeHelper.ts";
import Sessions from "../sessions/Sessions.vue";
import { getFetch } from "../../api/getFetch.ts";
import { dayjs } from "@dv.net/ui-kit";
import { useCinemasStore } from "../../stores/cinemas.ts";

const route = useRoute()
const { filmsList, filmSessions, filmsImages } = storeToRefs(useFilmsStore())
const { getCinemaNameById } = useCinemasStore()
const film = ref<IFilm>()

const computedSessions = computed<ISessionsDates | undefined>(() => filmSessions.value.get(Number(route.params.id)))

const getFilmSessions = async (id: number) => {
  if (filmSessions.value.has(id)) return
  const rawSessions: ISessionsResponse[] = await getFetch(`movies/${id}/sessions`)
  const sessions: ISessionsDates = {}

  rawSessions.forEach(item => {
    const { id, cinemaId, startTime } = item
    const day = dayjs(startTime)
    const date = day.format('DD.MM')
    const time = day.format('HH:mm')

    const cinemaName = getCinemaNameById(cinemaId)

    if (!sessions[date]) sessions[date] = {}
    if (!sessions[date][cinemaName]) sessions[date][cinemaName] = { sessions: [] }
    if (sessions[date][cinemaName]) sessions[date][cinemaName].sessions.push({ time, id })
  })

  filmSessions.value.set(id, sessions)
}

onMounted(async () => {
  await getFilmSessions(Number(route.params.id))
  film.value = filmsList.value?.find(({ id }) => id === Number(route.params.id))
})
</script>

<template>
  <div v-if="film" class="films-detail">
    <h2>{{ film?.title }}</h2>

    <div class="films-detail-header">
      <img class='films-detail-img' :src="filmsImages.get(film.posterImage)" alt="Film img">
      <div>
        <div class="mb-4">{{ film.description }}</div>
        <div>Год: {{ film.year }}</div>
        <div>Продолжительность: {{ timeHelper(film.lengthMinutes) }}</div>
        <div>Рейтинг: {{ film.rating }}</div>
      </div>
    </div>

    <Sessions :sessions="computedSessions"/>
  </div>
</template>

<style scoped lang="scss">
.films-detail {
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    margin-bottom: 0;
  }

  &-header {
    display: flex;
    gap: 16px;
    padding: 20px;
    max-width: 700px;
    text-align: start;
  }

  &-img {
    height: 200px;
    border-radius: 16px;
  }
}
</style>