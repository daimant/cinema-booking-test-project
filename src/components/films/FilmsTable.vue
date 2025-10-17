<script setup lang="ts">
import { UiTable, UiButton } from '@dv.net/ui-kit'
import type { UiTableHeader } from "@dv.net/ui-kit/dist/components/UiTable/types";
import { timeHelper } from "../../helpers/timeHelper.ts";
import { useRouter } from "vue-router";
import { useFilmsStore } from "../../stores/films.ts";
import { storeToRefs } from "pinia";

const router = useRouter()
const { filmsList, filmsImages } = storeToRefs(useFilmsStore())

const headers: UiTableHeader[] = [
  { name: 'image' },
  { name: 'title', label: 'Название' },
  { name: 'length', label: 'Продолжительность' },
  { name: 'rating', label: 'Рейтинг' },
  { name: 'detail' },
]
</script>

<template>
  <UiTable class='films-table' :data="filmsList || []" :headers="headers">
    <template #body-cell-image="{ row: { posterImage } }">
      <img class='films-table-img' :src="filmsImages.get(posterImage)" alt="Film img">
    </template>

    <template #body-cell-length="{ row: { lengthMinutes } }">{{ timeHelper(lengthMinutes) }}</template>

    <template #body-cell-detail="{ row: { id } }">
      <UiButton type='outline' mode="neutral" @click="router.push({name: 'films-detail', params: { id }})">
        Посмотреть сеансы
      </UiButton>
    </template>
  </UiTable>
</template>

<style scoped lang="scss">

.films-table {
  &-img {
    height: 40px;
    border-radius: 4px;
  }
}

</style>