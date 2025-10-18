export type IFilm = {
  id: number,
  title: string,
  description: string,
  year: number,
  lengthMinutes: number,
  posterImage: string,
  rating: number
}

export type ISessionsResponse = {
  id: number,
  movieId: number,
  cinemaId: number,
  startTime: string
}

export type ISession = {
  id: number
  time: string
}
export type ISessions = {
  filmId?: number,
  cinemaId?: number,
  sessions: ISession[]
}

export type ISessionsDates = Record<string, ISessionsList>

export type ISessionsList = Record<string, ISessions>

export type ICinema = {
  id: number,
  name: string,
  address: string
}

export type ITicket = {
  id: string,
  userId: number,
  movieSessionId: number,
  sessionId: number,
  bookedAt: string,
  seats: [
    {
      rowNumber: number,
      seatNumber: number
    }
  ],
  isPaid: boolean
}

export type IBooking = {
  id: number,
  movieId: number,
  cinemaId: number,
  startTime: string,
  seats: {
    rows: number,
    seatsPerRow: number
  },
  bookedSeats: [
    {
      rowNumber: number,
      seatNumber: number
    }
  ]
}

export type ISettings = {
  bookingPaymentTimeSeconds: number,
}