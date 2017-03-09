# Film Filter Website

## Set Up

1. Install `firebase-tools` as a global npm package.
1. Run `firebase login`.

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

* Filtering one category should update the others.
  * Example: How do I easily see that the movie Logan isn't shown in 3D anywhere?
* Add routes to the app, so that it's possible to share links.
* Add a reset button.
* Better presentation of showings.
  * If a single movie has been selected, it's not necessary to show the name of the movie in the showings list.
  * Likewise for dates and theaters.
  * Have a call to action button with a ticket icon.
* 2D/3D selector.
* Language selector.
* Possible to select a start time interval for the movie.
* Possible to select a weekday in the calendar.
* Don't include the month on each day, so that the calendar can fit on an iPhone 5.
* Helpful animations.
* Make the app dark.
* Better highlight of selecting items.