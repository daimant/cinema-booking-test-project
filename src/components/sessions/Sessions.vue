<script setup lang="ts">
import { UiButton } from "@dv.net/ui-kit";
import type { ISession, ISessionsDates } from "../../types";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTicketsStore } from "../../stores/tickets.ts";

const { sessionTimes } = storeToRefs(useTicketsStore())

const router = useRouter()
const { sessions } = defineProps<{ sessions: ISessionsDates | undefined }>()

const goToBooking = (id: number, times: ISession[]) => {
  if (!sessionTimes.value.has(id)) sessionTimes.value.set(id, new Set(times.map(el => el.time)))
  router.push({ name: 'tickets-booking', params: { id } })
}
</script>

<template>
  <div v-if="sessions" class="session-items-container flex-column gap-8">
    <div v-for="date in Object.keys(sessions)" class="session-item flex-column gap-3" :key="date">
      <div class="session-date">{{ date }}</div>
      <div
        v-if="sessions[date]"
        v-for="cinemaId in Object.keys(sessions[date])"
        class="session-item"
        :key="`${cinemaId}${date}`"
      >
        <div class="session">
          <div class="session-cinema">{{ cinemaId }}</div>
          <div v-if="sessions[date][cinemaId]?.sessions" class="session-time">
            <UiButton
              v-for="bookingTime in sessions[date][cinemaId].sessions"
              size="sm"
              mode="neutral"
              type="outline"
              :key="`${bookingTime}${cinemaId}${date}`"
              @click="goToBooking(bookingTime.id, sessions[date][cinemaId].sessions)"
            >
              {{ bookingTime.time }}
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

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

    .ui-button {
      width: 60px;
    }
  }
}
</style>
