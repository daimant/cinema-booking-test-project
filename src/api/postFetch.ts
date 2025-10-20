import { UiNotification } from "@dv.net/ui-kit";
import { getApiUrl } from "../helpers/getApiUrl.ts";

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
    const rawRes = await fetch(`${getApiUrl()}/${url}`, params)

    if (rawRes.ok) return rawRes.status === 200 ? await rawRes.json() : true
    else UiNotification((await rawRes.json()).message)
  } catch (e) {
    UiNotification(String(e))
  }
}