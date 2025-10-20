import { UiNotification } from "@dv.net/ui-kit";
import { useAuthStore } from "../stores/auth.ts";
import { getApiUrl } from "../helpers/getApiUrl.ts";

export const getFetch = async (url: string, token?: string) => {
  const { logout } = useAuthStore()

  const params = token
    ? { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
    : {}

  try {
    const res = await fetch(`${getApiUrl()}/${url}`, params)
    const data = await res.json()

    if (res.ok) return data
    else {
      if (data.message === 'Unauthorized') logout()
      UiNotification('Error loading data')
    }
  } catch (e) {
    UiNotification(String(e))
  }
}