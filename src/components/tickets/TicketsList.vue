<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth.ts";
import { useTicketsStore } from "../../stores/tickets.ts";

const { isAuth } = storeToRefs(useAuthStore())
const { ticketsList } = storeToRefs(useTicketsStore())
</script>

<template>
  <div class="tickets-list">
    <h1>
      <template v-if="!isAuth">To view tickets, please log in</template>
      <template v-else-if="ticketsList?.length === 0">No booked tickets</template>
      <template v-else>Tickets</template>
    </h1>

    <div v-if="ticketsList?.length">
      <div v-for="ticket in ticketsList" :key="ticket.id">
        <div>
          <div>{{ ticket.movieSessionId }}</div>
        </div>

        <div>{{ ticket.movieSessionId }}</div>

<!--        <div>Time remaining: {{ dayjs(ticket.)}}</div>-->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tickets-list {

  .session-items-container {
    padding-inline: 40px;
    max-width: 800px;

    .session-item {
      width: 100%;
    }

    .session {
      display: flex;
      width: 100%;
      margin: 4px 32px;
      gap: 16px;

      > div {
        min-width: 50%;
      }
    }

    .session-date {
      border-bottom: 3px solid lightgray;
      line-height: 40px;
      font-size: 20px;
      padding-left: 32px;
      text-align: start;
      font-weight: 600;
    }

    .session-cinema {
      text-align: start;
      font-size: 16px;
      font-weight: 600;
    }

    .session-time {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
}

</style>
