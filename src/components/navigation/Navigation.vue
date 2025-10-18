<script setup lang="ts">

import { UiLayoutMenu } from "@dv.net/ui-kit";
import type { RouteItem } from "@dv.net/ui-kit/dist/components/UiLayoutMenu/types";
import {
  dashboardAnimation,
  listAnimation,
  loginAnimation,
  myAppAnimation
} from "@dv.net/ui-kit/dist/helpers/animations-list";

const routeItems: RouteItem[] = [
  { path: '/films', meta: { title: "Movies", animationIcon: dashboardAnimation } },
  { path: '/cinemas', meta: { title: "Cinemas", animationIcon: myAppAnimation } },
  { path: '/tickets', meta: { title: "My tickets", animationIcon: listAnimation } },
  { path: '/login', meta: { title: "Login", animationIcon: loginAnimation } }
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