var gulp = require("gulp")
var moment = require('moment')
var runSequence = require('run-sequence')
var shell = require("gulp-shell")

// Crawling of the same URL has been allowed in settings.py to make showings crawling work. But this results in some duplicates of the movies occurring. So they are removed manually after the crawl.
gulp.task("crawl-movies", shell.task([
    "mv output/movies.json output/movies-" + moment().format("YYYYMMDDHHmmss") + ".json",
    "scrapy crawl movies",
    "sort output/movies.json | uniq -u > output/movies-without-duplicates.json",
    "rm output/movies.json",
    "mv output/movies-without-duplicates.json output/movies.json"
]))

gulp.task("crawl-showings", shell.task([
    "mv output/showings.json output/showings-" + moment().format("YYYYMMDDHHmmss") + ".json",
    "scrapy crawl showings"
]))

gulp.task("crawl-theaters", shell.task([
    "mv output/theathers.json output/theaters-" + moment().format("YYYYMMDDHHmmss") + ".json",
    "scrapy crawl theaters"
]))

gulp.task("default", runSequence(
    "crawl-movies",
    "crawl-showings",
    "crawl-theaters"
))
