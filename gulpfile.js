var gulp = require('gulp'),
    bower = require('gulp-bower'),
    mainBowerFiles = require('gulp-main-bower-files'),
    gulpFilter = require('gulp-filter'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    flatten = require('gulp-flatten'),
    del = require('del'),
    cssnano = require('gulp-cssnano'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    ts = require('gulp-typescript'),
    replace = require('gulp-replace'),
    git = require('git-rev');

/** Production setting */
var isProduction = false;

gulp.task('env:production', function () {
    gutil.log(gutil.colors.red('Production enviroment set.'));
    isProduction = true;
});

gulp.task('env:develop', function () {
    gutil.log(gutil.colors.red('Develop enviroment set.'));
    isProduction = false;
});

/** output paths */
var dist = {
    css: './www/assets/css',
    js: './www/assets/js',
    fonts: './www/assets/fonts',
    test: './www/assets/test',
};

/** Bower libs */
gulp.task('bower:update', function () {
    return bower({cmd: 'update'});
});

gulp.task('clean', function () {
    gutil.log(gutil.colors.red('Cleaning files.'));
    return del([
        dist.js + '**/*.js',
        dist.css + '**/*.css',
        dist.fonts + '**/*',
    ]);
});


var bowerFiles = null;
function loadBowerFiles() {
    if (bowerFiles == null) {
        gutil.log(gutil.colors.red('Init main-bower-files.'));
        bowerFiles = gulp.src('./bower.json')
            .pipe(mainBowerFiles({
                overrides: {
                    bootstrap: {
                        main: [
                            './dist/js/bootstrap.js',
                            './dist/css/bootstrap.min.css',
                            './dist/css/bootstrap.min.css.map',
                            './dist/fonts/*.*'
                        ]
                    }
                }
            }));
    }
    return bowerFiles;
}

gulp.task('test', function () {
    return loadBowerFiles().pipe(gulp.dest('./www/assets/test'));
});

gulp.task('bower:js', function () {
    var filterJS = gulpFilter('**/*.js', {restore: true});

    return loadBowerFiles()
        .pipe(filterJS)
        .pipe(concat('vendor.js'))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest(dist.js))
        .pipe(filterJS.restore);
});

gulp.task('bower:css', function () {
    var filterCSS = gulpFilter('**/*.css', {restore: true});

    return loadBowerFiles()
        .pipe(filterCSS)
        .pipe(concat('vendor.css'))
        .pipe(gulpif(isProduction, cssnano()))
        .pipe(gulp.dest(dist.css))
        .pipe(filterCSS.restore);
});


gulp.task('bower:fonts', function () {
    var filterFonts = gulpFilter('**/*.{eot,svg,ttf,woff,woff2}', {restore: true});

    return loadBowerFiles()
        .pipe(filterFonts)
        .pipe(flatten())
        .pipe(gulp.dest(dist.fonts))
        .pipe(filterFonts.restore);
});

gulp.task('bower:misc', function () {
    var boostrapMapFilter = gulpFilter('**/bootstrap.min.css.map', {restore: true});

    return loadBowerFiles()
        .pipe(boostrapMapFilter)
        .pipe(flatten())
        .pipe(gulp.dest(dist.css))
        .pipe(boostrapMapFilter.restore);
});

gulp.task('bower:test', function () {
    return loadBowerFiles()
        .pipe(gulp.dest(dist.test));
});


gulp.task('bower:production', ['env:production', 'bower:js', 'bower:css', 'bower:fonts', 'bower:misc', 'template']);
gulp.task('bower:develop', ['env:develop', 'bower:js', 'bower:css', 'bower:fonts', 'bower:misc']);


/** Application libs */
var appSources = {
    // js: './app/assets/js/**/*.js',
    ts: './app/assets/typescript/**/*.ts',
    css: './app/assets/css/**/*.css',
};
/*
 gulp.task('app:js', function () {
 return gulp.src(appSources.js)
 .pipe(concat('app.js'))
 .pipe(gulpif(isProduction, uglify()))
 .pipe(gulp.dest(dist.js));
 });*/

gulp.task('app:css', function () {
    return gulp.src(appSources.css)
        .pipe(concat('app.css'))
        .pipe(gulpif(isProduction, cssnano()))
        .pipe(gulp.dest(dist.css));
});

var tsProject = ts.createProject('tsconfig.json', {outFile: 'app.js'});
gulp.task('app:typescript', function () {
    var tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest(dist.js));
});


gulp.task('template', function () {
    git.short(function (str) {
        gulp.src(['./app/presenters/templates/@layout.latte'])
            .pipe(replace(/(\?v=)[a-f0-9]{7}/g, '$1' + str))
            .pipe(gulp.dest('./app/presenters/templates/'));
    });
});

gulp.task('app:production', ['env:production', 'app:typescript', 'app:css', 'template']);
gulp.task('app:develop', ['env:develop', 'app:typescript', 'app:css']);

gulp.task('all:production', ['clean', 'bower:production', 'app:production']);
gulp.task('all:develop', ['clean', 'bower:develop', 'app:develop']);


gulp.task('watch', function () {
    gutil.log(gutil.colors.red('Watching for changes in app typescript/css files...'));
    // gulp.watch(appSources.js, ['app:js']);
    gulp.watch(appSources.ts, ['app:typescript']);
    gulp.watch(appSources.css, ['app:css']);
});