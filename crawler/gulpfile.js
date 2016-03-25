var gulp = require("gulp")
var shell = require("gulp-shell")

gulp.task("crawl-theaters", shell.task([
    "rm output/theaters.json",
    "scrapy crawl theaters"
]))

gulp.task("crawl-movies", shell.task([
    "rm output/movies.json",
    "scrapy crawl movies",
    "sort output/movies.json | uniq -u > output/movies-without-duplicates.json",
    "rm output/movies.json",
    "mv output/movies-without-duplicates.json output/movies.json"
]))

gulp.task("default", function() {
  // place code for your default task here
})
