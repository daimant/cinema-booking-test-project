<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { ICinema } from "../../types.ts";
import { useRoute } from "vue-router";
import { useFilmsStore } from "../../stores/films.ts";
import { storeToRefs } from "pinia";
import { useCinemasStore } from "../../stores/cinemas.ts";

const route = useRoute()
const { cinemasList, cinemasSessions } = storeToRefs(useCinemasStore())
const { getFilmSessions } = useFilmsStore()
const cinema = ref<ICinema>()

const computedSessions = computed(() => cinemasSessions.value.get(Number(route.params.id)))

onMounted(async () => {
  await getFilmSessions(Number(route.params.id))
  cinema.value = cinemasList.value?.find(({ id }) => id === Number(route.params.id))
})
</script>

<template>
  cinema-detail
</template>

<style scoped>

</style>