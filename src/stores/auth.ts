import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter()
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
    router.push({ name: 'films' })
    localStorage.removeItem('token')
    isAuth.value = false
  }

  return { isAuth, getToken, setToken, logout };
});
