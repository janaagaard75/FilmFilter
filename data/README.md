# Film Filter Data

Provides data for the website.

Reads the data produced by the scraper, converts it into a single JSON file, and makes it available through HTTP. Everything is done in real time, without any caching.

## No ts-node in Production

It is not possible (and also not recommended) to use `ts-node` in production, so the compiled JavaScript has to be included in the repository, because git is being used to deploy the code to Heroku.

## Deploying

Git is used to deploy to Heroku, so the compiled files have to be included in source control.

### Outdated Master Branch

If git complains about the master branch being outdated when publishing to Heroku, use the following command to force a push.

```shell
git push heroku `git subtree split --prefix data master`:master --force
```

## TODOs

* Add support for 'babybio' showing type. This has to be added in the scraper first.
* Inveatigate why the Webpack build is so much larger than compiling with tsc.