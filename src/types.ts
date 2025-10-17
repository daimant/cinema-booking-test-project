export type IFilm = {
  id: number,
  title: string,
  description: string,
  year: number,
  lengthMinutes: number,
  posterImage: string,
  rating: number
}

export type IFilmSessionsResponse = {
  id: number,
  movieId: number,
  cinemaId: number,
  startTime: string
}

export type IFilmSessions = {
  date: string,
  cinemaId: number,
  sessions: string[]
}
