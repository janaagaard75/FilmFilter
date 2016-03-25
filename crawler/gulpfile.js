const fs = require('fs');
const gulp = require("gulp")
const moment = require('moment')
const runSequence = require('run-sequence')
const shell = require("gulp-shell")

gulp.task("add-timestamp-to-movies-file", done => {
    fs.access("output/movies.json", fs.R_OK | fs.W_OK, (error) => {
        if (!error) {
            fs.renameSync("output/movies.json",
                "output/movies-" + moment().format("YYYYMMDDHHmmss") + ".json")
        }

        done()
    })
})

gulp.task("add-timestamp-to-showings-file", done => {
    fs.access("output/showings.json", fs.R_OK | fs.W_OK, (error) => {
        if (!error) {
            fs.renameSync("output/showings.json",
                "output/showings-" + moment().format("YYYYMMDDHHmmss") + ".json")
        }

        done()
    })
})

gulp.task("add-timestamp-to-theaters-file", done => {
    fs.access("output/theaters.json", fs.R_OK | fs.W_OK, (error) => {
        if (!error) {
            fs.renameSync("output/theaters.json",
                "output/theaters-" + moment().format("YYYYMMDDHHmmss") + ".json")
        }

        done()
    })
})

gulp.task("crawl-movies", shell.task("scrapy crawl movies"))

gulp.task("crawl-showings", shell.task("scrapy crawl showings"))

gulp.task("crawl-theaters", shell.task("scrapy crawl theaters"))

gulp.task("create-movies-file-without-duplicates",
    shell.task("sort output/movies.json | uniq -u > output/movies-without-duplicates.json"))

gulp.task("rename-to-movies-json", done => {
    fs.unlinkSync("output/movies.json")
    fs.renameSync("output/movies-without-duplicates.json", "output/movies.json")
    done()
})

gulp.task("movies", done => {
    runSequence(
        "rename-movies-file",
        "create-movies-file-without-duplicates",
        "rename-to-movies-json",
        "add-timestamp-to-movies-file",
        done)
})

gulp.task("showings", done => {
    runSequence(
        "crawl-showings",
        "add-timestamp-to-showings-file",
        done)
})

gulp.task("theaters", done => {
    runSequence(
        "crawl-theaters",
        "add-timestamp-to-theaters-file",
        done)
})

gulp.task("default", done => {
    runSequence(
        "movies",
        "showings",
        "theaters",
        done)
})
