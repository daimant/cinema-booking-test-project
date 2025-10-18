<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Navigation from "./components/navigation/Navigation.vue";

const router = useRouter()

onMounted(() => {
  if (window.location.pathname === '/') router.push({ name: 'films' })
})
</script>

<template>
  <div class="main">
    <Navigation/>
    <RouterView/>
  </div>
</template>