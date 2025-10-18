<script setup lang="ts">
import { UiTable, UiButton } from '@dv.net/ui-kit'
import type { UiTableHeader } from "@dv.net/ui-kit/dist/components/UiTable/types";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCinemasStore } from "../../stores/cinemas.ts";

const router = useRouter()
const { cinemasList } = storeToRefs(useCinemasStore())

const headers: UiTableHeader[] = [
  { name: 'name', label: 'Кинотеатр' },
  { name: 'address', label: 'Адрес' },
  { name: 'detail' },
]
</script>

<template>
  <UiTable class='cinema-table' :data="cinemasList || []" :headers="headers">
    <template #body-cell-detail="{ row: { id } }">
      <UiButton type='outline' mode="neutral" @click="router.push({name: 'cinemas-detail', params: { id }})">
        Посмотреть сеансы
      </UiButton>
    </template>
  </UiTable>
</template>
