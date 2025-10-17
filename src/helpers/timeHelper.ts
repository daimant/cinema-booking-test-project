export const timeHelper = (lengthMinutes: number) => {
  return `${lengthMinutes < 60 ? '0' : Math.trunc(lengthMinutes / 60)}:${lengthMinutes % 60}`
}