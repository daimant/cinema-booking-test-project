import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuth = ref(false)

  const getToken = () => {
    const token = localStorage.token
    if (token && !isAuth.value) isAuth.value = true
    return token
  }

  const setToken = (token: string) => {
    localStorage.token = token
    if (!isAuth.value) isAuth.value = true
  }

  const logout = () => {
    localStorage.removeItem('token')
    isAuth.value = false
  }

  return { isAuth, getToken, setToken, logout };
});
