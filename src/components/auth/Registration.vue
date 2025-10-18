<script setup lang="ts">
import { UiForm, UiFormItem, UiInput, UiButton, UiNotification } from "@dv.net/ui-kit";
import { computed, ref } from "vue";
import type { UiFormRules } from "@dv.net/ui-kit/dist/components/UiForm/types";
import { postFetch } from "../../api/postFetch.ts";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth.ts";
import { useTicketsStore } from "../../stores/tickets.ts";

const router = useRouter()
const { setToken } = useAuthStore()
const { getTickets } = useTicketsStore()
const form = ref({ username: '', password1: '', password2: '' })
const formRef = ref<HTMLFormElement | null>(null);

const rulesForm = computed<UiFormRules>(() => {
  return {
    username: [
      { validator: () => form.value.username.length > 0, message: 'Enter login.' },
      { validator: () => form.value.username.length >= 8, message: 'Login must be longer than 8 characters' }
    ],
    password1: [
      { validator: () => form.value.password1.length > 0, message: 'Enter password.' },
      { validator: () => form.value.password1.length >= 8, message: 'Password must be longer than 8 characters' },
      {
        validator: () => form.value.password1.toLocaleLowerCase() !== form.value.password1 && Boolean(form.value.password1.match(/[0-9]/)),
        message: 'Password must contain one upper-letter and number'
      }
    ],
    password2: [
      { validator: () => form.value.password2.length > 0, message: 'Enter password confirmation.' },
      { validator: () => form.value.password1 === form.value.password2, message: 'Passwords must match.' },
    ]
  };
});

const goLogin = () => {
  router.push({ name: 'login' })
}

const handleSubmit = async () => {
  if (!formRef.value || !(await formRef.value.validate())) return;
  const body = { username: form.value.username, password: form.value.password1 }
  const res = await postFetch('register', JSON.stringify(body))

  if (res) {
    UiNotification('You have successfully registered', 'success')
    const res = await postFetch('login', JSON.stringify(body))
    setToken(res.token)
    await getTickets()
    router.push({ name: 'tickets' })
  }
}
</script>

<template>
  <div class="mw-300">
    <UiForm ref="formRef" :rules="rulesForm" :model="form" @submit.prevent="handleSubmit">
      <h1 class="mb-6">Sign up</h1>

      <UiFormItem label="Login" name="username">
        <UiInput placeholder="Enter your login" v-model="form.username"/>
      </UiFormItem>

      <UiFormItem label="Password" name="password1">
        <UiInput placeholder="Enter your password" v-model="form.password1"/>
      </UiFormItem>

      <UiFormItem label="Confirm password" name="password2">
        <UiInput placeholder="Enter password confirmation" v-model="form.password2"/>
      </UiFormItem>

      <UiButton mode="neutral" native-type="submit">Sign up</UiButton>

      <div class="mt-4">
        <div class="or-text">or</div>
        <UiButton type="tertiary" mode="neutral" size="md" @click="goLogin">
          Log in
        </UiButton>
      </div>
    </UiForm>
  </div>
</template>