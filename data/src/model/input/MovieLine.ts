export interface MovieLine {
  danishTitle: string
  /** Full URL, starts with the standard prefix. */
  movieUrl: string
  originalTitle: string
  /** Full URL, does not start with the standard prefix. */
  posterUrl: string
}