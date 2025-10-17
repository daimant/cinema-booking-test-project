<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

onMounted(() => {
  console.log(route, 'mounted')
})
</script>

<template>
  <div>

    <RouterView/>
  </div>
</template>
