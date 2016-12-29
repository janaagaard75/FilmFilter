export interface MovieData {
  readonly danishTitle?: string
  readonly movieUrl: string
  readonly originalTitle: string
  readonly posterUrl: string
}

export interface ShowingData {
  readonly dubbed: boolean
  readonly imax: boolean
  readonly movieId: number
  readonly showingUrl: string
  readonly specialShowing: boolean
  readonly start: Date
  readonly theaterId: number
  readonly threeD: boolean
}

export interface TheaterData {
  readonly name: string
  readonly theatherUrl: string
}

export interface Data {
  movies: Array<MovieData>,
  showings: Array<ShowingData>,
  theaters: Array<TheaterData>
}