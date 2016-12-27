# Database for Film Filter

Convert the data from the scraper into something that makes more sense for the website.

# Data

## Input

* Movies
  * movieUrl (PK)
  * danishName
  * originalName
  * posterUrl

* Theaters
  * theaterUrl (PK)
  * name

* Showings
  * showingUrl (PK)
  * movieUrl (KF)
  * start
  * theaterUrl (KF)
  * version (2D, 3D, dansk tale, IMAX 2D, IMAX 3D, Særvisning)

## Output

* JSON arrays.
* The ID is the position in the array.
* What about the verions of the movies?
  1. Version information stored togehter with the showing. Easies but will take up most space.
  1. Version information stored together with the movies. Each movie will exist multiple times.
  1. Version information in separte array. The array will fill up as the different combinations are created. Takes up least space.
  1. Version contains a link to the movie. Takes up even less space.

 * Movies
   * danishName: string
   * movieId: number
   * movieUrl: string
   * originalName: string
   * posterUrl: string

 * Movie Version
   * dimensions: '2D' | '3D'
   * Imax: boolean
   * language: 'Original' | 'Danish'
   * SpecialShowing: boolean

 * Theaters
   * theaterId
   * theaterUrl

 * Showings
   * showingId
   * movieId
   * theaterId
   * start

# Searches

All showings this Friday in Copenhagen in 2D.