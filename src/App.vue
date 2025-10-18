<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Navigation from "./components/navigation/Navigation.vue";

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.path === '/') router.push({ name: 'films' })
})
</script>

<template>
  <div class="main">
    <Navigation/>
    <RouterView/>
  </div>
</template>