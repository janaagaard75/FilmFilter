"use strict";

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
})

gulp.task("copy-javascript-files", () => {
  return gulp
    .src("src/*.js")
    .pipe(gulp.dest("dist"))
})

gulp.task("build", [
  "copy-html-files",
  "copy-javascript-files"]
)

gulp.task("watch", () => {
  gulp.watch("src/*.html", ["copy-html-files"])
  gulp.watch("src/*.js", ["copy-javascript-files"])
})

gulp.task("default", [
  "build"
])
