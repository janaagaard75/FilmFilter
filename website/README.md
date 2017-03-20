# Filmfilter Website

## Set Up

1. Install `firebase-tools` as a global npm package.
1. Run `firebase login`.

## To Do

* Filtering one category should update the others.
  * Example: How do I easily see that the movie Logan isn't shown in 3D anywhere?
* Add a reset button.
* Better presentation of showings.
  * If a single movie has been selected, it's not necessary to show the name of the movie in the showings list.
  * Likewise for dates and theaters.
  * Have a call to action button with a ticket icon.
* Possible to select a weekday in the calendar.
* Show the month somehow in the calendar.
* Helpful animations.
* Add routes to the app, so that it's possible to share links.
* Figure out why `cross-env NODE_ENV=production` makes the production build slightly smaller.