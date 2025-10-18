<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth.ts";
import { useTicketsStore } from "../../stores/tickets.ts";

const { isAuth } = storeToRefs(useAuthStore())
const { ticketsList } = storeToRefs(useTicketsStore())
</script>

<template>
  <div>
    <h1>
      <template v-if="!isAuth">To view tickets, please log in</template>
      <template v-else-if="ticketsList?.length === 0">No booked tickets</template>
      <template v-else>Tickets</template>
    </h1>

    <div v-if="ticketsList?.length">
      {{ ticketsList }}
    </div>
  </div>
</template>

<style scoped>

</style>