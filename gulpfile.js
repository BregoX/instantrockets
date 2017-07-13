var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

var paths = {
    pages: [
        'src/static/**'
    ]
};

gulp.task("copy-assets", function () {
    return gulp.src(["assets/**"], { "base" : "./" })
        .pipe(gulp.dest("dist"));
});

gulp.task("copy-static", function () {
    return gulp.src(paths.pages, { "base" : "./src/static" })
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-assets", "copy-static"], function() {
    return browserify({
       basedit: '.',
       debug: true,
       entries: ['src/main.ts'],
       cache: {},
       packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"))
});