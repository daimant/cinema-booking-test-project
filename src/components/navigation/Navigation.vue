<script setup lang="ts">

import { UiLayoutMenu } from "@dv.net/ui-kit";

const routeItems = [
  { path: '/films', meta: { title: "Фильмы" } },
  { path: '/cinema', meta: { title: "Кинотеатры" } },
  { path: '/tickets', meta: { title: "Мои билеты" } },
  { path: '/login', meta: { title: "Вход" } }
]
</script>

<template>
  <nav class="navigation">
    <UiLayoutMenu :routeItems="routeItems"/>
  </nav>
</template>

<style scoped>

.navigation {
  position: fixed;
  top: 50px;
  left: 0;
}

</style>