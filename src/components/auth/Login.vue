<script setup lang="ts">
import { UiForm, UiFormItem, UiInput, UiButton, UiLink, UiNotification } from "@dv.net/ui-kit";
import { computed, ref } from "vue";
import type { UiFormRules } from "@dv.net/ui-kit/dist/components/UiForm/types";
import { useRouter } from "vue-router";
import { postFetch } from "../../api/postFetch.ts";
import { useAuthStore } from "../../stores/auth.ts";
import { storeToRefs } from "pinia";
import { useTicketsStore } from "../../stores/tickets.ts";

const router = useRouter()
const { getTickets } = useTicketsStore()
const { isAuth } = storeToRefs(useAuthStore())
const { setToken, logout } = useAuthStore()
const form = ref({ username: '', password: '' })
const formRef = ref<HTMLFormElement | null>(null);

const rulesForm = computed<UiFormRules>(() => {
  return {
    username: [{ validator: () => form.value.username.length > 0, message: 'Введите логин' }],
    password: [{ validator: () => form.value.password.length > 0, message: 'Введите пароль' }]
  };
});

const handleSubmit = async () => {
  if (!formRef.value || !(await formRef.value.validate())) return;
  const res = await postFetch('login', JSON.stringify(form.value))

  if (res?.token) {
    UiNotification('Вы успешно авторизовались', 'success')
    setToken(res.token)
    await getTickets()
  }
}
</script>

<template>
  <div v-if="isAuth">
    Вы успешно вошли в профиль. хотите
    <UiLink size="xl" @click="logout">выйти</UiLink>
    ?
  </div>

  <div v-else class="mw-300">
    <UiForm ref="formRef" :rules="rulesForm" :model="form" @submit.prevent="handleSubmit">
      <h2>Вход</h2>

      <UiFormItem label="Логин" name="username">
        <UiInput placeholder="Введите свой логин" v-model="form.username"/>
      </UiFormItem>

      <UiFormItem label="Пароль" name="password">
        <UiInput placeholder="Введите свой пароль" v-model="form.password"/>
      </UiFormItem>

      <UiButton mode="neutral" native-type="submit">Войти</UiButton>
    </UiForm>

    <div class="mt-4">
      <div>или</div>
      <UiButton type="tertiary" mode="neutral" size="sm" @click="router.push({name: 'registration'})">
        Зарегистрироваться
      </UiButton>
    </div>
  </div>
</template>