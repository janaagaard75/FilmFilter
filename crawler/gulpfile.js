const fs = require('fs');
const gulp = require("gulp")
const moment = require('moment')
const runSequence = require('run-sequence')
const shell = require("gulp-shell")

const timestamp = moment().format("YYYYMMDDHHmmss")
const moviesPathWithoutDuplicates = "output/movies-without-duplicates.json"
const moviesPathWithoutTimestamp = "output/movies.json"
const moviesPathWithTimestamp = "output/movies-" + timestamp + ".json"
const showingsPathWithoutTimestamp = "output/showings.json"
const showingsPathWithTimestamp = "output/showings-" + timestamp + ".json"
const theatersPathWithoutTimestamp = "output/theaters.json"
const theatersPathWithTimestamp = "output/theaters-" + timestamp + ".json"

function deleteIfExists (path, done) {
    fs.access(path, fs.R_OK | fs.W_OK, (error) => {
        if (!error) {
            fs.unlinkSync(path)
        }

        done()
    })
}

gulp.task("add-timestamp-to-movies-file", done => {
    fs.renameSync(moviesPathWithoutTimestamp, moviesPathWithTimestamp)
    done()
})

gulp.task("add-timestamp-to-showings-file", done => {
    fs.renameSync(showingsPathWithoutTimestamp, showingsPathWithTimestamp)
    done()
})

gulp.task("add-timestamp-to-theaters-file", done => {
    fs.renameSync(theatersPathWithoutTimestamp, theatersPathWithTimestamp)
    done()
})

gulp.task("crawl-movies", shell.task("scrapy crawl movies"))

gulp.task("crawl-showings", shell.task("scrapy crawl showings"))

gulp.task("crawl-theaters", shell.task("scrapy crawl theaters"))

gulp.task("create-link-to-movies-file", done => {
    fs.symlinkSync(moviesPathWithTimestamp, moviesPathWithoutTimestamp)
    done()
})

gulp.task("create-link-to-showings-file", done => {
    fs.symlinkSync(showingsPathWithTimestamp, showingsPathWithoutTimestamp)
    done()
})

gulp.task("create-link-to-theaters-file", done => {
    fs.symlinkSync(theatersPathWithTimestamp, theatersPathWithoutTimestamp)
    done()
})

gulp.task("create-movies-file-without-duplicates",
    shell.task("sort " + moviesPathWithoutTimestamp + " | uniq -u > " + moviesPathWithoutDuplicates))

gulp.task("delete-movies-file", done => {
    deleteIfExists(moviesPathWithoutTimestamp, done)
})

gulp.task("rename-to-movies-json", done => {
    fs.unlinkSync(moviesPathWithoutTimestamp)
    fs.renameSync(moviesPathWithoutDuplicates, moviesPathWithoutTimestamp)
    done()
})

gulp.task("movies", done => {
    runSequence(
        "delete-movies-file",
        "crawl-movies",
        "create-movies-file-without-duplicates",
        "rename-to-movies-json",
        "add-timestamp-to-movies-file",
        "create-link-to-movies-file",
        done)
})

gulp.task("showings", done => {
    runSequence(
        "delete-showings-file",
        "crawl-showings",
        "add-timestamp-to-showings-file",
        "create-link-to-showings-file",
        done)
})

gulp.task("theaters", done => {
    runSequence(
        "delete-theaters-file",
        "crawl-theaters",
        "add-timestamp-to-theaters-file",
        "create-link-to-theaters-file",
        done)
})

gulp.task("default", done => {
    runSequence(
        "movies",
        "showings",
        "theaters",
        done)
})
