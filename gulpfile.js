var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var mocha = require('gulp-mocha');

var paths = {
    base: {
        root: '.',
        html: './src/main/html',
        src: {
            main: './src/main/ts',
            test: './src/test/ts'
        },
        bin: {
            main: './dist/game',
            test: './dist/test'
        }
    }
};

paths.assets = [paths.base.root + '/assets/**'];
paths.pages = [paths.base.html + '/**'];
paths.src = {
    main: [paths.base.src.main + '/Main.ts'],
    test: [paths.base.src.test + '/PipeTest.ts']
}

gulp.task("copy-assets", function () {
    return gulp.src(paths.assets, { "base" : paths.base.root })
        .pipe(gulp.dest(paths.base.bin.main));
});

gulp.task("copy-html", function () {
    return gulp.src(paths.pages, { "base" : paths.base.html })
        .pipe(gulp.dest(paths.base.bin.main));
});

gulp.task("test", function () {
    return browserify({
        basedir: paths.base.root,
        debug: true,
        entries: paths.src.test,
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('test.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulp.dest(paths.base.bin.test))
        .pipe(mocha({
            reporter: 'progress'
        }));
});

gulp.task("build", function () {
    return browserify({
        basedir: paths.base.root,
        debug: true,
        entries: paths.src.main,
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulp.dest(paths.base.bin.main));
});

gulp.task("default", ["copy-assets", "copy-html", "build", "test"]);