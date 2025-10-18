<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../../../stores/settings.ts";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { dayjs, UiNotification } from "@dv.net/ui-kit";
import { useTicketsStore } from "../../../stores/tickets.ts";

const { bookedAt, id } = defineProps<{ bookedAt: string, id: string }>()
const { settings } = storeToRefs(useSettingsStore())
const { ticketsList } = storeToRefs(useTicketsStore())
const passed = ref(dayjs().diff(bookedAt) / 1000)
const remaining = computed(() => settings.value?.bookingPaymentTimeSeconds! - passed.value)
const interval = ref<ReturnType<typeof setInterval>>()

const startTimer = () => {
  interval.value = setInterval(() => {
    passed.value++

    if (remaining.value < 0) {
      ticketsList.value = ticketsList.value?.filter(el => el.id !== id)
      UiNotification('Booking canceled')
    }
  }, 1000)
}

onMounted(startTimer)

onBeforeUnmount(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <div>Time remaining: {{ Math.trunc(remaining) }}</div>
</template>
