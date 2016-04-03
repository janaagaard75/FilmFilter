"use strict";

const browserSync = require('browser-sync').create()
const gulp = require("gulp")

function deleteIfExists(path, done) {
  fs.access(path, fs.R_OK | fs.W_OK, (error) => {
    if (!error) {
      fs.unlinkSync(path)
    }

    done()
  })
}

gulp.task("copy-html-files", () => {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
})

gulp.task("copy-javascript-files", () => {
  return gulp
    .src("src/*.js")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
})

gulp.task("build", [
  "copy-html-files",
  "copy-javascript-files"
])

gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  })

  gulp.watch("src/*.html", ["copy-html-files"])
  gulp.watch("src/*.js", ["copy-javascript-files"])
})

gulp.task("default", ["serve"])
