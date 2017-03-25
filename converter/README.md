# Film Filter Converter

The converter reads the data produced by the scraper, and makes it available for download as a single JSON file.

It is not possible (and also not recommended) to use `ts-node` in production, so the compiled JavaScript has to be included in the repository, because git is being used to deploy the code to Heroku.

## TODOs

* Add support for movies without a movie page.
* Add support for 'babybio' showing type. This has to be added in the scraper first.
* Inevestigate using another build setup to end up with a single JavaScript file.