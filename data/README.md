# Film Filter Data

Provides data for the website.

Reads the data produced by the scraper, converts it into a single JSON file, and makes it available on the web.

It is not possible (and also not recommended) to use `ts-node` in production, so the compiled JavaScript has to be included in the repository, because git is being used to deploy the code to Heroku.

## Master Outdated

```shell
git push heroku `git subtree split --prefix data master`:master --force
```

## TODOs

* Add support for movies without a movie page.
* Add support for 'babybio' showing type. This has to be added in the scraper first.
* Inevestigate using another build setup to end up with a single JavaScript file.