import { UiNotification } from "@dv.net/ui-kit";

export const postFetch = async (url: string, body: string, token?: string) => {
  const params: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body
  }

  try {
    const rawRes = await fetch(`http://localhost:3022/${url}`, params)

    if (rawRes.ok) return rawRes.status === 200 ? await rawRes.json() : true
    else UiNotification((await rawRes.json()).message)
  } catch (e) {
    UiNotification(String(e))
  }
}