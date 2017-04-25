# Film Filter Website

Web front end built in TypeScript using using React, MobX, and Bootstrap, compiled with Webpack.

Data is cached in local storage and so are the settings.

## Set Up

1. Install `firebase-tools` as a global npm package.
1. Run `firebase login`.

## Interactino Between Panels

Should there be any interaction between the movies, dates and theaters panels? Example: If a user wants to see a specific movie in a specific theater, but that this movie isn't playing in that theater, should this be apparent in the filtering panels, or only in the final list of matching showings? It's probably best to avoid this interaction, because it will mean that the order in which the filters are chosen will matter. The text input field for filtering movies is very affordable.

Would it be better to have a single search field with a live updated list of matching showings?

## To Do

* Figure out why the settings aren't always persisted as they should.
* Make it possible to select a weekday in the calendar.
* Show the month in the calendar.
* Helpful animations?
* Add routes to the app, so that it's possible to share links.
* Links to trailers.
* IMDb and Rotten Tomatoes score? <https://github.com/worr/node-imdb-api>
* Fix wiggly loader icon. It's fine on Font Awesome's web site.
* Add a pager to the list of matching showings?
* Upgrade to React 15.5. It currently causes a warning in the console.