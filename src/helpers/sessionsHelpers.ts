import type { ISessionsDates, ISessionsResponse } from "../types.ts";
import { getFetch } from "../api/getFetch.ts";
import { dayjs } from "@dv.net/ui-kit";
import { useFilmsStore } from "../stores/films.ts";
import { storeToRefs } from "pinia";
import { useCinemasStore } from "../stores/cinemas.ts";

const { getFilmNameById } = useFilmsStore()
const { getCinemaNameById } = useCinemasStore()
const { cinemasSessions } = storeToRefs(useCinemasStore())
const { filmSessions } = storeToRefs(useFilmsStore())

export const getCinemasSessions = async (id: number) => {
  if (cinemasSessions.value.has(id)) return
  const rawSessions: ISessionsResponse[] = await getFetch(`cinemas/${id}/sessions`)
  const sessions: ISessionsDates = {}

  rawSessions.forEach(item => {
    const { id, movieId, startTime } = item
    const day = dayjs(startTime)
    const date = day.format('DD.MM')
    const time = day.format('HH:mm')

    const filmName = getFilmNameById(movieId)

    if (!sessions[date]) sessions[date] = {}
    if (!sessions[date][filmName]) sessions[date][filmName] = { sessions: [] }
    if (sessions[date][filmName]) sessions[date][filmName].sessions.push({ time, id })
  })

  cinemasSessions.value.set(id, sessions)
}

export const getFilmSessions = async (id: number) => {
  if (filmSessions.value.has(id)) return
  const rawSessions: ISessionsResponse[] = await getFetch(`movies/${id}/sessions`)
  const sessions: ISessionsDates = {}

  rawSessions.forEach(item => {
    const { id, cinemaId, startTime } = item
    const day = dayjs(startTime)
    const date = day.format('DD.MM')
    const time = day.format('HH:mm')

    const cinemaName = getCinemaNameById(cinemaId)

    if (!sessions[date]) sessions[date] = {}
    if (!sessions[date][cinemaName]) sessions[date][cinemaName] = { sessions: [] }
    if (sessions[date][cinemaName]) sessions[date][cinemaName].sessions.push({ time, id })
  })

  filmSessions.value.set(id, sessions)
}