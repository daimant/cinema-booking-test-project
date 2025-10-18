<script setup lang="ts">
import { UiForm, UiFormItem, UiInput, UiButton, UiNotification } from "@dv.net/ui-kit";
import { computed, ref } from "vue";
import type { UiFormRules } from "@dv.net/ui-kit/dist/components/UiForm/types";
import { postFetch } from "../../api/postFetch.ts";
import { useRouter } from "vue-router";

const router = useRouter()
const form = ref({ username: '', password1: '', password2: '' })
const formRef = ref<HTMLFormElement | null>(null);

const rulesForm = computed<UiFormRules>(() => {
  return {
    username: [{ validator: () => form.value.username.length > 0, message: 'Enter login.' }],
    password1: [{ validator: () => form.value.password1.length > 0, message: 'Enter password.' }],
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
  const res = await postFetch('register', JSON.stringify({
    username: form.value.username,
    password: form.value.password1
  }))

  if (res) {
    UiNotification('You have successfully registered', 'success')
    goLogin()
  }
}
</script>

<template>
  <div class="mw-300">
    <UiForm ref="formRef" :rules="rulesForm" :model="form" @submit.prevent="handleSubmit">
      <h1>Sign up</h1>

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
        <div>or</div>
        <UiButton type="tertiary" mode="neutral" size="sm" @click="goLogin">
          Log in
        </UiButton>
      </div>
    </UiForm>
  </div>
</template>