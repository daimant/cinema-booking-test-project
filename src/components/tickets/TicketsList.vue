<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth.ts";
import { useTicketsStore } from "../../stores/tickets.ts";
import { computed, onMounted } from "vue";
import { useCinemasStore } from "../../stores/cinemas.ts";
import { useFilmsStore } from "../../stores/films.ts";
import TicketsListItems from "./TicketsListItems.vue";

const { isAuth } = storeToRefs(useAuthStore())
const { ticketsList } = storeToRefs(useTicketsStore())
const { cinemasList } = storeToRefs(useCinemasStore())
const { filmsList } = storeToRefs(useFilmsStore())
const { getBookings } = useTicketsStore()

const notPaidList = computed(() => ticketsList.value?.filter(el => !el.isPaid))
const futureList = computed(() => ticketsList.value?.filter(el => new Date(el.bookingParams?.startTime!).getTime() > Date.now()))
const pastList = computed(() => ticketsList.value?.filter(el => new Date(el.bookingParams?.startTime!).getTime() < Date.now()))

onMounted(async () => {
    if (ticketsList.value?.length) {
      for (const el of ticketsList.value) {
        if (!el.bookingParams) {
          const booking = await getBookings(el.movieSessionId)
          el.bookingParams = {
            cinema: cinemasList.value?.find(({ id }) => id === Number(booking.cinemaId))?.name || '',
            film: filmsList.value?.find(({ id }) => id === Number(booking.movieId))?.title || '',
            startTime: booking.startTime || '',
          }
        }
      }
    }
  }
)
</script>

<template>
  <div class="tickets-list flex-column gap-6">
    <h1>
      <template v-if="!isAuth">To view tickets, please log in</template>
      <template v-else-if="ticketsList?.length === 0">No booked tickets</template>
      <template v-else>Tickets</template>
    </h1>

    <TicketsListItems :list="notPaidList" type="not-paid"/>
    <TicketsListItems :list="futureList" type="future"/>
    <TicketsListItems :list="pastList" type="past"/>
  </div>
</template>

<style scoped lang="scss">
.tickets-list {
  padding-inline: 40px;
  width: 800px;
  max-width: 800px;
}

</style>
