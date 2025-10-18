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
    username: [{ validator: () => form.value.username.length > 0, message: 'Enter login.' }],
    password: [{ validator: () => form.value.password.length > 0, message: 'Enter password.' }]
  };
});

const handleSubmit = async () => {
  if (!formRef.value || !(await formRef.value.validate())) return;
  const res = await postFetch('login', JSON.stringify(form.value))

  if (res?.token) {
    UiNotification('You have successfully logged in', 'success')
    setToken(res.token)
    await getTickets()
  }
}
</script>

<template>
  <div v-if="isAuth">
    You have successfully logged into your profile. Would you like to
    <UiLink size="xl" @click="logout">log out</UiLink>
    ?
  </div>

  <div v-else class="mw-300">
    <UiForm ref="formRef" :rules="rulesForm" :model="form" @submit.prevent="handleSubmit">
      <h1 class="mb-6">Log in</h1>

      <UiFormItem label="Login" name="username">
        <UiInput placeholder="Enter your login" v-model="form.username"/>
      </UiFormItem>

      <UiFormItem label="Password" name="password">
        <UiInput placeholder="Enter your password" v-model="form.password"/>
      </UiFormItem>

      <UiButton mode="neutral" native-type="submit">Enter</UiButton>
    </UiForm>

    <div class="mt-4">
      <div>or</div>
      <UiButton type="tertiary" mode="neutral" size="sm" @click="router.push({name: 'registration'})">
        Sign up
      </UiButton>
    </div>
  </div>
</template>