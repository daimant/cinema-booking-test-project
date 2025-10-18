<script setup lang="ts">
import type { ITicket } from "../../../types.ts";
import { dayjs, UiNotification } from "@dv.net/ui-kit";
import { UiButton } from "@dv.net/ui-kit"
import { postFetch } from "../../../api/postFetch.ts";
import { useAuthStore } from "../../../stores/auth.ts";
import { useTicketsStore } from "../../../stores/tickets.ts";
import { storeToRefs } from "pinia";
import TicketsRemaining from "./RemainingBlock.vue";

const { list, type } = defineProps<{ list?: ITicket[], type: 'not-paid' | 'future' | 'past' }>()
const { getToken } = useAuthStore()
const { ticketsList } = storeToRefs(useTicketsStore())

const titles = {
  'not-paid': 'Not paid',
  future: 'Future',
  past: 'Past',
}

const pay = async (ticketId: string) => {
  const token = getToken()
  const res = await postFetch(`bookings/${ticketId}/payments`, '', token)

  if (res) {
    const foundTicket = ticketsList.value?.find(el => el.id === ticketId)
    if (foundTicket) foundTicket.isPaid = true
    UiNotification('Ticket paid successful', 'success')
  }
}
</script>

<template>
  <div v-if="list?.length" class="tickets-list-items flex-column gap-3">
    <h2 class="tickets-list-items-argument">{{ titles[type] }}</h2>
    <div v-for="ticket in list" :key="ticket.id" class="tickets-list-items-item">
      <div>
        <div>{{ ticket.bookingParams?.film }}</div>
        <div>{{ ticket.bookingParams?.cinema }}</div>
        <div>{{ dayjs(ticket.bookingParams?.startTime).format('DD.MM HH:mm') }}</div>
      </div>

      <div>
        <div v-for="seat in ticket.seats">Row: {{ seat.rowNumber }}, seat: {{ seat.seatNumber }}</div>
      </div>

      <UiButton v-if="type === 'not-paid'" type="outline" mode="neutral" @click="pay(ticket.id)">
        Pay now
      </UiButton>

      <TicketsRemaining v-if="type === 'not-paid'" :bookedAt="ticket.bookedAt" :id="ticket.id"/>
    </div>
  </div>
</template>

<style scoped lang="scss">

.tickets-list-items {
  &-argument {
    border-bottom: 3px solid lightgray;
    line-height: 40px;
    font-size: 20px;
    padding-left: 32px;
    text-align: start;
    font-weight: 600;
    margin: 0;
  }

  &-item {
    display: grid;
    grid-template-columns: 300px 150px 90px auto;
    padding: 4px 32px;
    align-items: center;
    gap: 16px;

    > :first-child {
      text-align: start;
    }
  }
}

</style>
