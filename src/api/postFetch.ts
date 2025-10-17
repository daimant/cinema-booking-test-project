import { UiNotification } from "@dv.net/ui-kit";

export const postFetch = async (url: string, body: string) => {
  const params = {
    method: "POST",
    body: body
  }

  try {
    const res = await fetch(`http://localhost:3022/${url}`, params)
    const { message } = await res.json()

    if (res.ok) UiNotification(message, 'success')
    else UiNotification(message)
  } catch (e) {
    UiNotification(String(e))
  }
}