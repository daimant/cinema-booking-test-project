<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useTicketsStore } from "../../stores/tickets.ts";
import type { IBooking, ICinema, IFilm } from "../../types.ts";
import { useCinemasStore } from "../../stores/cinemas.ts";
import { useFilmsStore } from "../../stores/films.ts";

const route = useRoute()
const { cinemasList } = storeToRefs(useCinemasStore())
const { filmsList } = storeToRefs(useFilmsStore())
const { bookingList } = storeToRefs(useTicketsStore())
const { getBookings } = useTicketsStore()
const booking = ref<IBooking>()
const cinema = ref<ICinema>()
const film = ref<IFilm>()

onMounted(async () => {
  await getBookings(Number(route.params.id))
  booking.value = await bookingList.value?.get(Number(route.params.id))
  cinema.value = cinemasList.value?.find(({ id }) => id === Number())
  film.value = filmsList.value?.find(({ id }) => id === Number(route.params.id))
})
</script>

<template>
  <div>
    <h1>Select seats</h1>
    <div>
      <div>Movie: {{ film?.title }}</div>
      <div>Cinema: {{ cinema?.name }}</div>
      <div>Times: {{ cinema?.name }}</div>
    </div>

    {{ bookingList }}
  </div>
</template>

<style scoped>

</style>