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
* What about the verions of the movies? Would it make sense to put them in a separate table? It's a many-to-many relation. Introduce a relation table?
* What kind of cross references are needed? Is it enough to link a showing to a movie and a theater?


 * Movies
   * movieId: number
   * movieUrl: string
   * danishName: string
   * originalName: string
   * posterUrl: string
   * dimensions: '2D' | '3D'
   * language: 'Original' | 'Danish'
   * Imax: boolean
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