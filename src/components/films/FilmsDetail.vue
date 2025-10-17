<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { IFilm, ISessionsDates } from "../../types.ts";
import { useRoute, useRouter } from "vue-router";
import { useFilmsStore } from "../../stores/films.ts";
import { storeToRefs } from "pinia";
import { timeHelper } from "../../helpers/timeHelper.ts";
import { UiButton } from '@dv.net/ui-kit'

const route = useRoute()
const router = useRouter()
const { filmsList, filmSessions, filmsImages } = storeToRefs(useFilmsStore())
const { getFilmSessions } = useFilmsStore()
const film = ref<IFilm>()

const computedSessions = computed<ISessionsDates | undefined>(() => filmSessions.value.get(Number(route.params.id)))

onMounted(async () => {
  await getFilmSessions(Number(route.params.id))
  film.value = filmsList.value?.find(({ id }) => id === Number(route.params.id))
})
</script>

<template>
  <div v-if="film" class="films-detail">
    <h2>{{ film?.title }}</h2>
    <div class="films-detail-header">
      <img class='films-detail-img' :src="filmsImages.get(film.posterImage)" alt="Film img">
      <div>
        <div class="mb-4">{{ film.description }}</div>
        <div>Год: {{ film.year }}</div>
        <div>Продолжительность: {{ timeHelper(film.lengthMinutes) }}</div>
        <div>Рейтинг: {{ film.rating }}</div>
      </div>
    </div>

    <div
      v-if="computedSessions"
      v-for="date in Object.keys(computedSessions)"
      class="films-detail-session-item" :key="date"
    >
      {{ date }}
      <div
        v-if="computedSessions[date]"
        v-for="cinemaId in Object.keys(computedSessions[date])"
        class="films-detail-session-item" :key="`${cinemaId}${date}`"
      >
        <div class="films-detail-session-item-body">
          <div>{{ cinemaId }}</div>
          <div v-if="computedSessions[date][cinemaId]?.sessions" class="films-detail-times">
            <UiButton
              size="sm"
              mode="neutral"
              type="outline"
              v-for="bookingTime in computedSessions[date][cinemaId].sessions"
              :key="`${bookingTime}${cinemaId}${date}`"
              @click="router.push({name: 'tickets-booking', params: { id: bookingTime.id }})"
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
.films-detail {
  &-header {
    display: flex;
    gap: 16px;
    padding: 20px;
    max-width: 700px;
    text-align: start;
  }

  &-img {
    height: 200px;
    border-radius: 16px;
  }

  &-session-item {
    min-width: 100%;
  }

  &-session-item-body {
    display: flex;

    > div {
      min-width: 50%;
    }
  }

  &-times {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
}
</style>