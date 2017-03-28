# Film Filter Website

Web front end built in TypeScript using using React, MobX, and Bootstrap, compiled with Webpack.

Data is cached in local storage and so are the settings.

## Set Up

1. Install `firebase-tools` as a global npm package.
1. Run `firebase login`.

## To Do

* Filtering one category should update the others.
  * Example: How do I easily see that the movie Logan isn't shown in 3D anywhere?
* Add a reset button.
* Figure out why the settings aren't persisted as they should.
* Possible to select a weekday in the calendar.
* Show the month in the calendar.
* Helpful animations.
* Add routes to the app, so that it's possible to share links.
* Figure out why `cross-env NODE_ENV=production` makes the production build slightly smaller.
* The spinner has disappeared when data is fetched automatically.