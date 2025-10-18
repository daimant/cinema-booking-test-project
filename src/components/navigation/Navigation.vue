<script setup lang="ts">

import { UiIconButton, UiLayoutMenu } from "@dv.net/ui-kit";
import type { RouteItem } from "@dv.net/ui-kit/dist/components/UiLayoutMenu/types";
import {
  dashboardAnimation,
  listAnimation,
  loginAnimation,
  myAppAnimation
} from "@dv.net/ui-kit/dist/helpers/animations-list";
import { computed, ref } from "vue";
import { useAuthStore } from "../../stores/auth.ts";
import { storeToRefs } from "pinia";

const collapsed = ref(false)
const { isAuth } = storeToRefs(useAuthStore())

const routeItems = computed<RouteItem[]>(() => [
  { path: '/films', meta: { title: "Movies", animationIcon: dashboardAnimation } },
  { path: '/cinemas', meta: { title: "Cinemas", animationIcon: myAppAnimation } },
  { path: '/tickets', meta: { title: "My tickets", animationIcon: listAnimation } },
  { path: '/login', meta: { title: isAuth.value ? "Log out" : "Log in", animationIcon: loginAnimation } }
])
</script>

<template>
  <nav class="navigation flex-column">
    <UiIconButton
      size="lg"
      icon-name="menu  1"
      icon-type="100"
      @click="collapsed = !collapsed"
      class="navigation-menu-icon"
    />
    <UiLayoutMenu :routeItems="routeItems" :collapsed="collapsed"/>
  </nav>
</template>

<style scoped lang="scss">

.navigation {
  z-index: 1;
  position: fixed;
  top: 20px;
  left: 0;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  justify-content: start;

  &-menu-icon {
    margin-inline: 12px;
  }
}

</style>