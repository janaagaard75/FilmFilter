var gulp = require("gulp")
var shell = require("gulp-shell")

gulp.task("crawl-theaters", shell.task([
    "rm output/theaters.json",
    "scrapy crawl theaters"
]))

gulp.task("default", function() {
  // place code for your default task here
})
