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
    username: [{ validator: () => form.value.username.length > 0, message: 'Введите логин' }],
    password1: [{ validator: () => form.value.password1.length > 0, message: 'Введите пароль' }],
    password2: [
      { validator: () => form.value.password2.length > 0, message: 'Введите подтверждение пароля' },
      { validator: () => form.value.password1 === form.value.password2, message: 'Пароли должны совпадать' },
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
    UiNotification('Вы успешно зарегистрировались', 'success')
    goLogin()
  }
}
</script>

<template>
  <div class="mw-300">
    <UiForm ref="formRef" :rules="rulesForm" :model="form" @submit.prevent="handleSubmit">
      <h2>Регистрация</h2>

      <UiFormItem label="Логин" name="username">
        <UiInput placeholder="Введите свой логин" v-model="form.username"/>
      </UiFormItem>

      <UiFormItem label="Пароль" name="password1">
        <UiInput placeholder="Введите свой пароль" v-model="form.password1"/>
      </UiFormItem>

      <UiFormItem label="Подтвержление пароля" name="password2">
        <UiInput placeholder="Введите подтверждение пароля" v-model="form.password2"/>
      </UiFormItem>

      <UiButton mode="neutral" native-type="submit">Зарегистрироваться</UiButton>

      <div class="mt-4">
        <div>или</div>
        <UiButton type="tertiary" mode="neutral" size="sm" @click="goLogin">
          Войти
        </UiButton>
      </div>
    </UiForm>
  </div>
</template>