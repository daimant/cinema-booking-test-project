<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { ICinema } from "../../types.ts";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useCinemasStore } from "../../stores/cinemas.ts";
import Sessions from "../sessions/Sessions.vue";
import { getCinemasSessions } from "../../helpers/sessionsHelpers.ts";

const route = useRoute()
const { cinemasList, cinemasSessions } = storeToRefs(useCinemasStore())
const cinema = ref<ICinema>()

const computedSessions = computed(() => cinemasSessions.value.get(Number(route.params.id)))

onMounted(async () => {
  await getCinemasSessions(Number(route.params.id))
  cinema.value = cinemasList.value?.find(({ id }) => id === Number(route.params.id))
})
</script>

<template>
  <div>
    <h1>{{ cinema?.name }}</h1>
    <Sessions :sessions="computedSessions"/>
  </div>
</template>