<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth.ts";

const { isAuth } = storeToRefs(useAuthStore())
</script>

<template>
  <div v-if="!isAuth">Для просмотра билетов пожалуйста авторизуйтесь</div>

  <div v-else>
    <div>
      Билеты
    </div>
  </div>
</template>

<style scoped>

</style>