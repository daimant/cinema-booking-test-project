<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { ICinema, ISessionsDates, ISessionsResponse } from "../../types.ts";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useCinemasStore } from "../../stores/cinemas.ts";
import Sessions from "../sessions/Sessions.vue";
import { getFetch } from "../../api/getFetch.ts";
import { dayjs } from "@dv.net/ui-kit";
import { useFilmsStore } from "../../stores/films.ts";

const route = useRoute()
const { cinemasList, cinemasSessions } = storeToRefs(useCinemasStore())
const { getFilmNameById } = useFilmsStore()
const cinema = ref<ICinema>()

const computedSessions = computed(() => cinemasSessions.value.get(Number(route.params.id)))

const getCinemasSessions = async (id: number) => {
  if (cinemasSessions.value.has(id)) return
  const rawSessions: ISessionsResponse[] = await getFetch(`cinemas/${id}/sessions`)
  const sessions: ISessionsDates = {}

  rawSessions.forEach(item => {
    const { id, movieId, startTime } = item
    const day = dayjs(startTime)
    const date = day.format('DD.MM')
    const time = day.format('HH:mm')
    console.log('get cinema 2')
    const filmName = getFilmNameById(movieId)

    if (!sessions[date]) sessions[date] = {}
    if (!sessions[date][filmName]) sessions[date][filmName] = { sessions: [] }
    if (sessions[date][filmName]) sessions[date][filmName].sessions.push({ time, id })
  })

  cinemasSessions.value.set(id, sessions)
}

onMounted(async () => {
  await getCinemasSessions(Number(route.params.id))
  cinema.value = cinemasList.value?.find(({ id }) => id === Number(route.params.id))
})
</script>

<template>
  <div>
    <h2>{{ cinema?.name }}</h2>
    <Sessions :sessions="computedSessions"/>
  </div>
</template>

<style scoped>

</style>