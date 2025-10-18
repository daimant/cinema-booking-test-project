<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth.ts";
import { useTicketsStore } from "../../stores/tickets.ts";

const { isAuth } = storeToRefs(useAuthStore())
const { ticketsList } = storeToRefs(useTicketsStore())
</script>

<template>
  <div>
    <h2>
      <template v-if="!isAuth">Для просмотра билетов пожалуйста авторизуйтесь</template>
      <template v-else-if="ticketsList?.length === 0">Забронированных билетов нет</template>
      <template v-else>Билеты</template>
    </h2>

    <div v-if="ticketsList?.length">
      {{ ticketsList }}
    </div>
  </div>
</template>

<style scoped>

</style>