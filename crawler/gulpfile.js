const fs = require('fs');
const gulp = require("gulp")
const moment = require('moment')
const runSequence = require('run-sequence')
const shell = require("gulp-shell")

const timestamp = moment().format("YYYYMMDDHHmmss")
const moviesFileWithoutDuplicates = "output/movies-without-duplicates.json"
const moviesFileWithoutTimestamp = "output/movies.json"
const moviesFileWithTimestamp = "output/movies-" + timestamp + ".json"
const showingsFileWithoutTimestamp = "output/showings.json"
const showingsFileWithTimestamp = "output/showings-" + timestamp + ".json"
const theatersFileWithoutTimestamp = "output/theaters.json"
const theatersFileWithTimestamp = "output/theaters-" + timestamp + ".json"

function deleteIfExists (path, done) {
    fs.access(path, fs.R_OK | fs.W_OK, (error) => {
        if (!error) {
            fs.unlinkSync(path)
        }

        done()
    })
}

gulp.task("add-timestamp-to-movies-file", done => {
    fs.renameSync(moviesFileWithoutTimestamp, moviesFileWithTimestamp)
    done()
})

gulp.task("add-timestamp-to-showings-file", done => {
    fs.renameSync(showingsFileWithoutTimestamp, showingsFileWithTimestamp)
    done()
})

gulp.task("add-timestamp-to-theaters-file", done => {
    fs.renameSync(showingsFileWithoutTimestamp, showingsFileWithTimestamp)
    done()
})

gulp.task("create-link-to-movies-file", done => {
    fs.symlinkSync(moviesFileWithTimestamp, moviesFileWithoutTimestamp)
    done()
})

gulp.task("create-link-to-showings-file", done => {
    fs.symlinkSync(showingsFileWithTimestamp, showingsFileWithoutTimestamp)
    done()
})

gulp.task("create-link-to-theaters-file", done => {
    fs.symlinkSync(theatersFileWithTimestamp, theatersFileWithoutTimestamp)
    done()
})

gulp.task("delete-movies-file", done => {
    deleteIfExists(moviesFileWithoutTimestamp, done)
})

gulp.task("crawl-movies", shell.task("scrapy crawl movies"))

gulp.task("crawl-showings", shell.task("scrapy crawl showings"))

gulp.task("crawl-theaters", shell.task("scrapy crawl theaters"))

gulp.task("create-movies-file-without-duplicates",
    shell.task("sort " + moviesFileWithoutTimestamp + " | uniq -u > " + moviesFileWithoutDuplicates))

gulp.task("rename-to-movies-json", done => {
    fs.unlinkSync(moviesFileWithoutTimestamp)
    fs.renameSync(moviesFileWithoutDuplicates, moviesFileWithoutTimestamp)
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
