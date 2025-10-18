<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTicketsStore } from "../../stores/tickets.ts";
import type { IBooking, ICinema, IFilm } from "../../types.ts";
import { useCinemasStore } from "../../stores/cinemas.ts";
import { useFilmsStore } from "../../stores/films.ts";
import { UiButton, UiNotification } from "@dv.net/ui-kit";
import { postFetch } from "../../api/postFetch.ts";
import { useAuthStore } from "../../stores/auth.ts";
import { getCinemasSessions, getFilmSessions } from "../../helpers/sessionsHelpers.ts";

const route = useRoute()
const router = useRouter()
const { cinemasList, cinemasSessions } = storeToRefs(useCinemasStore())
const { filmsList, filmSessions } = storeToRefs(useFilmsStore())
const { bookingList, sessionTimes } = storeToRefs(useTicketsStore())
const { getBookings } = useTicketsStore()
const { getToken } = useAuthStore()
const { getTickets } = useTicketsStore()
const booking = ref<IBooking>()
const cinema = ref<ICinema>()
const film = ref<IFilm>()
const selectedSeats = ref<Set<string>>(new Set)

const rows = computed(() => Array(booking.value?.seats.rows).fill(0).map((_, i) => i + 1))
const cols = computed(() => Array(booking.value?.seats.seatsPerRow).fill(0).map((_, i) => i + 1))

const selectSeat = (row: number, col: number) => {
  if (booking.value?.bookedSeats.some(el => el.rowNumber === row && el.seatNumber === col)) return
  selectedSeats.value.add(`${row}-${col}`)
}

const bookingHandler = async () => {
  if (!selectedSeats.value.size) return
  const body = {
    seats: Array.from(selectedSeats.value).map(strSeat => {
      const [rowNumber, seatNumber] = strSeat.split('-').map(el => Number(el));
      return { rowNumber, seatNumber }
    })
  }
  const token = await getToken()

  const res = await postFetch(`movieSessions/${booking.value?.id}/bookings`, JSON.stringify(body), token)

  if (res?.bookingId) {
    UiNotification('Booked successful', 'success')
    await getTickets()
    router.push({ name: 'tickets' })
  }
}

onMounted(async () => {
  booking.value = await getBookings(Number(route.params.id))

  // if (!cinemasSessions.value.has(booking.value?.cinemaId!)) await getCinemasSessions(booking.value?.cinemaId!)
  // if (!filmSessions.value.has(booking.value?.movieId!)) await getFilmSessions(booking.value?.movieId!)

  cinema.value = cinemasList.value?.find(({ id }) => id === Number(booking.value?.cinemaId))
  film.value = filmsList.value?.find(({ id }) => id === Number(booking.value?.movieId))
})
</script>

<template>
  <div v-if="booking?.id" class="booking flex-column gap-6">
    <h1>Select seats</h1>
    <div class="booking-description">
      <div>Movie: {{ film?.title }}</div>
      <div>Cinema: {{ cinema?.name }}</div>
      <div>
        Times:
        <span v-for="time of sessionTimes.get(booking?.id)" class="booking-description-time">{{ time }}</span>
      </div>
    </div>

    <div :class="{'booking-seats-container flex-column gap-4': true, sm: rows.length > 20}">
      <div class="booking-seats-rows">
        <span v-for="col of cols" class="booking-seats-num booking-seats-title">{{ col }}</span>
      </div>

      <div v-for="row of rows" class="booking-seats-rows">
        <span class="booking-seats-title">Row {{ row }}</span>
        <span
          v-for="col of cols"
          :class="{
            'booking-seats-cols': true,
            selected: selectedSeats.has(`${row}-${col}`),
            booked: booking.bookedSeats.some(el => el.rowNumber === row && el.seatNumber === col)
          }"
          :title="`Row ${row} Seat ${col}`"
          @click="selectSeat(row, col)"
        />
      </div>
    </div>

    <UiButton mode="neutral" @click="bookingHandler" :disabled="!selectedSeats.size">Book now</UiButton>
  </div>
</template>

<style scoped lang="scss">

.booking {
  &-description {
    text-align: start;
  }

  &-description-time {
    &:not(:last-child) {
      &::after {
        content: ', ';
      }
    }
  }

  &-seats-container {
    &.sm {
      gap: 8px;

      .booking-seats-cols, .booking-seats-num {
        min-width: 20px;
        min-height: 20px;
        border-radius: 4px;
      }

      .booking-seats-title {
        font-size: 12px;
      }
    }
  }

  &-seats-num {
    border: 2px solid transparent;
    min-width: 32px;
  }

  &-seats-title {
    font-size: 14px;
  }

  &-seats-rows {
    display: flex;
    gap: 8px;
    align-items: center;
    align-self: end;
  }

  &-seats-cols {
    cursor: pointer;
    border: 2px solid black;
    border-radius: 8px;
    min-height: 32px;
    min-width: 32px;

    &.selected {
      background: lightcyan;
    }

    &.booked {
      background: lightpink;
      cursor: not-allowed;

      &:hover {
        border-color: black;
      }
    }

    &:hover {
      border-color: gray;
    }

    &.sm {
      border-radius: 2px;
      min-height: 16px;
      min-width: 16px;
    }
  }

  .ui-button {
    margin: auto;
  }
}

</style>