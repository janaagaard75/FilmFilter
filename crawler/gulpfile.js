"use strict";

const fs = require('fs');
const gulp = require("gulp")
const moment = require('moment')
const runSequence = require('run-sequence')
const shell = require("gulp-shell")

const timestamp = moment().format("YYYYMMDDHHmmss")

const movies = {}
movies.fileWithTimestamp = `movies-${timestamp}.json`
movies.pathWithoutDuplicates = "output/movies-without-duplicates.json"
movies.pathWithoutTimestamp = "output/movies.json"
movies.pathWithTimestamp = `output/${movies.fileWithTimestamp}`

const showings = {}
showings.fileWithTimestamp = `showings-${timestamp}.json`
showings.pathWithoutTimestamp = "output/showings.json"
showings.pathWithTimestamp = `output/${showings.fileWithTimestamp}`

const theaters = {}
theaters.fileWithTimestamp = `theaters-${timestamp}.json`
theaters.pathWithoutTimestamp = "output/theaters.json"
theaters.pathWithTimestamp = `output/${theaters.fileWithTimestamp}`


function deleteIfExists (path, done) {
    fs.access(path, fs.R_OK | fs.W_OK, (error) => {
        if (!error) {
            fs.unlinkSync(path)
        }

        done()
    })
}

gulp.task("add-timestamp-to-movies-file", done => {
    fs.renameSync(movies.pathWithoutTimestamp, movies.pathWithTimestamp)
    done()
})

gulp.task("add-timestamp-to-showings-file", done => {
    fs.renameSync(showings.pathWithoutTimestamp, showings.pathWithTimestamp)
    done()
})

gulp.task("add-timestamp-to-theaters-file", done => {
    fs.renameSync(theaters.pathWithoutTimestamp, theaters.pathWithTimestamp)
    done()
})

gulp.task("crawl-movies", shell.task("scrapy crawl movies"))

gulp.task("crawl-showings", shell.task("scrapy crawl showings"))

gulp.task("crawl-theaters", shell.task("scrapy crawl theaters"))

gulp.task("create-link-to-movies-file", done => {
    fs.symlinkSync(movies.fileWithTimestamp, movies.pathWithoutTimestamp)
    done()
})

gulp.task("create-link-to-showings-file", done => {
    fs.symlinkSync(showings.fileWithTimestamp, showings.pathWithoutTimestamp)
    done()
})

gulp.task("create-link-to-theaters-file", done => {
    fs.symlinkSync(theaters.fileWithTimestamp, theaters.pathWithoutTimestamp)
    done()
})

gulp.task("create-movies-file-without-duplicates",
    shell.task(`sort ${movies.pathWithoutTimestamp} | uniq -u > ${movies.pathWithoutDuplicates}`))

gulp.task("delete-movies-file", done => {
    deleteIfExists(movies.pathWithoutTimestamp, done)
})

gulp.task("rename-to-movies-json", done => {
    fs.unlinkSync(movies.pathWithoutTimestamp)
    fs.renameSync(movies.pathWithoutDuplicates, movies.pathWithoutTimestamp)
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
