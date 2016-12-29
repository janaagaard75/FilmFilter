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
  * movieUrl (FK)
  * start
  * theaterUrl (FK)
  * version (2D, 3D, dansk tale, IMAX 2D, IMAX 3D, Særvisning)

## Output

* JSON object with arrays of movies, showings and theaters.
* The ID is the position in the array.
* What about the versions of the movies?
  1. Selected: Version information stored togehter with the showing. Easies but will take up most space.
  1. Version information stored together with the movies. Each movie will exist multiple times.
  1. Version information in separte array. The array will fill up as the different combinations are created. Takes up least space.
  1. Version contains a link to the movie. Takes up even less space.
* Some of the properties have been made optional to limit the size of the final data object. Start with mandatory field and make the optional if the data enda up being too large.

 * Movies
   * danishName?: string
   * movieUrl: string
   * originalName: string
   * posterUrl: string

 * Theaters
   * name: string
   * theaterUrl: string

 * Showings
   * movieId: number
   * theaterId: number
   * start: Array<Date>
   * threeD?: boolean
   * imax?: boolean
   * synchronized?: boolean
   * specialShowing?: boolean

# Searches

"Showings this Friday in Copenhagen in 2D."

# To Do

* Remove ticketflow/ prefix from showing URLs.
* Remove film/x/xx/ prefix from movie URLs.
* Remove k/sites/default/files/imagecache/k_poster_big from poster URLs.
* Remove biografer/ prefix from theater URLs.