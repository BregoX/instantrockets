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
    test: [
        'PipeTest.ts',
        'AnotherTest.ts'
    ].map((value) => paths.base.src.test + "/" + value)
}

var compileAndPack = function(sourceFiles, binFolder, destinationFile) {
    return browserify({ basedir: paths.base.root, entries: sourceFiles, debug: true})
        .plugin(tsify)
        .bundle()
        .pipe(source(destinationFile))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulp.dest(binFolder));
}

gulp.task("copy-assets", function () {
    return gulp.src(paths.assets, { base: paths.base.root })
        .pipe(gulp.dest(paths.base.bin.main));
});

gulp.task("copy-html", function () {
    return gulp.src(paths.pages, { base: paths.base.html })
        .pipe(gulp.dest(paths.base.bin.main));
});

gulp.task("test", function () {
    return compileAndPack(paths.src.test, paths.base.bin.test, 'test.js')
        .pipe(mocha({
            reporter: 'progress'
        }));
});

gulp.task("build", function () {
    return compileAndPack(paths.src.main, paths.base.bin.main, 'bundle.js');
});

gulp.task("default", ["copy-assets", "copy-html", "build", "test"]);