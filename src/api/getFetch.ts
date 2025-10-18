import { UiNotification } from "@dv.net/ui-kit";

export const getFetch = async (url: string, token?: string) => {
  const params = token
    ? { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
    : {}

  try {
    const res = await fetch(`http://localhost:3022/${url}`, params)
    const data = await res.json()

    if (res.ok) return data
    else UiNotification('Error loading data')
  } catch (e) {
    UiNotification(String(e))
  }
}