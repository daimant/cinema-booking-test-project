import { defineStore } from "pinia";
import { computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuth = computed(() => Boolean(localStorage.token))

  return { isAuth };
});
