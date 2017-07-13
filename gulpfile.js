var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

var paths = {
    base: {
        root: '.',
        html: './src/main/html',
        src: './src/main/ts',
        bin: './dist'
    }
};

paths.assets = [paths.base.root + '/assets/**'];
paths.pages = [paths.base.html + '/**'];
paths.lib = [paths.base.root + '/lib/**'];
paths.src = [paths.base.src + '/Main.ts'];

gulp.task("copy-assets", function () {
    return gulp.src(paths.assets, { "base" : paths.base.root })
        .pipe(gulp.dest(paths.base.bin));
});

gulp.task("copy-lib", function() {
    return gulp.src(paths.lib, { "base" : paths.base.root })
        .pipe(gulp.dest(paths.base.bin));
});

gulp.task("copy-html", function () {
    return gulp.src(paths.pages, { "base" : paths.base.html })
        .pipe(gulp.dest(paths.base.bin));
});

gulp.task("default", ["copy-assets", "copy-html", "copy-lib"], function() {
    return browserify({
       basedit: paths.root,
       debug: true,
       entries: paths.src,
       cache: {},
       packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.base.bin))
});