// plugins
var debug = require('gulp-debug');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var gulpProtractorAngular = require('gulp-angular-protractor');

var dist = 'dist/';
var examples = 'examples/';
var js = '*.js';

var app = dist + 'angular-eonasdan-datetimepicker.js';
var minApp = 'angular-eonasdan-datetimepicker.min.js';

// tasks
gulp.task('lint-dev', function () {
    return gulp.src([app, examples + js])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lint-dist', function () {
    return gulp.src([app, examples + js])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('minify', function () {
    return gulp.src(app)
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename(minApp))
        .pipe(gulp.dest(dist));
});

// main tasks
gulp.task('dist', ['lint-dist', 'minify'], function () {
});

gulp.task('dev', ['lint-dev', 'minify'], function () {
    gulp.watch([app], ['lint', 'minify']);
});

// testing
gulp.task('protractor', ['dist'], function () {
    return gulp.src('tests/*.js')
        .pipe(gulpProtractorAngular({
            'configFile': 'protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true,
            'verbose': false,
            'webDriverUpdate': {
                'browsers': ['ie', 'chrome']
            }
        }));
});


