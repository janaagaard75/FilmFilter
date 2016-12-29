interface Movie {
  readonly danishTitle?: string
  readonly movieUrl: string
  readonly originalTitle: string
  readonly posterUrl: string
}

interface Showing {
  readonly dubbed: boolean
  readonly imax: boolean
  readonly movieId: number
  readonly showingUrl: string
  readonly specialShowing: boolean
  readonly start: Date
  readonly theaterId: number
  readonly threeD: boolean
}

interface Theater {
  readonly name: string
  readonly theatherUrl: string
}

export interface Data {
  movies: Array<Movie>,
  showings: Array<Showing>,
  theaters: Array<Theater>
}