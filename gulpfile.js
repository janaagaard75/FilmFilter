"use strict";

const fs = require('fs');
const gulp = require("gulp")
const moment = require('moment')
const runSequence = require('run-sequence')
const shell = require("gulp-shell")

function deleteIfExists (path, done) {
    fs.access(path, fs.R_OK | fs.W_OK, (error) => {
        if (!error) {
            fs.unlinkSync(path)
        }

        done()
    })
}

gulp.task("build", )

gulp.task("default", done => {
    runSequence(
        "movies",
        "showings",
        "theaters",
        done)
})
