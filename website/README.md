# Film Filter Website

## Set Up

Consider installing `firebase-tools` as a global npm package.

## Interface

* list of matching showings.
* either default to all or none of the shows.
* form above the loat to filter the showimgs.

* Movie name: Text input field.
* Theater: List af checkboxes.
* Date: Date + start time + end time.
* 2D / 3D: Two checkboxes or thee radio buttons.
* IMAX: Two checkboxes or three radio buttons.
* Special showing: Ditto.
* Language: Ditto.

## To Do

* Movies sometimes shuffle around when being selected. Maybe they should also be sorted by name.
* Add a reset button?
* Make it easy to select a group of cinemas.
* Remember selected cinemas.
* Better presentation of showings.
  * If a single movie has been selected, it's not necessary to show the name of the movie in the showings list.
* Better presentation of dates. Use a calendar grid?
* Automatically close movie collapsible when selecting a movie?
* Shorter names for the cinemas.
* Possible to select a start time interval.
* Save the data in local storage, and only update if outdated.
* Add routes to the app, so that it's possible to share links.