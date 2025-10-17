<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useTicketsStore } from "../../stores/tickets.ts";

const route = useRoute()
const { bookingList } = storeToRefs(useTicketsStore())
const { getBookings } = useTicketsStore()

onMounted(async () => {
  await getBookings(Number(route.params.id))
})
</script>

<template>
  bookingList
  {{ bookingList }}
</template>

<style scoped>

</style>