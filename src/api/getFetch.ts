import { UiNotification } from "@dv.net/ui-kit";

export const getFetch = async (url: string) => {
  try {
    const res = await fetch(`http://localhost:3022/${url}`)
    const data = await res.json()

    if (res.ok) return data
    else UiNotification('Ошибка загрузки данных')
  } catch (e) {
    UiNotification(String(e))
  }
}