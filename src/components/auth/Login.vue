<script setup lang="ts">
import { UiForm, UiFormItem, UiInput, UiButton } from "@dv.net/ui-kit";
import { computed, ref } from "vue";
import type { UiFormRules } from "@dv.net/ui-kit/dist/components/UiForm/types";
import { useRouter } from "vue-router";
import { postFetch } from "../../api/postFetch.ts";

const router = useRouter()
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
  await postFetch('login', JSON.stringify(form.value))
}
</script>

<template>
  <div class="mw-300">
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