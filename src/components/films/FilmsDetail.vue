<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { IFilm, ISessionsDates } from "../../types.ts";
import { useRoute, useRouter } from "vue-router";
import { useFilmsStore } from "../../stores/films.ts";
import { storeToRefs } from "pinia";
import { timeHelper } from "../../helpers/timeHelper.ts";
import { UiButton } from '@dv.net/ui-kit'
import Sessions from "../sessions/Sessions.vue";

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

    <Sessions :sessions="computedSessions"/>
  </div>
</template>

<style scoped lang="scss">
.films-detail {
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    margin-bottom: 0;
  }

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
}
</style>