import { defineStore } from "pinia";
import { ref } from "vue";
import type { ISettings } from "../types.ts";
import { getFetch } from "../api/getFetch.ts";

export const useSettingsStore = defineStore("settings", () => {
  const settings = ref<ISettings>()

  const getSettings = async () => {
    if (settings.value) return
    settings.value = await getFetch('settings')
  }

  return { settings, getSettings };
});
